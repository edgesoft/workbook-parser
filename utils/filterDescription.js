const regExps = require('./regexp')
const guessType = require('./guessType')

const getEstimatedTime = (type) => {
  switch (type) {
    case 'SONG':
      return 5
    default:
      return null
  }
}

const filterDescription = (config, arr, section) => {
  return arr.map((i, s) => {
    const str = arr[s]

    const patternMatch = regExps.descDeviderExp.exec(str)

    if (patternMatch) {
      const description = str
        .substr(patternMatch.index + patternMatch[0].length, str.length)
        .trim()
      const name = (str.substr(0, patternMatch.index) + patternMatch[0]).trim()
      const time = parseInt(patternMatch[0].match(regExps.numExp)[0], 10)
      return {
        label: name,
        description: description.length > 0 ? description : null,
        type: guessType(config, section, name, s),
        time,
      }
    }

    const type = guessType(config, section, str.trim(), s)

    return {
      label: str.trim(),
      description: null,
      type,
      time: getEstimatedTime(type),
    }
  })
}

module.exports = filterDescription
