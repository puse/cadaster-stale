import test from 'ava'

import Geocoder from '../src/Geocoder'

// assets

const A = {
  type: 'Feature',
  id: 'A',
  geometry: {
    type: 'Point',
    coordinates: [ -104.677422, 39.06047 ]
  },
  properties: {
    name: 'Black Forest',
    label: 'Black Forest, CO, USA'
  }
}

const B = {
  type: 'Feature',
  id: 'B',
  geometry: {
    type: 'Point',
    coordinates: [ -7.815218, 52.679012 ]
  },
  properties: {
    name: 'Black Castle',
    label: 'Black Castle, Thurles, Ireland'
  }
}

const C = {
  type: 'Feature',
  id: 'C',
  geometry: {
    type: 'Point',
    coordinates: [ 17.876543, 59.951621 ]
  },
  properties: {
    name: 'Black Castle',
    label: 'Black Castle, Rasbo, Sweden'
  }
}

const D = {
  type: 'Feature',
  id: 'D',
  geometry: {
    type: 'Point',
    coordinates: [ -80.901872, 26.736239 ]
  },
  properties: {
    name: 'Red Road',
    label: 'Red Road, Hendry County, FL, USA'
  }
}

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
