/** Pure CrowdRank practice rules. Official scoring requires a server-held, precommitted panel benchmark. */
export function validateRank(order, optionIds) {
  return Array.isArray(order) && Array.isArray(optionIds) && optionIds.length === 4 &&
    order.length === 4 && new Set(order).size === 4 && new Set(optionIds).size === 4 &&
    order.every(id => typeof id === 'string' && optionIds.includes(id));
}

export function pairScore(guess, answer) {
  if (!validateRank(guess, answer)) throw new Error('Invalid ranking');
  let points = 0;
  for(let i = 0; i < guess.length; i++) {
    for(let j = i + 1; j < guess.length; j++) {
      if (answer.indexOf(guess[i]) < answer.indexOf(guess[j])) points++;
    }
  }
  return points;
}

export function sumScores(scores) {
  if (!Array.isArray(scores) || scores.length !== 3) throw new Error('Exactly three round scores required');
  if(scores.some(score => !Number.isInteger(score) || score < 0 || score > 6)) throw new Error('Invalid round score');
  return scores.reduce((total, score) => total + score, 0);
}

export function dateKey(date = new Date()) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) throw new Error('Invalid date');
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone:'Asia/Kolkata', year:'numeric', month:'2-digit', day:'2-digit'
  }).formatToParts(date);
  const values = Object.fromEntries(parts.filter(part => part.type !== 'literal').map(part=>[part.type,part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}