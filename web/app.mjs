import {dateKey,sumScores} from './core.mjs';
import {challengeForDate} from './content.mjs';
import {newSession,readSession,commitRound,duelFromSearch,duelSearch,weekDays} from './session.mjs';

const mount=document.getElementById('game');
const invitation=duelFromSearch(window.location.search);
let day=invitation?.day ?? dateKey();
let challenge=challengeForDate(day);
const STORE_PREFIX='crowdrank:practice-v1:';
const escapeHTML=value=>String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

function stored(key){try{return localStorage.getItem(key)}catch{return null}}
function saved(session){try{localStorage.setItem(STORE_PREFIX+day,JSON.stringify(session))}catch{/* storage may be blocked */}}
let session=readSession(stored(STORE_PREFIX+day),day,challenge);
let view='today';
let ranked=[];
let notice='';
const setView=next=>{view=next;notice='';render();window.scrollTo({top:0,behavior:'instant'});};

const currentRound=()=>challenge.rounds[session.locked.length];
const total=()=>sumScores(session.locked.map(r=>r.score));
const dayLabel=()=>new Date(day+'T12:00:00Z').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).toUpperCase();
const shell=(body,foot=true)=>`<div class="game-top"><span class="wordmark">CROWD<span>RANK</span><i aria-hidden="true"></i></span><span class="date">${dayLabel()}</span></div>${body}${foot?`<div class="screen-footer"><span>THE SOCIAL PREDICTION GAME / PRACTICE</span><button class="foot-btn" data-action="about">RULES & TRUST ↗</button></div>`:''}${notice?`<div class="toast" role="status">${escapeHTML(notice)}</div>`:''}`;
const disclosure=(label='PRACTICE DATA ONLY')=>`<div class="practice-disclosure"><strong>${label}</strong>Example rankings are fictional. No survey was conducted. Scores are unverified practice scores.</div>`;
const actionButton=(action,label)=>`<button class="primary" data-action="${action}"><span>${label}</span><span class="arrow" aria-hidden="true">→</span></button>`;

function todayView(){
  const r=challenge.rounds[0];
  const done=session.locked.length===3;
  const partial=session.locked.length>0&&!done;
  return shell(`<div class="page-intro"><div class="eyebrow">DAILY SOCIAL GAME / PLAYABLE PRACTICE</div>
    <h2 class="display">THINK YOU<br>KNOW<br>EVERYONE?</h2>
    <p class="lede">Make your call. See the unexpected answer. Then find out if your friend can do better.</p>
    <div class="mode-strip"><span>03 ROUNDS</span><span>04 PICKS EACH</span><span>~90 SEC</span></div>
    <div class="round-preview"><div class="preview-label">TODAY / ${escapeHTML(r.category)}</div>
    <h3>${escapeHTML(r.prompt)}</h3>
    ${r.options.slice(0,3).map((o,i)=>`<div class="preview-option"><b>${String(i+1).padStart(2,'0')}</b><span>${escapeHTML(o.label)}</span></div>`).join('')}
    <div class="mini-note" style="margin-top:8px">CAN YOU GUESS THE REFERENCE ORDER?</div></div>
    ${actionButton('play',done?'SEE MY RESULT':partial?`CONTINUE ROUND ${session.locked.length+1}`:"PLAY TODAY'S CHALLENGE")}
    <p class="fine-print"><strong>Free.</strong> No sign-up. No download. Just play.</p>
    ${invitation?`<div class="duel-card"><small>FRIEND CHALLENGE</small><h3>Someone thinks you can't beat their score.</h3><p>Finish the same three rounds to compare. Demo scores are not verified.</p></div>`:''}
    ${disclosure()}</div>`);
}

const labelFor=(round,id)=>round.options.find(opt=>opt.id===id)?.label??'Unknown choice';
function rankView(){
  const round=currentRound();
  if(!round) return resultsView();
  const remaining=round.options.filter(opt=>!ranked.includes(opt.id));
  const slots=Array.from({length:4},(_,i)=>{
    const id=ranked[i],label=id?labelFor(round,id):null;
    return `<div class="rank-slot ${label?'filled':'empty'}"><span class="rank-digit">${String(i+1).padStart(2,'0')}</span>
      ${label?`<span class="slot-name">${escapeHTML(label)}</span><div class="slot-controls">
      <button class="micro-btn" data-action="up" data-index="${i}" aria-label="Move ${escapeHTML(label)} up" ${i===0?'disabled':''}>↑</button>
      <button class="micro-btn" data-action="down" data-index="${i}" aria-label="Move ${escapeHTML(label)} down" ${i===ranked.length-1?'disabled':''}>↓</button>
      <button class="micro-btn remove" data-action="remove" data-index="${i}" aria-label="Remove ${escapeHTML(label)}">×</button>
      </div>`:`<span class="slot-placeholder">${i===ranked.length?'Choose a pick below':'Empty rank'}</span>`}</div>`;
  }).join('');
  return shell(`<div class="progress-head"><span class="eyebrow">ROUND ${String(session.locked.length+1).padStart(2,'0')} / ${escapeHTML(round.category)}</span><span class="progress-num">${String(session.locked.length+1).padStart(2,'0')} / 03</span></div>
    <div class="progress-track"><i style="width:${(session.locked.length+1)/3*100}%"></i></div>
    <h2 class="question">${escapeHTML(round.prompt)}</h2>
    <div class="instruction">RANK FROM MOST ANNOYING TO LEAST</div>
    <p class="helper">Tap each pick to place it, then use the arrows to change your mind. You only get to lock once.</p>
    <div class="ranking" aria-label="Your rank order">${slots}</div>
    ${remaining.length?`<div class="picker-label">CHOOSE YOUR NEXT PICK · ${remaining.length} LEFT</div><div class="choice-list">${remaining.map(opt=>`<button class="choice" data-action="pick" data-id="${opt.id}"><span>${escapeHTML(opt.label)}</span><b aria-hidden="true">+</b></button>`).join('')}</div>`:`<div class="rank-done">All four placed. Your order is yours to lock.</div>`}
    <div class="action-area"><button class="primary" data-action="lock" ${ranked.length!==4?'disabled':''}><span>${ranked.length===4?'LOCK MY GUESS':`${ranked.length} OF 4 CHOICES PLACED`}</span><span class="arrow" aria-hidden="true">→</span></button><div class="status-line" role="status" aria-live="polite">Your picks are saved once you lock. This is practice only.</div></div>`);
}

function orderList(round,order,kind){return order.map((id,i)=>`<div class="comparison-entry ${kind}"><b>${String(i+1).padStart(2,'0')}</b><span>${escapeHTML(labelFor(round,id))}</span></div>`).join('');}
function revealView(){
  const idx=session.locked.length-1,entry=session.locked[idx],round=challenge.rounds[idx];
  if(!entry)return todayView();
  const text=entry.score>=5?'YOU READ THE ROOM.':entry.score>=3?'NOT BAD. NOT PERFECT.':'THE ROOM HAD OTHER IDEAS.';
  return shell(`<div class="reveal-head"><div class="eyebrow">ROUND ${String(idx+1).padStart(2,'0')} / REVEAL</div><h2 class="reveal-standout">${text}</h2></div>
    <div class="score-hero"><b>${String(entry.score).padStart(2,'0')}</b><small>/ 06</small></div><div class="score-descriptor">PAIR DECISIONS MATCHED</div>
    <div class="compare-grid"><div><p class="compare-head">YOUR GUESS</p>${orderList(round,entry.rank,'guess')}</div><div><p class="compare-head">PRACTICE REFERENCE</p>${orderList(round,round.sampleOrder,'reference')}</div></div>
    <div class="points-detail"><strong>Why ${entry.score} points?</strong> Each round has six possible head-to-head pairs. You earn one point whenever you correctly predict which choice ranks higher in the reference order.</div>
    ${actionButton('next',session.locked.length===3?'SEE FINAL SCORE':'NEXT ROUND')}
    ${disclosure('REFERENCE IS ILLUSTRATIVE, NOT SURVEYED')}`);
}
function resultsView(){
  if(session.locked.length!==3) return todayView();
  const score=total();
  const headline=score>=15?'YOU KNOW PEOPLE. MOSTLY.':score>=10?'YOU HAVE GOOD INSTINCTS.':'WELL, THAT WAS A SURPRISE.';
  const compare=invitation&&invitation.day===day?`<div class="duel-card"><small>PRACTICE FRIEND COMPARISON</small><h3>${score>invitation.score?`You scored ${score-invitation.score} points higher.`:score<invitation.score?`They scored ${invitation.score-score} points higher.`:'It’s a tie!'}</h3>
    <div class="duel-comparison"><div><small>YOU</small><strong>${score}</strong></div><div><small>FRIEND LINK</small><strong>${invitation.score}</strong></div></div><p>Friend-link scores are editable and not independently verified.</p></div>`:'';
  return shell(`<div class="page-intro"><div class="eyebrow">PRACTICE RESULT / ${escapeHTML(challenge.title)}</div>
    <div class="result-total"><strong>${String(score).padStart(2,'0')}</strong><span>/18</span></div><h2 class="results-title">${headline}</h2>
    <div class="round-breakdown">${session.locked.map((r,i)=>`<div class="round-tile"><span>ROUND ${i+1}</span><b>${String(r.score).padStart(2,'0')}<small> / 06</small></b></div>`).join('')}</div>
    ${compare||`<div class="duel-card"><small>THE CHALLENGE</small><h3>Think your friend can beat ${score}/18?</h3><p>Same questions, same practice reference. No answers spoiled.</p></div>`}
    ${actionButton('share','CHALLENGE A FRIEND')}
    <button class="secondary block" data-action="weekly">VIEW MY WEEKLY PRACTICE SCORES ↗</button>
    <button class="secondary block" data-action="restart">RESTART THIS PRACTICE DAY</button>
    ${disclosure()}</div>`);
}
function weeklyView(){
  const dates=weekDays(day);
  const entries=dates.map(d=>{
    const data=readSession(stored(STORE_PREFIX+d),d,challengeForDate(d));
    return {day:d,score:data.locked.length===3?sumScores(data.locked.map(r=>r.score)):null};
  });
  const totalWeek=entries.reduce((a,b)=>a+(b.score??0),0), completed=entries.filter(x=>x.score!==null).length;
  return shell(`<div class="page-intro"><div class="eyebrow">YOUR LOCAL SCOREBOARD</div><h2 class="display compact">THIS WEEK,<br>YOUR RULES.</h2>
    <div class="result-total"><strong style="font-size:80px">${totalWeek}</strong><span style="font-size:27px">POINTS</span></div>
    <p class="lede">${completed} of 7 days played. These scores are only saved in this browser and aren't public rankings.</p>
    ${entries.map(entry=>`<div class="history-item"><span class="history-day">${new Date(entry.day+'T12:00:00Z').toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',timeZone:'UTC'})}</span>
    <span class="history-bar"><i style="width:${(entry.score??0)/18*100}%"></i></span><span class="history-score">${entry.score===null?'—':`${entry.score} /18`}</span></div>`).join('')}
    <p class="history-note">Practice days rotate through seven hand-written themes. Real public leaderboards will require verified accounts and a trusted game server.</p>
    ${actionButton('home','BACK TO THE GAME')}${disclosure()}</div>`);
}
function aboutView(){return shell(`<div class="page-intro"><div class="eyebrow">THE RULEBOOK</div><h2 class="display compact">HOW TO<br>READ THE<br>ROOM.</h2>
    <div class="method-rule"><h3>01 / Rank four things.</h3><p>Guess which choice will come first, second, third and last. Nothing starts in a pre-selected order.</p></div>
    <div class="method-rule"><h3>02 / Earn up to six points.</h3><p>Each round contains six pairs of choices. A pair matches when you put the two choices in the same relative order as the reference.</p></div>
    <div class="method-rule"><h3>03 / Do it three times.</h3><p>Three rounds add up to a score between 0 and 18. Send a practice link to a friend and see how your scores compare.</p></div>
    <div class="method-rule"><h3>04 / No made-up crowds.</h3><p>In this preview, every reference order is a <strong>fictional sample</strong>. We have not surveyed any real players. The live version will only score against independently collected, locked votes with a clearly reported sample.</p></div>
    <div class="method-rule"><h3>Your privacy.</h3><p>Results stay in your browser's local storage. No accounts, tracking scripts, personal profiles or external analytics are included. Friend-link practice scores can be changed by anyone with the URL.</p></div>
    ${actionButton('home','BACK TO THE GAME')}</div>`);
}
function render(){
  mount.innerHTML=({today:todayView,rank:rankView,reveal:revealView,results:resultsView,weekly:weeklyView,about:aboutView}[view]||todayView)();
}
function goHome(){setView('today');}
function start(){ranked=[];setView(session.locked.length===3?'results':'rank');}
function selectChoice(id){if(ranked.includes(id)||ranked.length===4||!currentRound()?.options.some(o=>o.id===id))return;ranked=[...ranked,id];render();}
function moveChoice(action,index){if(!Number.isInteger(index)||index<0||index>=ranked.length)return;
  if(action==='remove'){ranked=ranked.filter((_,i)=>i!==index);render();return;}
  const other=action==='up'?index-1:index+1;if(other<0||other>=ranked.length)return;
  const next=[...ranked];[next[index],next[other]]=[next[other],next[index]];ranked=next;render();
}
async function share(){
  const score=total();const link=new URL(window.location.href);link.search=duelSearch(day,score);link.hash='';
  const text=`I scored ${score}/18 on CrowdRank Practice. Think you can read the room better?`;
  try{
    if(navigator.share){await navigator.share({title:'CrowdRank Practice',text,url:link.toString()});notice='Challenge ready to share.';}
    else if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text+' '+link.toString());notice='Practice link copied!';}
    else {window.prompt('Copy this challenge link',link.toString());notice='Use the link to invite your friend.';}
  }catch(err){if(err?.name==='AbortError')return;window.prompt('Copy this challenge link',link.toString());notice='Copy the link to share it.';}
  render();
}

mount.addEventListener('click',event=>{
  const button=event.target.closest('button[data-action]');if(!button||button.disabled)return;
  const action=button.dataset.action,index=Number(button.dataset.index);
  switch(action){
    case'home':goHome();break;
    case'play':start();break;
    case'pick':selectChoice(button.dataset.id);break;
    case'up':case'down':case'remove':moveChoice(action,index);break;
    case'lock':{
      if(ranked.length!==4||session.locked.length===3)return;
      try{session=commitRound(session,session.locked.length,ranked,challenge);saved(session);ranked=[];setView('reveal');}
      catch(err){notice=err.message;render();}
      break;
    }
    case'next':ranked=[];setView(session.locked.length===3?'results':'rank');break;
    case'share':void share();break;
    case'weekly':setView('weekly');break;
    case'about':setView('about');break;
    case'restart':{
      // Reset is offered only for demonstrative practice. Official results will not reset.
      session=newSession(day);saved(session);ranked=[];setView('today');break;
    }
  }
});
render();