const cheerio = require('cheerio')
const micro = require('micro')
const { regExps, sections, getWorkbook, cache } = require('./utils')
const configFile = require('./config')

const getElements = ({ year, month, day }) => {
  if (year < 2021) return '.su'
  if (year <= 2021 && month === 1 && day === 1) return '.su'
  return '.so'
}

const getSection = ($, sectionNumber, d) =>
  $(`.itemData #section${sectionNumber} .pGroup ul`)
    .children()
    .find(getElements(d))
    .map((_, m) => $(m).text())
    .get()

const getEstimatedTime = (type) => {
  switch (type) {
    case 'SONG':
      return 5
    default:
      return null
  }
}

const guessType = (config, section, name, index) => {
  switch (section) {
    case 'TREASURES_FROM_GODS_WORD':
      if (index === 0) return 'HIGHLIGHTS'
      if (index === 1) return 'GEMS'
      if (index === 2) return 'BIBLE_READING'
    case 'INTRODUCTION':
      if (index === 1) return 'OPENING_COMMENTS'
  }

  for (let i = 0; i < config.regExps.length; i++) {
    const exp = config.regExps[i]
    if (exp.sections.indexOf(section) !== -1) {
      const patternMatch = exp.key.exec(name)
      if (patternMatch) return exp.type
    }
  }

  return 'UNKNOWN'
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

const server = micro(async (req, res) => {
  if (req.method !== 'POST') return micro.send(res, 405, 'metod not allowed')

  const {
    lang = 'sv',
    requestDates,
    invalidateCache = false,
  } = await micro.json(req)
  if (!requestDates && !Array.isArray(requestDates))
    return micro.send(res, 401, 'Read information about correct input')

  const config = configFile[lang]
  if (!config)
    return micro.send(
      res,
      401,
      `Read information about correct input. Missing lang: ${lang}`
    )

  const promises = await Promise.all(
    requestDates.map(async (d) => {
      if (invalidateCache) cache.set({ ...d, lang, data: null })
      const c = cache.get({ ...d, lang })
      if (c) {
        return {
          ...c,
        }
      } else {
        const payload = await getWorkbook(config.url, d)
        const $ = cheerio.load(payload)
        const data = {
          ...d,
          data: {
            OVERVIEW: $('.itemData header')
              .eq(1)
              .children()
              .map((_, m) => $(m).text())
              .get()
              .map((m, i) => {
                return {
                  label: m,
                  type: i === 0 ? 'DATE' : 'BIBLE_READING',
                }
              }),
            ...sections.reduce((acc, _, i) => {
              if (i > 0)
                acc[`${sections[i]}`] = filterDescription(
                  config,
                  getSection($, i, d),
                  sections[i]
                )
              return acc
            }, {}),
          },
        }
        cache.set({ ...d, lang, data })
        return data
      }
    })
  )

  return micro.send(res, 200, promises)
})

server.listen(3000)
