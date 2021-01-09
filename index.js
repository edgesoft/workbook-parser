const cheerio = require('cheerio')
const micro = require('micro')
const { filterDescription, sections, getWorkbook, cache } = require('./utils')
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
      if (d.invalidateCache) cache.set({ ...d, lang, data: null })
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
