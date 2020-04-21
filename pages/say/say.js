Page({

    data: {
      form_info: "",
      type: ['建议', '吐槽', '分享', '其他'],
      index: 0
    },

  bindPickerChange: function(e){
    this.setData({
      index: e.detail.value
    })
  },



    //提交
    formSubmit: function(e){
      console.log(e),
      wx.request({
        url: 'http://47.107.71.7:8088/article/save',
        data: e.detail.value,
        method: "POST",
        header:{         
                  'Content-Type': 'application/json'   
         },  
        success: function(res){
          console.info(res.data)
        } 
      }),
      this.onShow(),
        this.setData({
          form_info: ""
        })
        //跳转到首页
        wx.switchTab({
          url: '../index/index',
          success: function (e) {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onLoad();
          }
        })

    }

})