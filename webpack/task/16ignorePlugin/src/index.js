import moment from 'moment'
console.log(111)
// moment.locale('af')
const d = moment("20111031", "YYYYMMDD").fromNow();
console.log(d)