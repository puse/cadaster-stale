import test from 'ava'

import Geocoder from '../src/Geocoder'

// assets

const DATA = require('./abcd.geo.json')

const [ A, B, C, D ] = DATA.features

// helpers

// hooks

test('signature', t => {
  t.is(typeof Geocoder, 'function')

  const source = Geocoder({ features: [A, B, C, D] })

  const results = source.search('black forest')
  t.true(Array.isArray(results))
})

test('config', async t => {
  const features = [A, B, C, D]
  const address = 'black forest'

  const xs0 = Geocoder({ features })
    .search(address)
  t.is(xs0.length, 3)

  const xs1 = Geocoder({ features, config: { threshold: 0.3 } })
    .search(address)
  t.is(xs1.length, 1)
})
