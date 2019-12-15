var fs = require('fs')
var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  var scriptStr = `hello world`
  res.end(scriptStr)
})

router.post('/enter', function (req, res) {
  fs.appendFile('./data/account.js', JSON.stringify(req.body.params), (err, data) => {
    if(err) {
      return console.log(err)
    }
    console.log('数据写入成功')
  })
  res.end(JSON.stringify(req.body.params))
})
module.exports = router