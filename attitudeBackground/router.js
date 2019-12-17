var fs = require('fs')
var express = require('express')
var router = express.Router()
var User = require('./models/user.js')

router.get('/', function (req, resU) {
  var scriptStr = `hello world`
  res.end(scriptStr)
})


router.post('/register', function (req, res) {
  // 获取用户提交的信息
  console.log(req.body)
  var postData = {
    username: req.body.username,
    password: req.body.password,
  };
  // 查询是否被注册
  User.findOne({ username: postData.username }, function (err, data) {
    if (data) {
      res.send('用户名已被注册');
    } else {
      // 保存到数据库
      User.create(postData, function (err, data) {
        if (err) throw err;
        res.end(JSON.stringify(data));
      })
    }
  });
})

router.post('/login', function (req, res) {
  var postData = {
    username: req.body.username,
    password: req.body.password
  };
  User.findOne({
    username: postData.username,
    password: postData.password
  }, function (err, data) {
    if (err) throw err;
    if (data) {
      res.send(JSON.stringify(data));
    } else {
      res.send('账号或密码错误');
    }
  });
});

// 获取所有用户列表
router.get('/userList', function (req, res) {
  User.find({}, function (err, data) {
    if (err) throw err;
    res.send(data)
  });
});

// 清空所有用户
router.get('/clearUserList', function (req, res) {
  User.remove({}, function (err, data) {
    res.end('删除成功')
  })
})

// 更新用户信息 
router.get('/favorite', function (req, res) {
  var postData = {
    username: req.query.username,
    password: req.query.password
  };
  // 保存到数据库
  User.update(postData, req.query, function (err, data) {
    if (err) throw err;
    if (data) {
      res.end(JSON.stringify(req.query));
    } else {
      res.send('更新失败!');
    }
  })
})
module.exports = router
