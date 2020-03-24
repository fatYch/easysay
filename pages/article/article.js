Page({

  data: {
    article: "",
    loveUrl: "../images/flower-no.png",
    isLove: true,
    complainDialog: false,
    hasComplain: false,
    complainUrl: "../images/complain.png",
    buttons: [{
      text: '取消',
      name: 'cancel',
      bindtap: 'complainCancel'
    }, {
      text: '确定',
      name: 'confirm',
      bindtap: 'complainConfirm'
    }]
  },

  onLoad: function(e) {
    var articleId = e.id;
    var that = this;
    //请求文章详情
    wx.request({
      url: 'http://47.107.71.7:8088/article/detail/' + articleId,
      success(res) {
        console.info(res.data);
        that.setData({
          article: res.data.data
        })
      }
    })
  },

  //喜欢
  loveIt: function(e) {
    var url;
    if (this.data.isLove) {
      url = "../images/flower.png";
    } else {
      url = "../images/flower-no.png"
    }
    this.setData({
      loveUrl: url,
      isLove: !this.data.isLove
    })
  },

  //发起举报
  complain: function(e) {
    if (this.data.hasComplain) {
      wx.showToast({
        title: '你已经举报过了，请手下留情！',
        icon: 'none',
        duration: 2000
      })
    } else {
        this.setData({
          complainDialog: true
        })
    }
  },

  //举报选择
  complainSelect: function(e){
    var result = false;
    if ('confirm' == e.detail.item.name){
      //处理业务
      console.info("执行业务");
      result = true;
    }
    this.setData({
      complainDialog: false,
      hasComplain: result
    })
  }





})