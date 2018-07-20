const Loki = require('lokijs') // Used as the high-performance store, and clears when the nodejs process restarts
const crypto = require('crypto') // Used for creating a hashed name for cache in case the nodejs project already uses lokijs as a store/database

// Returns a ExtremeCache object
module.exports = (cacheName) => {
  if (!cacheName) throw new Error('Please provide a cache name. Example: ` ExtremeCache("my-custom-cache") ` ') // If no input is given, throw error
  const hashedName = crypto.createHash('sha256').update(cacheName).digest('hex') // Create hashed name for cache in case project already uses lokijs as a store/database
  const cache = new Loki(`${hashedName}.db`) // Create temporary cache upon initialisation
  const store = cache.addCollection(hashedName, { clone: true, disableMeta: true }) // Set clone to true to prevent changing store values from resultset, and set disableMeta to true to disable Metadata
  return {

    // ------- Set value from store using key -------
    set: (key, value, expiryInMs) => {
      try {
        if (!key) throw new Error('Please provide a key name. Example: ` .set("car-name", "honda") ` ')
        if (!value) throw new Error('Please provide a value name. Example: ` .set("car-name", "honda") ` ')
        let objectToInsert = { key: key, value: value, expiryInMs: expiryInMs }
        store.insert(objectToInsert)
        if (expiryInMs) { // Set expiry to key-value pair. If no expiry is provided, the key-value pair will not expire.
          setTimeout(() => {
            store.findAndRemove({ key: key })
          }, expiryInMs)
        }
        return objectToInsert // Returns object that has been created
      } catch (error) {
        throw error
      }
    },

    // ------- Get value from store using key -------
    get: (key) => {
      try {
        return (store.find({ key: key })[0] || {}).value // Returns undefined if not found, else returns object value.
      } catch (error) {
        throw error
      }
    },

    delete: (key) => {
      try {
        let removedObjectValue = (store.find({ key: key })[0] || {}).value
        store.findAndRemove({ key: key })
        return { key: key, value: removedObjectValue } // Returns undefined if object to be deleted doesn't exist, else return object that has been deleted.
      } catch (error) {
        throw error
      }
    },

    dump: () => {
      try {
        return store.find().map((item) => {
          delete item['$loki']
          return item
        }) // Returns the entire cache as an array. If there are no items in the cache it will return an empty array.
      } catch (error) {
        throw error
      }
    },

    clearAll: () => {
      try {
        store.clear()
        return cacheName // Returns the name of the cleared cache.
      } catch (error) {
        throw error
      }
    }

  }
}
