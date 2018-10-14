$(function () {
    // 初始化fullpage插件
    $(".container").fullpage({
        // 配置参数
        // 1.设置每一个屏幕的颜色
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        // 2.设置是否垂直居中
        verticalCentered: false,
        // 3.设置导航 设置指示器 点容器
        navigation: true,
        // 页面切换的时间 默认是700ms
        scrollingSpeed: 1000,
        // 4.afterLoad监听进入某一屏的时候回调
        afterLoad: function (anchorLink, index) {
            // 这里可以通过大容器来写
            $(".section").eq(index - 1).addClass("now");
        },
        // onLeave离开某一页面时触发要在afterRender之前写要不然触发不了
        //index 是离开的“页面”的序号，从1开始计算；
        // nextIndex 是滚动到的“页面”的序号，从1开始计算；
        // direction 判断往上滚动还是往下滚动，值是 up 或 down。
        onLeave: function (index, nextIndex, direction) {
            // 第二屏到第三屏
            if (index === 2 && nextIndex === 3 && direction === "down") {
                $(".section").eq(index - 1).addClass("leaved");
                // 第三屏到第四屏
            } else if (index === 3 && nextIndex === 4 && direction === "down") {
                $(".section").eq(index - 1).addClass("leaved");
            } else if (index === 5 && nextIndex === 6 && direction === "down") {
                $(".section").eq(index - 1).addClass("leaved");
                $(".screen06 .box").addClass("show");
            } else if (index === 6 && nextIndex === 7 && direction === "down") {
                $(".screen07 .text").addClass("show");
                $(".screen07 .star img").each(function (i, item) {
                    // delay()延时加载
                    $(this).delay(i * 0.5 * 1000).fadeIn();
                });
            }
        },
        // 最好在插件初始完毕或者插件渲染完毕
        // afterRender页面渲染完了
        // 这个方法只会触发一次就是在最开始渲染完了页面之后
        afterRender: function () {
            console.log("页面渲染完了");
            // 点击更多跳到切换下一页
            $(".more").on("click", function () {
                // 插件的方法要通过$.fn来调用
                $.fn.fullpage.moveSectionDown();
            });
            // 当第四屏的购物车动画结束之后执行收货地址的动画，其实可以在css里面掐时间来写，这里是为了引出transitionend
            $(".screen04 .cart").on("transitionend", function () {
                // show只能用于dispaly:none的显示
                // fadeIn也只能用于display:none的显示
                $(".screen04 .address").show().find("img:last-child").fadeIn(1000);
                $(".screen04 .text").addClass("show");
            });
            // 第八屏功能
            // 1.手要跟着鼠标动
            // 2.点击再来一次重置动画
            $(".screen08").on("mousemove", function (e) {
                $(this).find(".hand").css({
                    // 鼠标的坐标设置给图片
                    left: e.clientX - 430,
                    top: e.clientY - 350,
                });
            });
            $(".screen08 .again").on("click", function () {
				 /*2.点击再来一次重置动画跳回第一页*/
                /*动画怎么怎么进行的？*/
                /*2.1 加now  类*/
                /*2.2 加leaved  类*/
                /*2.3 加show 类*/
                /*$('.now,.leaved,.show').removeClass('now').removeClass('leaved').removeClass('show');*/
                /*2.4 加css属性  后果：加一个style属性*/
                /*2.5 用jquery方法  show() fadeIn() 后果：加一个style属性*/
                /*$('.content [style]').removeAttr('style');*/

                /*跳回第一页*/
                /*$.fn.fullpage.moveTo(1);*/
                window.location.reload();
            });
        },
    })
});