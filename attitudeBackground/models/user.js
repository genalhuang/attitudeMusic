var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 声明一个数据集 对象
var userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    favoriteList: {
      type: Array
    },
    favoriteSong: {
      type: Array
    }
});
// 将数据模型暴露出去
module.exports = mongoose.model('user', userSchema);
