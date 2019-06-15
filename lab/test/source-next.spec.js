import test from 'ava'

import Source from '../src/Source-next'

// assets

const A = {
  type: 'Feature',
  id: 'A',
  geometry: {
    type: 'Point',
    coordinates: [ -104.677422, 39.06047 ]
  },
  properties: {
    address: 'Black Forest, CO, USA'
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
    address: 'Black Castle, Thurles, Ireland'
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
    address: 'Black Castle, Rasbo, Sweden'
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
    address: 'Red Road, Hendry County, FL, USA'
  }
}

// helpers

// hooks

test('signature', t => {
  t.is(typeof Source, 'function')

  const source = Source({ features: [A, B, C, D] })

  const results = source.search('black forest')
  t.true(Array.isArray(results))
})
