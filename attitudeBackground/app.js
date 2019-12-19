const http = require('http')
const router = require('./router')
const express = require('express')
const app = express()
const mongoose = require('./mongoose')
// 解析post请求的参数
const bodyParser = require('body-parser')
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
 
 // 连接数据库
mongoose();

app.use(router)
app.listen('4000', function () {
  console.log('ATM后台启动')
})