import test from 'node:test';
import assert from 'node:assert/strict';
import {validateRank,pairScore,sumScores,dateKey} from '../web/core.mjs';
import {PRACTICE_DAYS,challengeForDate} from '../web/content.mjs';

test('pair scores: perfect six, adjacent swap five, reverse zero',()=>{
 const a=['a','b','c','d'];
 assert.equal(pairScore(a,a),6);
 assert.equal(pairScore(['b','a','c','d'],a),5);
 assert.equal(pairScore(['d','c','b','a'],a),0);
});
test('rank requires four distinct, matching choices',()=>{
 const a=['a','b','c','d'];
 assert.equal(validateRank(a,a),true);
 for(const value of [[],['a','a','c','d'],['a','b','c','z'],['a','b','c','d','e'],'abcd']) assert.equal(validateRank(value,a),false);
 assert.throws(()=>pairScore(['a','a','c','d'],a),/Invalid/);
});
test('day score rejects invalid and incomplete data',()=>{
 assert.equal(sumScores([6,5,0]),11);
 assert.equal(sumScores([6,6,6]),18);
 assert.throws(()=>sumScores([6,7,4]),/score/i);
 assert.throws(()=>sumScores([6,5]),/three/i);
});
test('day boundaries follow India time',()=>{
 assert.equal(dateKey(new Date('2026-10-30T18:20:00.000Z')),'2026-10-30');
 assert.equal(dateKey(new Date('2026-10-30T18:40:00.000Z')),'2026-10-31');
});
test('seven practice days contain valid complete distinct rounds',()=>{
 assert.equal(PRACTICE_DAYS.length,7);
 for(const day of PRACTICE_DAYS){
  assert.equal(day.rounds.length,3);
  assert.equal(new Set(day.rounds.map(r=>r.id)).size,3);
  for(const round of day.rounds){
   const ids=round.options.map(o=>o.id);
   assert.equal(ids.length,4);
   assert.equal(new Set(ids).size,4);
   assert.equal(validateRank(round.sampleOrder,ids),true);
   assert.ok(round.prompt.length>=10);
  }
 }
 assert.notEqual(challengeForDate('2026-10-30').rounds[0].id,challengeForDate('2026-10-31').rounds[0].id);
 assert.throws(()=>challengeForDate('bad-date'),/date/i);
});
