var fs = require('fs')
var express = require('express')
var router = express.Router()
var User = require('./models/user.js')
var multer = require('multer')

router.get('/', function (req, res) {
  var scriptStr = `hello world`
  res.end(scriptStr)
})

// 用户注册
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

// 用户登录
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

// 更新收藏列表
router.post('/favoriteList', function (req, res) {
  const listId = req.body.params.listId
  const postData = {
    username: req.body.params.username,
    password: req.body.params.password
  };

  User.findOne(postData, function (err, data) {
    if (err) throw err;
    if (data.favoriteList.length === 0) {
      data.favoriteList.push(listId)
    } else {
      let index = data.favoriteList.indexOf(listId)
      if (index === -1) {
        data.favoriteList.push(listId)
      } else if (index !== -1) {
        var c = data.favoriteList.splice(index, 1)
      }
    }
    User.update(postData, data, function (err, data2) {
      if (err) throw err;
      if (data2) {
        res.end(JSON.stringify(data))
      } else {
        res.send('更新歌单失败!');
      }
    })
  });

})

// 查询收藏列表 
router.get('/favoriteList', function (req, res) {
  const postData = {
    username: req.query.username,
    password: req.query.password
  };

  User.findOne(postData, function (err, data) {
    if (err) throw err;
    res.end(JSON.stringify(data));
  });

})

// 更新收藏音乐
router.post('/favoriteSong', function (req, res) {
  const songId = req.body.params.songId
  const postData = {
    username: req.body.params.username,
    password: req.body.params.password
  };

  User.findOne(postData, function (err, data) {
    if (err) throw err;
    if (data.favoriteSong.length === 0) {
      data.favoriteSong.push(songId)
    } else {
      let index = data.favoriteSong.indexOf(songId)
      if (index === -1) {
        data.favoriteSong.push(songId)
      } else if (index !== -1) {
        var c = data.favoriteSong.splice(index, 1)
      }
    }
    User.update(postData, data, function (err, data2) {
      if (err) throw err;
      if (data2) {
        res.end(JSON.stringify(data))
      } else {
        res.send('更新歌单失败!');
      }
    })
  });

})

// 查询收藏音乐 
router.get('/favoriteSong', function (req, res) {
  const postData = {
    username: req.query.username,
    password: req.query.password
  };

  User.findOne(postData, function (err, data) {
    if (err) throw err;
    res.end(JSON.stringify(data));
  });

})


// 视频相关
var createFolder = function (folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};
var uploadFolder = './upload/';
createFolder(uploadFolder);
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder); 
  },
  filename: function (req, file, cb) {
    let suffix = file.mimetype.split('/')[1];
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage })



// 上传视频
router.post('/video', upload.single('file'), function (req, res) {
  const postData = {
    _id: req.body._id,
  };
  User.findOne(postData, function (err, data) {
    if (err) throw err;
    for(let video of data.videos) {
      if(video === req.body.filename) {
        res.send(data)
        return;
      }
    }
    data.videos.push(req.body.filename)
    User.update(postData, data, function (err, data2) {
      if (err) throw err;
      res.send(data)
    })
  });
})

// 获取视频
router.get('/video', function (req, res) {
  const postData = {
    _id: req.query._id,
  };
  let video = req.query.video
  User.findOne(postData, function (err, data) {
    if (err) throw err;
    let videos = data.videos;
    for(let i = 0; i < videos.length; i++) {
      if(videos[i] === video) {
        fs.readFile(`./upload/${videos[i]}`, function (err, data2) {
          if (err) {
            res.end("文件读取失败");
          } else {
            // 文件读取成功
            res.end(data2);
          }
        })
      }
    }
  });
})

// 删除视频
router.get('/video/delete', function (req, res) {
  const postData = {
    _id: req.query._id,
  };
  let video = req.query.video
  User.findOne(postData, function (err, data) {
    if (err) throw err;
    let videos = data.videos;
    videos.filter((item, i) => {
      if( item === video) {
        data.videos.splice(i,1)
        User.update(postData, data, function (err, data2) {
          if (err) throw err;
          if (data2) 
            res.end(JSON.stringify(data))
        })
      }
    })
    res.send(data)
  });
})




module.exports = router
