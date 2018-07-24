const moment = require('moment');

const date = moment();
console.log(date.format('MMM YYYY'));
date.add(1, 'year');
console.log(date.format('MMM Do YYYY'));
date.add(1, 'year').subtract(3, 'month');
console.log(date.format('MMM DD, YYYY'));

const now = moment();
console.log(now.format('MMM DD, YYYY h:mm:ss A'));

//const createdAt = 1000*60*60*5;
const createdAt = 1000*60*60*1;
const myTime = moment(createdAt);
console.log(myTime.format('h:mm a'));

const currentTimeStamp = moment().valueOf();
console.log(currentTimeStamp);
const myCurrentTime = moment(currentTimeStamp);
console.log(myCurrentTime.format('MMM DD, YYYY h:mm a'));
