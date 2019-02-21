import { dateRelativeMs } from '../dateRelativeMs'
const tk = require('timekeeper')

const FROZEN_TIME = new Date(1549997377543)

describe('dateRelativeMs', () => {
  it('should return the relative date', () => {
    tk.freeze(FROZEN_TIME)
    var beforeFrozenTimeMs = 1549997174543
    var frozenTime = new Date(beforeFrozenTimeMs)
    expect(dateRelativeMs(beforeFrozenTimeMs, FROZEN_TIME)).toEqual(expect.stringMatching(/today at \d{1,2}:46 (AM|PM)/))
    expect(dateRelativeMs(frozenTime, FROZEN_TIME)).toEqual(expect.stringMatching(/today at \d{1,2}:46 (AM|PM)/))
    tk.reset()
  })

  it('should use the default current date as the future date if non supplied', () => {
    tk.freeze(FROZEN_TIME)

    expect(dateRelativeMs(FROZEN_TIME - 100000000)).toEqual(expect.stringMatching(/yesterday at \d{1,2}:02 (AM|PM)/))

    tk.reset()
  })

  it('should return empty string without a proper unix timestamp', () => {
    expect(dateRelativeMs()).toEqual('')
  })
})
