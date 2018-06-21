//app.js
App({
    onLaunch: function () {
        var imgSrcs = wx.getStorageSync('imgSrcs') || [];
        wx.setStorageSync('imgSrcs', imgSrcs);

        var fileList = wx.getStorageSync('fileList') || [];
        wx.setStorageSync('fileList', fileList);
    },
    getUserInfo: function (cb) {
        var that = this;
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo;
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            });
        }
    },
    globalData: {
        userInfo: null
    }
})

// var co = require('co');
// var OSS = require('ali-oss');
// var client = new OSS({
//   region: '<Your region>',
//   accessKeyId: '<XfOiw9ucCNaxHMbL>',
//   accessKeySecret: '<xgZVY4DHfBnlmwGlsWivFDmnYoCMgS>'
// });

// co(function* () {
//   var result = yield client.listBuckets();
//   console.log(result);
// }).catch(function (err) {
//   console.log(err);
// });