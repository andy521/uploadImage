// function uploadimg(data) {
//   var that = this;
//   var i = data.i ? data.i : 0,//要上传的图片
//     success = data.success ? data.success : 0,//上传成功的个数
//     fail = data.fail ? data.fail : 0;//上传失败的个数
//   wx.uploadFile({
//     url: data.url, //开发者服务器 url
//     filePath: data.path[i],
//     name: 'file',
//     formData: {
//       'user': 'test'
//     },
//     success: function (res) {
//       success++;
//       //do something
//     },
//     fail: function () {
//       fail++;
//     },
//     complete: function () {
//       i++;
//       if (i == data.path.length) {
//         console.log("success：" + success + "fail" + fail);
//       } else {
//         data.i = i;
//         data.success = success;
//         data.fail = fail;
//         uploadimg(data);
//       }
//     }
//   })

// }
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     images: [],//临时图片地址
//     upImgUrl: 'https://........'//上传图片服务器地址
//   },


//   chooseImage: function () {
//     var that = this;
//     wx.chooseImage({
//       count: 9, // 默认9
//       sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
//       sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//       success: function (res) {
//         console.log(res);
//         var tempFilePaths = res.tempFilePaths
//         that.setData({
//           images: that.data.images.concat(tempFilePaths)
//         })
//       }
//     })
//   },
//   previewImage: function (e) {
//     wx.previewImage({
//       current: e.currentTarget.id, // 当前显示图片的http链接
//       urls: this.data.images // 需要预览的图片http链接列表
//     })
//   },
//   uploadImg: function (e) {
//     var that = this;
//     if (that.data.images.length > 0) {
//       uploadimg({
//         url: that.data.upImgUrl,//这里是你图片上传的接口
//         path: that.data.images//这里是选取的图片的地址数组
//       });
//     } else {
//       console.log("没有可上传的文件");
//     }
//   }
// })

const uploadImage = require('../../util/uploadAliyun.js');
Page({

  /**
   * 页面的初始数据
   */

  data: {
    filePath:"",
    images: [],
    uploadImgs:[],
    count:9,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
  },

  chooseImage:function(e){
    var selectPictureNum = e.target.dataset.num;
    this.setData({
      count: 9 - selectPictureNum
    })
    var that = this;
    wx.chooseImage({
      count: that.data.count, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          filePath: res.tempFilePaths[0],
          images: that.data.images.concat(tempFilePaths),
          uploadImgs: res.tempFilePaths
        })
      },
    })

  },

  uploadImg: function(){
    var that = this;
    console.log(JSON.stringify(that.data.uploadImgs))
    for (var i = 0; i < that.data.uploadImgs.length;i++){
      var filePath = that.data.uploadImgs[i];

      uploadImage(
        {
          filePath: filePath,
          dir: "images/",
          success: function (res) {
            console.log("上传成功")
            console.log("上传成功" + JSON.stringify(res))
          },
          fail: function (res) {
            console.log("上传失败")
            console.log(res)
          }
        })
    }
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})