function mongoose() {
  // 连接数据库
  var mongoose = require('mongoose');            
  mongoose.connect('mongodb://localhost/users')     //连接本地数据库blog 
  var db = mongoose.connection;
  // 连接成功
  db.on('open', function(){
      console.log('MongoDB Connection Successed');
  });
  // 连接失败
  db.on('error', function(){
      console.log('MongoDB Connection Error');
  });
}

module.exports = mongoose;
