const fetch = require('node-fetch')

const getWorkbook = async (url, { year, month, day }) => {
  const response = await fetch(`${url}/${year}/${month}/${day}`, {
    headers: {
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3968.0 Safari/537.36',
    },
  })

  return await response.text()
}

module.exports = getWorkbook
