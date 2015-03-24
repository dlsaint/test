(function($) {
    $.fn.banner = function(options) {  
        var defaults = {    
            speed: 5000,    
            duration: 800,
            ratio:374/1680
        };
        var opts = $.extend(defaults, options);
        var slide_index = 0;
        var li_count = 0;
        
        //设置按钮
        var slide_setList = function(slide_obj){
            li_count = slide_obj.find('.top_tus').length;
            for(var i=1,thtml="<i class='hover'></i>";i < li_count;i++) thtml = thtml + "<i></i>"
            slide_obj.find('.D1fBt').html(thtml);
        }
        var slide_resize = function(slide_obj){
            var top_datu_width = slide_obj.find('#D1pic1').width();
            slide_obj.find('#D1pic1').css('height',top_datu_width*opts.ratio);
        }
        
        //初始化
        var slide_init = function(slide_obj){
            slide_resize(slide_obj);
            $(window).resize(function(){
                slide_resize(slide_obj);
            });
            slide_obj.find('.top_tus').css({'z-index':10,'opacity':0});
            slide_obj.find('.top_tus:first').css({'z-index':12,'opacity':1})
            slide_obj.find('.top_tus:first').next().css({'z-index':11,'opacity':1})
            slide_setList(slide_obj);
        }
        
        var slide_run = function(slide_obj,now_index){
            if(now_index >= li_count){
                now_index = 0;
            }
            if(slide_index == now_index) return;            
            slide_obj.find('.top_tus').eq(slide_index).animate({opacity:0},opts.duration-10,function(){
                $(this).css('z-index','11');
            });
            slide_obj.find('.top_tus').eq(now_index).animate({opacity:1},opts.duration,function(){
                $(this).css('z-index','12');
            });
            slide_index = now_index;
            slide_obj.find('i.hover').removeClass('hover');
            slide_obj.find('.D1fBt i').eq(now_index).addClass('hover');
        }
        var slide_click = function(slide_obj){
            slide_obj.find('.D1fBt').on('click','i',function(){
                if(slide_obj.find('.top_tus').is(':animated')) return;
                slide_run(slide_obj,$(this).index());
            });
        }
        
        return this.each(function() {
            var $this = $(this);
            slide_init($this)
            slide_click($this)
            setInterval(function(){
                slide_run($this,slide_index+1);    
            },opts.speed);
        });  
    }; 
})(jQuery);

var index = 0;
$.extend({
    'slide':function(){
        var index = 0;
        var T;
        function slideRun(){
            T = setInterval(function(){
                if(++index >= $('#top-yema a').length) index = 0;
                $('#top-yema').find('.f2').removeClass('f2');
                $('#top-yema').find('a').eq(index).addClass('f2');
                $('#top-neirong').find('.hover').removeClass('hover');
                $('#top-neirong').find('li').eq(index).addClass('hover');
            },5000);
        }
        slideRun();
        $('#top-yema').on('mouseenter','a',function(){
            clearInterval(T);
            index = $(this).index();
            $(this).siblings('.f2').removeClass('f2');
            $(this).addClass('f2');
            $('#top-neirong').find('.hover').removeClass('hover');
            $('#top-neirong').find('li').eq(index).addClass('hover');
            return false;
        });
        $('#top-yema').on('mouseleave','a',function(){
            slideRun();
            return false;
        });
    },

});