const Fuse = require('fuse.js')

const R = require('ramda')

// Standard config

const FUSE_CONFIG_DEFAULT = {
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

// helpers

/**
 * Safely get `features` array from given `Context`
 *
 * @param {Context} ctx
 *
 * @return {Array<Feature>}
 */

const dataFrom = R.pathOr([], ['data', 'features'])

/**
 * Safely get `config` object from given `Context`
 *
 * @param {Context} ctx
 *
 * @return {Config}
 */

const configFrom = R.compose(
  R.mergeRight(FUSE_CONFIG_DEFAULT),
  R.propOr({}, 'config')
)

// methods

function search (ctx, query) {
  const docs = dataFrom(ctx)
  const config = configFrom(ctx)

  const { address } = query

  const results = new Fuse(docs, config).search(address)

  return Promise.resolve(results)
}

// class constructor

class _Geocoder {
  constructor (opts) {
    this.config = opts.config
    this.data = opts.data
  }

  search (query) {
    return search(this, query)
  }
}

// constructor

function Geocoder (opts) {
  return new _Geocoder(opts)
}

module.exports = Geocoder
