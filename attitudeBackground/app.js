const http = require('http')
var router = require('./router')
const express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// 设置跨域
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-type');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  res.header('Access-Control-Max-Age', 1728000);//预请求缓存20天
  next();
});
 
app.use(router)
app.listen('4000', function () {
  console.log('陈冠希node后台启动')
})