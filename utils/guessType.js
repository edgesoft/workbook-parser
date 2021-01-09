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

module.exports = guessType
