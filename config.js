module.exports = {
  sv: {
    url: 'https://wol.jw.org/sv/wol/dt/r14/lp-z/',
    regExps: [
      {
        key: /Sång \d+(.{8}?)?/,
        type: 'SONG',
        sections: [
          'INTRODUCTION',
          'APPLY_YOURSELF_MINISTRY',
          'LIVING_AS_CHRISTIANS',
        ],
        min: 5,
      },
      {
        key: /Församlingens bibelstudium: \(([a-z]*?\s)?\d* min\.\)/,
        type: 'CONGREGATION_BIBLE_STUDY',
        sections: ['LIVING_AS_CHRISTIANS'],
      },
      {
        key: /Avslutande ord \(([a-z]*?\s)?\d* min\.\)/,
        type: 'CONCLUDING_COMMENTS',
        sections: ['LIVING_AS_CHRISTIANS'],
      },
      {
        key: /Bibelkurs: \(([a-z]*?\s)?\d* min\.\)/,
        type: 'BIBLE_COURSE',
        sections: ['APPLY_YOURSELF_MINISTRY'],
      },
      {
        key: /Återbesök: \(([a-z]*?\s)?\d* min\.\)/,
        type: 'RETURN_VISIT',
        sections: ['APPLY_YOURSELF_MINISTRY'],
      },
      {
        key: /Förstabesök: \(([a-z]*?\s)?\d* min\.\)/,
        type: 'INITIAL_CALL:',
        sections: ['APPLY_YOURSELF_MINISTRY'],
      },
      {
        key: /Tal: \(([a-z]*?\s)?\d* min\.\)/,
        type: 'TALK',
        sections: ['APPLY_YOURSELF_MINISTRY'],
      },
      {
        key: /Inbjudan till minneshögtiden: \(([a-z]*?\s)?\d* min\.\)/,
        type: 'MEMORIAL_INVITATION',
        sections: ['APPLY_YOURSELF_MINISTRY'],
      },
      {
        key: /Video (.*)?: \(([a-z]*?\s)?\d* min\.\)/,
        type: 'VIDEO',
        sections: ['APPLY_YOURSELF_MINISTRY'],
      },
    ],
  },
}
