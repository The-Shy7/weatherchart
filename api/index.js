const fetch = require('node-fetch')

const root = 'https://api.darksky.net/forecast'

const key = 'ff44717dec09b51014ff551f271f55ed'

module.exports = async function(req, res) {
  const {lat, lon} = req.query
  try {
    const url = `${root}/${key}/${lat},${lon}`
    const r = await fetch(url)
    const json = await r.json()
    res.status(200).send(json)
  } catch(e) {
    res.status(500).send('fail: '+e.message)
  }
}