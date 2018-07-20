const QuickCache = require('../index.js')

const cache = QuickCache('my-custom-cache')

console.log('\n\n')
console.log(' ---- Insert a value with an expiry of 5.0 seconds ----')
let insertedResult = cache.set('john', {name: 'john', age: 21}, 5000)
console.log(insertedResult)
console.log('\n\n')

console.log('\n\n')
console.log(' ---- Insert another value with no expiry ----')
let insertedResult2 = cache.set('sammy', {name: 'sammy', age: 22})
console.log(insertedResult2)
console.log('\n\n')

setTimeout(() => {
  console.log('---- Check cache for object after 3.0 seconds ----')
  let value = cache.get('john')
  console.log(value)
  console.log('\n\n')
}, 3000)

setTimeout(() => {
  console.log('---- Check whole cache after 4.0 seconds ----')
  let wholeCache = cache.dump()
  console.log('Dump of cache: ', wholeCache)
  console.log('\n\n')
}, 4000)

setTimeout(() => {
  console.log('---- Check cache after 7.0 seconds, it should return undefined because expiry has been set to 5.0 seconds ----')
  let value = cache.get('john')
  console.log(value)
  console.log('\n\n')
}, 7000)

setTimeout(() => {
  console.log(' ---- Insert a value with an expiry of 10.0 seconds ----')
  let insertedResult3 = cache.set('jane', {name: 'jane', age: 21}, 10000)
  console.log(insertedResult3)
  console.log('\n\n')
}, 8000)

setTimeout(() => {
  console.log('---- Delete object after 3.0 seconds ----')
  let value = cache.delete('jane')
  console.log('Deleted Object:', value)
  console.log('\n\n')
}, 11000)

setTimeout(() => {
  console.log('---- Check cache after 7.0 seconds, it should return undefined because expiry has been set to 5.0 seconds ----')
  let value = cache.get('jane')
  console.log(value)
  console.log('\n\n')
}, 15000)

setTimeout(() => {
  console.log('---- Clear Entire Cache ----')
  let clearedCache = cache.clearAll()
  console.log('Name of cleared cache: ', clearedCache)
  console.log('\n\n')
}, 16000)
