Page({

    //保存发言
    save: function (e) {
        //TODO:保存接口
        //跳转到首页
        wx.switchTab({
            url: '../index/index',
            success: function (e) {
                console.info("来了");
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
            }
        })

    }

})