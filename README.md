# 🔥🛢 ExtremeCache

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/joshuaquek/ExtremeCache/graphs/commit-activity)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Extremely performant cache for production usage (1.2 million ops/s). Completely synchronous, no Promises required.

Built with:
* LokiJS High-performance Datastore package
* Native NodeJs Crypto package

## Installation

  `npm install extreme-cache`

## Usage

  Add this to the js file that you are using it in:

  ```javascript
  const ExtremeCache = require('extreme-cache')

  ```

  Simple usage:

  ```javascript
  const ExtremeCache = require('extreme-cache')

  const cache = ExtremeCache('my-custom-cache') 

  cache.set('cat-name', 'garfield')  // No expiry
  cache.set('dog-name', 'odi', 60000) // Expires after 60000 milliseconds, which is 60 seconds

  let cat = cache.get('cat-name')
  let dog = cache.get('dog-name')

  console.log(cat) // outputs the value - 'garfield'
  console.log(dog) // outputs the value - 'odi'

  ```

  Another example usage:

  ```javascript
  const ExtremeCache = require('extreme-cache')
  
  const cache = ExtremeCache('my-custom-cache') 

  // ---- Insert a value with an expiry of 5.0 seconds ----
  cache.set('personA', {name: 'john', age: 21}, 5000) 

  // ---- Insert a value with no expiry ----
  cache.set('personB', {name: 'enoch', age: 9999}) 

  setTimeout(() => {
    // ---- Check cache after 3.0 seconds ----
    let value = cache.get('personA')
    console.log(value) // Returns {name: 'john', age: 21}
  }, 3000)

  setTimeout(() => {
    // ---- Retrieve the entire cache after 4.0 seconds ----
    let value = cache.dump()
    console.log(value) // Returns [ { key: 'personA', value: { name: 'john', age: 21 }, expiryInMs: 5000 }, { key: 'personB', value: { name: 'enoch', age: 9999 }, expiryInMs: undefined }]
  }, 4000)

  setTimeout(() => {
    // ---- Check cache after 7.0 seconds ----
    let value = cache.get('personA')
    console.log(value) // Return undefined as object has already expired
  }, 7000)

  ```

  Accessible globally, meaning that no matter what file you are using it in your NodeJS project, as long as the cache name is the same, it will be referring to the same cache:

  Inside `File_A.js`: 
  ```javascript
  // File_A.js

  const ExtremeCache = require('extreme-cache')

  const cache = ExtremeCache('my-unique-cache-name') 

  cache.set('cat-name', 'garfield')

  ```

  Inside `File_B.js`: 
  ```javascript
  // File_B.js

  const ExtremeCache = require('extreme-cache')

  const cache = ExtremeCache('my-unique-cache-name') 

  let value = cache.get('cat-name')
  
  console.log(value) // outputs 'garfield'

  ```

## API Reference

* `set(key, value, expiryInMs)`

  Usage:
  ```javascript
  const ExtremeCache = require('extreme-cache')

  const cache = ExtremeCache('my-custom-cache') 

  // Set with an expiry
  cache.set('cat-name', 'garfield', 5000)

  // Set without an expiry
  cache.set('dog-name', 'odi')

  ```

* `get(key)`

  Usage:
  ```javascript
  const ExtremeCache = require('extreme-cache')
  
  const cache = ExtremeCache('my-custom-cache') 

  cache.set('cat-name', 'garfield')

  let value = cache.get('cat-name')

  console.log(value) // outputs the value - 'garfield'

  ```

* `delete(key)`

  Usage:
  ```javascript
  const ExtremeCache = require('extreme-cache')

  const cache = ExtremeCache('my-custom-cache') 

  cache.set('cat-name', 'garfield')

  let value = cache.delete('cat-name')

  console.log(value) // outputs the deleted object - { key: 'cat-name', value: 'garfield', timeoutInMs: undefined }

  ```

* `dump()`

  Usage:
  ```javascript
  const ExtremeCache = require('extreme-cache')

  const cache = ExtremeCache('my-custom-cache') 

  cache.set('cat-name', 'garfield')

  cache.set('dog-name', 'odi', 5000)

  let value = cache.dump()
  
  console.log(value) // outputs the entire cache in an array - [{ key: 'cat-name', value: 'garfield', timeoutInMs: undefined }, { key: 'dog-name', value: 'odi', timeoutInMs: 5000 }]

  ```

* `clearAll()`

  Usage:
  ```javascript
  const ExtremeCache = require('extreme-cache')

  const cache = ExtremeCache('my-custom-cache') 

  cache.set('cat-name', 'garfield')
  
  cache.set('dog-name', 'odi', 5000)

  let value = cache.dump()

  console.log(value) // outputs the entire cache in an array - [{ key: 'cat-name', value: 'garfield', timeoutInMs: undefined }, { key: 'dog-name', value: 'odi', timeoutInMs: 5000 }]

  let cacheName = cache.clearAll() // Clears the cache and returns the cache name as a string - 'my-custom-cache'

  value = cache.dump()
  
  console.log(value) // outputs the entire cache in an array, which will be empty by now - []

  ```

## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.