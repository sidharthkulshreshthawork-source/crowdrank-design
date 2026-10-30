/** Seven hand-authored PRACTICE sets. Example orders are fictitious and are never represented as real votes. */
const makeRound = (id, prompt, items, order, category = 'EVERYDAY LIFE') => ({
  id, prompt, category, instruction:'Most annoying → least annoying',
  options:items.map((label,i)=>({id:'abcd'[i],label})), sampleOrder:order.split('')
});

export const PRACTICE_DAYS = [
  {title:'SOCIAL CHAOS', tagline:'Four choices. Zero easy answers.', rounds:[
    makeRound('trip','What ruins a group trip?', ['The always-late friend','The awkward money split','The playlist dictator','Nobody plans anything'],'bacd','SOCIAL LIFE'),
    makeRound('chat','What makes a group chat unbearable?', ['Endless good-morning forwards','Voice notes longer than podcasts','Replies of just “K”','A hundred unread memes'],'badc','GROUP CHATS'),
    makeRound('weekend','What kills weekend plans fastest?', ['“Let’s decide tomorrow”','Everyone being on their phone','A surprise work call','Three hours choosing a place'],'cadb','THE WEEKEND')
  ]},
  {title:'MONEY & MANNERS', tagline:'Friendships survive. Sometimes.', rounds:[
    makeRound('borrow','What is the worst money habit?', ['Borrowing and forgetting','Splitting every tiny expense','Showing off every purchase','Always expecting someone else to pay'],'adbc','MONEY'),
    makeRound('restaurant','What is the worst dinner-table move?', ['Taking everyone’s fries','Only showing up for dessert','Ordering big, then splitting equally','Making the waiter wait forever'],'cdab','EATING OUT'),
    makeRound('office','What makes office life frustrating?', ['A meeting that should be a message','The reply-all email storm','Being told “quick call?”','A calendar full of fake urgency'],'acdb','WORK LIFE')
  ]},
  {title:'PHONE ADDICTION', tagline:'The little things that break us.', rounds:[
    makeRound('battery','What is the worst phone moment?', ['Battery hits 1% outside','Your screen freezes during payment','You send a message to the wrong chat','No internet just when you need it'],'dbca','TECH PAIN'),
    makeRound('reels','What makes scrolling irritating?', ['Ads louder than the video','Same video recommended again','A cliffhanger with no second part','The “part 2 on my profile” trick'],'dacb','SOCIAL MEDIA'),
    makeRound('call','What is the worst call habit?', ['Calling five times in a row','Putting you on speaker without asking','Saying “I’ll call back” and vanishing','Talking while eating crisps'],'bcad','PHONE CALLS')
  ]},
  {title:'FOOD FIGHTS', tagline:'Everyone has a strong opinion.', rounds:[
    makeRound('delivery','What is the worst food-ordering problem?', ['Missing the dipping sauce','Cold fries','A soggy pizza box','The wrong order entirely'],'dbca','TAKEAWAY'),
    makeRound('kitchen','What ruins a shared kitchen?', ['Dirty dishes left overnight','Someone taking your leftovers','No one replacing empty items','Food scraps in the sink'],'abdc','LIVING TOGETHER'),
    makeRound('cafe','What makes a café visit annoying?', ['Someone taking video calls loudly','No seats after ordering','A laptop charger hogging the socket','A 30-minute wait for coffee'],'adbc','CAFÉ LIFE')
  ]},
  {title:'CITY LIFE', tagline:'One city. A million little battles.', rounds:[
    makeRound('commute','What makes a commute miserable?', ['Traffic that does not move','Someone playing audio aloud','A last-minute route change','An endless parking hunt'],'abdc','GETTING AROUND'),
    makeRound('queue','Which queue habit is the worst?', ['Cutting ahead of everyone','Holding a place for ten friends','Arguing at the counter','Taking forever to decide'],'abdc','PUBLIC PLACES'),
    makeRound('shopping','What spoils a shopping trip?', ['No prices on display','Too much pushy selling','A checkout that takes ages','Your size is always unavailable'],'bcad','SHOPPING')
  ]},
  {title:'FRIEND TEST', tagline:'This might start a debate.', rounds:[
    makeRound('friend','What is the worst friend behaviour?', ['Canceling at the last minute','Telling your secret','Never cheering for you','Only calling when they need help'],'bdca','FRIENDSHIP'),
    makeRound('birthday','What makes a birthday awkward?', ['Friends forgetting the day','Someone making it about themselves','A forced speech in public','An unexpected expensive bill'],'badc','BIRTHDAYS'),
    makeRound('hangout','What makes a hangout go wrong?', ['One person choosing everything','Everyone checking their phone','Someone leaving without telling anyone','A friend bringing an uninvited guest'],'dcab','HANGOUTS')
  ]},
  {title:'THE BIG DEBATE', tagline:'You think you know people?', rounds:[
    makeRound('habits','What is the most annoying everyday habit?', ['Talking through a movie','Stopping suddenly in a crowd','Leaving messages on read','Never putting anything back'],'badc','HUMAN BEHAVIOUR'),
    makeRound('travel','What is the biggest travel headache?', ['Losing your luggage','A flight delayed for hours','A hotel nothing like the photos','Realising you forgot your charger'],'acbd','TRAVEL'),
    makeRound('living','What is the worst roommate habit?', ['Eating food that is not theirs','Leaving lights on all night','Not cleaning shared spaces','Having loud calls after midnight'],'cadb','ROOMMATES')
  ]}
];

/** Date selection is deterministic for a playable seven-day practice rotation. */
export function challengeForDate(dayString) {
  if(typeof dayString !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dayString)) throw new Error('Invalid date format');
  const timestamp = Date.parse(`${dayString}T00:00:00.000Z`);
  if(!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0,10)!==dayString) throw new Error('Invalid date');
  const dayIndex = Math.floor(timestamp/86400000);
  const source=PRACTICE_DAYS[((dayIndex%7)+7)%7];
  return {day:dayString,mode:'practice',version:'practice-v1',...source};
}
