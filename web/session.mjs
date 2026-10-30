import { pairScore, validateRank } from './core.mjs';
import { challengeForDate } from './content.mjs';
const VERSION='practice-v1';

export const newSession = day => ({day,version:VERSION,locked:[]});

/** Untrusted browser data; recalculate all scores and reject corrupt histories. */
export function readSession(raw, day, challenge = challengeForDate(day)) {
  const clean=newSession(day);
  if(typeof raw!=='string') return clean;
  try {
    const parsed=JSON.parse(raw);
    if(!parsed || parsed.day!==day || parsed.version!==VERSION || !Array.isArray(parsed.locked) || parsed.locked.length>3) return clean;
    for(const [idx,item] of parsed.locked.entries()){
      const round=challenge.rounds[idx];
      if(!item || item.roundId!==round.id || !validateRank(item.rank,round.options.map(o=>o.id))) return clean;
      const expected=pairScore(item.rank,round.sampleOrder);
      if(item.score!==expected) return clean;
    }
    return {day,version:VERSION,locked:parsed.locked.map(i=>({roundId:i.roundId,rank:[...i.rank],score:i.score}))};
  } catch { return clean; }
}

/** A locked answer can never be overwritten in the same guest session. */
export function commitRound(session, roundIndex, order, challenge){
  if(!session || session.day!==challenge.day || session.version!==VERSION) throw new Error('Session does not match day');
  if(!Number.isInteger(roundIndex) || roundIndex<0 || roundIndex>2) throw new Error('Invalid round');
  if(roundIndex<session.locked.length) throw new Error('Round already locked');
  if(roundIndex!==session.locked.length) throw new Error('Rounds must be locked in sequence');
  const round=challenge.rounds[roundIndex];
  if(!validateRank(order,round.options.map(o=>o.id))) throw new Error('Invalid ranking');
  const entry={roundId:round.id,rank:[...order],score:pairScore(order,round.sampleOrder)};
  return {...session,locked:[...session.locked,entry]};
}

export function duelSearch(day,score){
  challengeForDate(day);
  if(!Number.isInteger(score) || score<0 || score>18) throw new Error('Invalid duel score');
  return `?play=${encodeURIComponent(day)}&duel=${score}`;
}

/** Demo challenge comparison only. URL scores can be changed and are not verified. */
export function duelFromSearch(search){
  if(typeof search!=='string' || search.length>220) return null;
  try {
    const params=new URLSearchParams(search.startsWith('?')?search.slice(1):search);
    if(params.getAll('duel').length!==1 || params.getAll('play').length!==1) return null;
    const day=params.get('play'), raw=params.get('duel');
    challengeForDate(day);
    if(!/^(0|[1-9]|1[0-8])$/.test(raw)) return null;
    return {day,score:Number(raw)};
  } catch {return null;}
}

export function weekDays(day){
  challengeForDate(day);
  const initial=new Date(`${day}T00:00:00Z`);
  const d=initial.getUTCDay();
  initial.setUTCDate(initial.getUTCDate()-((d+6)%7));
  return Array.from({length:7},(_,i)=>{
    const current=new Date(initial);
    current.setUTCDate(current.getUTCDate()+i);
    return current.toISOString().slice(0,10);
  });
}
