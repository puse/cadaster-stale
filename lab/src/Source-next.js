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
    'properties.address'
  ]
}

class _Source {
  constructor (source = {}) {
    this.features = source.features || []
  }

  search (address) {
    const idx = new Fuse(this.features, config)

    const recover = result => {
      const {
        id,
        geometry: {
          coordinates: position
        },
        properties: {
          address
        }
      } = result.item

      const score = 1 - result.score

      return {
        id,
        position,
        address,
        score
      }
    }

    return idx
      .search(address)
      .map(recover)
  }
}

function Source (opts) {
  return new _Source(opts)
}

module.exports = Source
