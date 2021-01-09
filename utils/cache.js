const cache = {}

const get = ({ year, month, day, lang }) => {
  const key = cache[`${lang - year - month - day}`]
  if (key) {
    return key
  }

  return null
}

const set = ({ year, month, day, lang, data }) => {
  cache[`${lang - year - month - day}`] = data
}

module.exports = {
  get,
  set,
}
