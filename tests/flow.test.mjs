import test from 'node:test';
import assert from 'node:assert/strict';

test('guest plays three rounds, sees scores and can open weekly history',async()=>{
 const storage=new Map(); let handler;
 const root={innerHTML:'',addEventListener(type,fn){if(type==='click') handler=fn;}};
 globalThis.document={getElementById(id){assert.equal(id,'game');return root;}};
 globalThis.window={location:{search:'',href:'https://crowdrank.example/'},scrollTo(){}};
 globalThis.localStorage={getItem:key=>storage.get(key)??null,setItem:(key,v)=>storage.set(key,v)};
 await import('../web/app.mjs?test=full-flow');
 const click=(action,id,index)=>handler({target:{closest:()=>({dataset:{action,id,index},disabled:false})}});
 assert.match(root.innerHTML,/PLAY TODAY'S CHALLENGE/);
 click('play');
 assert.match(root.innerHTML,/data-action="lock" disabled/);
 for(let round=0;round<3;round++){
  for(const id of ['a','b','c','d']) click('pick',id);
  assert.doesNotMatch(root.innerHTML,/data-action="lock" disabled/);
  click('lock');
  assert.match(root.innerHTML,/PRACTICE REFERENCE/);
  click('next');
 }
 assert.match(root.innerHTML,/PRACTICE RESULT/);
 const stored=Array.from(storage.values())[0];
 assert.equal(JSON.parse(stored).locked.length,3);
 click('weekly');
 assert.match(root.innerHTML,/LOCAL SCOREBOARD/);
 click('home');
 assert.match(root.innerHTML,/SEE MY RESULT/);
 click('play');click('restart');
 assert.match(root.innerHTML,/PLAY TODAY'S CHALLENGE/);
});
