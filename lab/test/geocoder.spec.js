import test from 'ava'

import Geocoder from '../src/Geocoder'

// assets

const DATA = require('./abcd.geo.json')

// hooks

test('signature', async t => {
  t.is(typeof Geocoder, 'function')

  const data = DATA

  const address = 'black forest'

  await Geocoder({ data })
    .search({ address })
    .then(results => {
      t.true(Array.isArray(results))
    })
})

test('config', async t => {
  const data = DATA
  const address = 'black forest'

  await Geocoder({ data })
    .search({ address })
    .then(results => {
      t.is(results.length, 3)
    })

  await Geocoder({ data, config: { threshold: 0.3 } })
    .search({ address })
    .then(results => {
      t.is(results.length, 1)
    })
})
