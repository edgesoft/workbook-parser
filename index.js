const cheerio = require('cheerio')
const fetch = require('node-fetch')
const micro = require('micro')
const { descDeviderExp } = require('./utils/regexp')
const configFile = require('./config')

const sections = [
  'OVERVIEW',
  'INTRODUCTION',
  'TREASURES_FROM_GODS_WORD',
  'APPLY_YOURSELF_MINISTRY',
  'LIVING_AS_CHRISTIANS',
]

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

    const patternMatch = descDeviderExp.exec(str)

    if (patternMatch) {
      const description = str
        .substr(patternMatch.index + patternMatch[0].length, str.length)
        .trim()
      const name = (str.substr(0, patternMatch.index) + patternMatch[0]).trim()
      return {
        label: name,
        description: description.length > 0 ? description : null,
        type: guessType(config, section, name, s),
      }
    }

    return {
      label: str.trim(),
      description: null,
      type: guessType(config, section, str.trim(), s),
    }
  })
}

const getWorkbook = async (url, { year, month, day }) => {
  const response = await fetch(`${url}/${year}/${month}/${day}`, {
    headers: {
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3968.0 Safari/537.36',
    },
  })

  return cheerio.load(await response.text())
}

const server = micro(async (req, res) => {
  if (req.method !== 'POST') return micro.send(res, 405, 'metod not allowed')

  const { lang = 'sv', requestDates } = await micro.json(req)
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
      const $ = await getWorkbook(config.url, d)
      return {
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
    })
  )

  return micro.send(res, 200, promises)
})

server.listen(3000)
