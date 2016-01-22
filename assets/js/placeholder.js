/*
* created by sunqian
* 兼容ie低版本的placeholder插件，
* 经测试，ie9-是不支持placeholder的
* */
(function ($) {
    $.tool = $.tool || {};
    $.tool.defaultValue = {
        "placeVal": "input...",
        "outClass": "customSpan",//外层元素的类名
        "placeClass": "customPlace",  //显示placeholder的类名
        "outStyle":{                  //外层元素的样式
            "position": "relative",
            "height": "22px"
        },
        "placeStyle": {               //显示placeholder的样式
            "position": "absolute",
            "left": "3px",
            "top": "2px"
        }
    };
    /*
    * 检测浏览器版本是否是ie9及以下
    * 如果是则返回true，不是返回false
    * */
    function checkBrowser(){
        var userAgent = navigator.userAgent,
            version = null;
        if(userAgent.indexOf("MSIE")>0){
            version = parseFloat(userAgent.split("MSIE")[1].split(";")[0]);
            if(version < 10){
                return true;
            }
        }
        return false;
    }

    function Placeholder(dom, options) {
        this.dom = dom;
        this.outStyle = $.extend($.tool.defaultValue.outStyle, options.outStyle);
        this.placeStyle = $.extend($.tool.defaultValue.placeStyle, options.placeStyle);
        this.options = $.extend($.tool.defaultValue, options);
    }
    /*input获取焦点时，清空
    * 给place添加点击事情
    * */
    Placeholder.prototype.control = function(){
        var self = this.dom,
            $self = $(self),
            $next = $("." + this.options.placeClass),
            val = null;
        $next.click(function(){
            $self.focus();
        });
        $self.keyup(function(){
            val = $self.val();
            toggle();
        });
        $self.blur(function(){
            toggle();
        });
        /*
        * 禁用此文本框的右键
        * */
        self.oncontextmenu =function(){
            return false;
        };
        function toggle(){
            if(val==""||!val){
                $next.show();
            }else{
                $next.hide();
            }
        }
    },
    Placeholder.prototype.init = function () {
        var self = this.dom,
            $self = $(self);
        var placeVal = $self.attr("placeholder") || self.options.placeVal;
        $self.wrap("<span class='"+this.options.outClass+"'></span>");
        $self.after("<span class='"+this.options.placeClass+"'>"+placeVal+"</span>");
        $self.parent().css(this.outStyle);
        $self.next("."+this.options.placeClass).css(this.placeStyle);
        this.control();
    };
    $.fn.placeholder = function (options) {
        var $this = $(this);
        options = options || {};
        if(checkBrowser()){
            $this.each(function(index, dom){
                var placeholder = new Placeholder(dom,options);
                placeholder.init();
            });
        }
    };
})(jQuery);

$(".test").placeholder({
    "outStyle": {
        "height": "50px",
        "line-height": "50px",
        "zoom":1,
        "float": "left",
        "font-size": "24px"
    },
    "placeStyle": {
        "left": "10px",
        "color": "#999"
    }
});
