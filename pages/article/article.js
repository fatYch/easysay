
const app = getApp();

Page({

  data: {
    article: "",
    commentList: "",
    loveUrl: "../images/flower-no.png",
    complainUrl: "../images/complain.png",
    complainContent: "",
    hasComplain: false,
    addCommentUrl: "../images/comment.png",
    isLove: true,
    complainDialog: false,
    commentDialog: false,



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
    console.info(e);
    var articleId = e.id;
    var that = this;
    //请求文章详情
    wx.request({
      url: 'http://47.107.71.7:8088/article/detail/' + articleId,
      success(res) {
        console.info(res.data);
        that.setData({
          article: res.data.data,
          commentList: res.data.data.commentList
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
    }),
    wx.request({
      url: 'http://47.107.71.7:8088/article/giveFlower/' + this.data.article.id,
      method: 'POST'
    })
  },

  //发起举报
  complain: function(e) {
    if (this.data.hasComplain) {
      app.failMsg("请勿重复举报!");
    } else {
        this.setData({
          complainDialog: true
        })
    }
  },

  //获取举报原因
  getComplainContent: function(e){
    this.setData({
      complainContent: e.detail.value
    })
  },

  //取消、确认举报
  complainSelect: function(e){
    var result = false;
    if ('confirm' == e.target.id){
      //处理业务
      console.info("执行业务：" + this.data.complainContent);
      result = true;
    }
    this.setData({
      complainDialog: false,
      hasComplain: result
    })
  },

  //评论弹窗
  commentDialog: function(e){
    this.setData({
      commentDialog: true
    })
  },

  //取消、确认评论
  commentSelect: function (e) {
    if ('confirm' == e.target.id) {
      //判断内容是否空
      var content = this.data.complainContent;
      //处理业务
      if (content == ''){
        app.failMsg("请输入评论!");
        return;
      }
      console.info("执行业务：" + content);
      var comment = {
        "createBy": "yaocanhong",
        "content": content,
        "articleId": this.data.article.id
      }
      wx.request({
        url: 'http://47.107.71.7:8088/article/addComment',
        method: 'POST',
        data: comment
      })
      // console.info(this.data.commentList);
      // this.setData({
      //   commentList: this.data.commentList.concat(comment)
      // })
      app.successMsg("评论成功!");
      //刷新当前页面
      var param = {
        "id": this.data.article.id
      }
      this.onLoad(param)


    }
    this.setData({
      commentDialog: false
    })
  }



})