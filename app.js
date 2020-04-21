//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },

  //失败提示
  failMsg(msg) {
    wx.showToast({
      title: msg,
      icon: 'success',
      image: "../images/fail.png",
      duration: 2000
    })
  },

  //成功提示
  successMsg(msg) {
    wx.showToast({
      title: msg,
      icon: 'success',
      duration: 2000,
      image: '../images/success.png'
    })
  },

  

  //自定义提示
  customizeMsg(msg, img, icon, duration) {
    wx.showToast({
      title: msg,
      icon: icon,
      duration: duration,
      image: img
    })
  }




})

