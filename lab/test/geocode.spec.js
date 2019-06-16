import test from 'ava'

import geocode from '../src/geocode'
import Source from '../src/Source'

// assets

const ADDRESS_OK = 'exo, Hudson, Canada'
const ADDRESS_OTHER = 'Exo, Bogatynia, Poland'

const POSITION_OK = [ -74.140602, 45.459373 ]

// tests

test('signature', t => {
  t.is(typeof geocode, 'function')
})

test('optimistic case', t => {
  const dict = {
    [ADDRESS_OK]: POSITION_OK
  }

  const source = Source({ dict })

  t.is(geocode(source, ADDRESS_OTHER), undefined)
  t.deepEqual(geocode(source, ADDRESS_OK), POSITION_OK)
})
