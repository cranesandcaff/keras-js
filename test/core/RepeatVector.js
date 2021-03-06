/* eslint-env browser, mocha */

describe('core layer: RepeatVector', function () {
  const assert = chai.assert
  const styles = testGlobals.styles
  const logTime = testGlobals.logTime
  const stringifyCondensed = testGlobals.stringifyCondensed
  const approxEquals = KerasJS.testUtils.approxEquals
  const layers = KerasJS.layers

  before(function () {
    console.log('\n%ccore layer: RepeatVector', styles.h1)
  })

  it('[core.RepeatVector.0] should be able to go from shape [6] -> [7, 6]', function () {
    const key = 'core.RepeatVector.0'
    console.log(`\n%c[${key}] repeat vector, shape [6] -> [7, 6]`, styles.h3)
    let testLayer = new layers.RepeatVector({ n: 7 })
    let t = new KerasJS.Tensor(TEST_DATA[key].input.data, TEST_DATA[key].input.shape)
    console.log('%cin', styles.h4, stringifyCondensed(t.tensor))
    const startTime = performance.now()
    t = testLayer.call(t)
    const endTime = performance.now()
    console.log('%cout', styles.h4, stringifyCondensed(t.tensor))
    logTime(startTime, endTime)
    const dataExpected = new Float32Array(TEST_DATA[key].expected.data)
    const shapeExpected = TEST_DATA[key].expected.shape
    assert.deepEqual(t.tensor.shape, shapeExpected)
    assert.isTrue(approxEquals(t.tensor, dataExpected))
  })
})
