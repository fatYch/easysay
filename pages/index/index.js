//index.js
//获取应用实例
const app = getApp()
var Dateutil = require('../../utils/util.js');

Page({
  data: {
    money: [],
    nowDate: "",
    linliPrice: "-",
    timesPrice: [],
    articles: [],
    page: 1
  },


  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    console.info("首页来了");
    this.test(),
      this.getHkPrice(),
      this.listArtivle()


  },

  //下拉刷新
  onPullDownRefresh: function() {
    //动画效果
    wx.showNavigationBarLoading(),
      this.test(),
      this.getHkPrice(),
      this.listArtivle(),
      //隐藏动画效果
      wx.hideNavigationBarLoading(),
      //下拉返回原处
      wx.stopPullDownRefresh()
  },

  //上拉加载更多
  onReachBottom: function() {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })

    if (Math.random() > 0.5) {
      app.customizeMsg("无更多数据了", "../images/sorry.png", "success", 1000);
    } else {
      wx.request({
        url: 'http://47.107.71.7:8088/article/list',
        success(res) {
          console.info(res.data),
            that.setData({
              articles: that.data.articles.concat(res.data.data)
            })
        }
      })
    }
    wx.hideLoading();
  },



  //测试
  test: function(e) {
    var that = this;
    wx.request({
      url: 'http://api.yaoch.top/ych/getMetalInfo',
      success(res) {
        that.setData({
          money: res.data.data,
          nowDate: Dateutil.formatTime(new Date())
        })
      }
    })
  },

  //获取文章列表
  listArtivle: function(e) {
    var that = this;
    wx.request({
        url: 'http://47.107.71.7:8088/article/list',
        success(res) {
          console.info(res.data),
            that.setData({
              articles: res.data.data
            })
        }
      }),
      console.info(this.data.articles)
  },


  //获取时代邻里、时代中国的股价
  getHkPrice: function() {
    console.info("获取最新股票价格");
    var that = this;
    wx.request({
        url: 'http://datainterface.eastmoney.com/EM_DataCenter/JS.aspx?type=HKPD&sty=HKSYPD&stat=11&code=09928&fd=&edt=&ssdt=&sc=&cmd=&p=1&ps=5&js=var%20JGPJ=[(x)]&_=1584817283736',
        success(res) {
          that.setData({
            linliPrice: (res.data.substring(10, res.data.length - 1)).split(",")[13].replace('"', '')
          })
        }
      }),
      wx.request({
        url: 'http://datainterface.eastmoney.com/EM_DataCenter/JS.aspx?type=HKPD&sty=HKSYPD&stat=11&code=01233&fd=&edt=&ssdt=&sc=&cmd=&p=1&ps=5&js=var%20JGPJ=[(x)]&_=1584817283736',
        success(res) {
          that.setData({
            timesPrice: (res.data.substring(10, res.data.length - 1)).split(",")[13].replace('"', '')
          })
        }
      })
  },

  //跳文章详情
  articleDetail: function(e) {
    var articleId = e.currentTarget.dataset.articleid;
    console.info("id:" + articleId),
      wx.navigateTo({
        url: '../article/article?id=' + articleId,
      })
  },

  //新增文章
  addArticle: function(e){
    wx.navigateTo({
      url: '../say/say',
    })
  }

})