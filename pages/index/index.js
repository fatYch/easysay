//index.js
//获取应用实例
const app = getApp()
var Dateutil = require('../../utils/util.js');

Page({
    data: {
        money: [],
        nowDate: "",
        linliPrice: "-",
        timesPrice: []
    },


    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res =>
            {
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
            this.getHkPrice()


    },

    //下拉刷新
    onPullDownRefresh: function () {
        //动画效果
        wx.showNavigationBarLoading(),
            this.test(),
            this.getHkPrice(),
            //隐藏动画效果
            wx.hideNavigationBarLoading(),
            //下拉返回原处
            wx.stopPullDownRefresh()
    },


    //测试
    test: function (e) {
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

    //获取时代邻里、时代中国的股价
    getHkPrice: function () {
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


    //跳转到说说
    turnToSay: function (e) {
        wx.navigateTo({
            url: '../say/say',
        })
    }

})