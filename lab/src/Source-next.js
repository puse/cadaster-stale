const Fuse = require('fuse.js')

const config = {
  shouldSort: true,
  includeScore: true,
  includeMatches: true,
  threshold: 0.5,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 3,
  keys: [
    'properties.name',
    'properties.label'
  ]
}

function search (docs, address) {
  return new Fuse(docs, config)
    .search(address)
}

class _Source {
  constructor (source = {}) {
    this.features = source.features || []
  }

  search (address) {
    return search(this.features, address)
  }
}

function Source (opts) {
  return new _Source(opts)
}

module.exports = Source
