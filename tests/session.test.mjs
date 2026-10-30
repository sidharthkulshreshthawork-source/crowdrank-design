import test from 'node:test';
import assert from 'node:assert/strict';
import {newSession,readSession,commitRound,duelFromSearch,duelSearch,weekDays} from '../web/session.mjs';
import {challengeForDate} from '../web/content.mjs';

const day='2026-10-30',challenge=challengeForDate(day);
test('new guest attempts start empty',()=>assert.deepEqual(newSession(day),{day,version:'practice-v1',locked:[]}));
test('rounds lock sequentially and score transparently',()=>{
 const first=commitRound(newSession(day),0,challenge.rounds[0].sampleOrder,challenge);
 assert.equal(first.locked[0].score,6);
 assert.throws(()=>commitRound(first,0,challenge.rounds[0].sampleOrder,challenge),/already|sequence/i);
 assert.throws(()=>commitRound(first,2,challenge.rounds[2].sampleOrder,challenge),/sequence/i);
 assert.throws(()=>commitRound(first,1,['a','a','c','d'],challenge),/Invalid/i);
 const second=commitRound(first,1,challenge.rounds[1].sampleOrder,challenge);
 const complete=commitRound(second,2,challenge.rounds[2].sampleOrder,challenge);
 assert.equal(complete.locked.reduce((sum,round)=>sum+round.score,0),18);
 assert.deepEqual(readSession(JSON.stringify(complete),day,challenge),complete);
});
test('corrupt or forged saved progress is rejected',()=>{
 assert.deepEqual(readSession('{bad',day,challenge),newSession(day));
 assert.deepEqual(readSession(JSON.stringify(newSession('2026-10-29')),day,challenge),newSession(day));
 const corrupt={day,version:'practice-v1',locked:[{roundId:challenge.rounds[0].id,rank:['a','b','c','d'],score:99}]};
 assert.deepEqual(readSession(JSON.stringify(corrupt),day,challenge),newSession(day));
});
test('practice invite link accepts only a valid date and score',()=>{
 assert.equal(duelSearch(day,14),'?play=2026-10-30&duel=14');
 assert.deepEqual(duelFromSearch('?play=2026-10-30&duel=14'),{day,score:14});
 for(const v of ['-1','19','3.5','NaN','<script>','0018']) assert.equal(duelFromSearch('?play=2026-10-30&duel='+encodeURIComponent(v)),null);
 assert.equal(duelFromSearch('?play=2026-10-30&duel=5&duel=8'),null);
 assert.throws(()=>duelSearch(day,25),/score/i);
});
test('week starts on Monday in a seven-day range',()=>{
 assert.deepEqual(weekDays(day),['2026-10-26','2026-10-27','2026-10-28','2026-10-29','2026-10-30','2026-10-31','2026-11-01']);
});
