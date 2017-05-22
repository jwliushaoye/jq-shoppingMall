/**
 * Created by yyl on 2017/3/15.
 */



(function () {
    $(function () {

        //轮播图
        var banner_lunbo=$('#banner .box')
        banner_lunbo.myLunboJd();

        //nav 的tab切换
        var tab_li=$('.hover_tab_left_ul li');
        tab_li.hover(function () {
            tab_li.removeClass('border_i').eq($(this).index()).addClass('border_i');
            $('.hover_tab_left').children('div').css({display:'none'}).eq($(this).index()).css({display:'block'});
        },function () {});

        //美食中的轮播图
        var index=0;
        $('.stair_right').click(function(){
            index++;
            if(index>1) index=0;
            $('.section_stair_content_img img').eq(index).stop().fadeIn().siblings().stop().fadeOut();
            $('.section_stair_content_point').find('li').removeClass('li').eq(index).addClass('li');
        });
        $('.section_stair_content_point li').bind('mouseenter',function () {
            $('.section_stair_content_img img').eq($(this).index()).fadeIn().siblings().fadeOut();
            $(this).addClass('li').siblings().removeClass('li');

        });

        //美食馆中的tab切换
        var tab_li1=$('.section_stair_1 .section_stair_nav1 ul li');
        var stair_content=$('.section_stair_content_right2');
         tab_li1.bind('mouseenter',function () {
             tab_li1.removeClass('stair_flag').eq($(this).index()).addClass('stair_flag');
             stair_content.css({display:'none'}).eq($(this).index()).css({display:'block'});
         });

        //生活馆中的轮播图
        $('.stair_right1').click(function(){
            index++;
            if(index>1) index=0;
            $('.section_stair_content_img1 img').eq(index).stop().fadeIn().siblings().stop().fadeOut();
            $('.section_stair_content_point1').find('li').removeClass('li').eq(index).addClass('li');
        });
        $('.stair_left1').click(function(){
            index--;
            if(index<0) index=1;
            $('.section_stair_content_img1 img').eq(index).stop().fadeIn().siblings().stop().fadeOut();
            $('.section_stair_content_point1').find('li').removeClass('li').eq(index).addClass('li');
        });
        $('.section_stair_content_point1 li').bind('mouseenter',function () {
            $('.section_stair_content_img1 img').eq($(this).index()).fadeIn().siblings().fadeOut();
            $(this).addClass('li').siblings().removeClass('li');

        });

        //生活馆中的tab切换
        var tab_li2=$('.section_stair_2 .section_stair_nav2 ul li');
        var stair_content2=$('.section_stair_content_right3');
        tab_li2.bind('mouseenter',function () {
            tab_li2.removeClass('stair_flag').eq($(this).index()).addClass('stair_flag');
            stair_content2.css({display:'none'}).eq($(this).index()).css({display:'block'});
        });

        //生活电器中的tab
        var tab_li3=$('.section_stair_3 .section_stair_nav3 ul li');
        var stair_content3=$('.section_stair_content_right4');
        tab_li3.bind('mouseenter',function () {
            tab_li3.removeClass('stair_flag').eq($(this).index()).addClass('stair_flag');
            stair_content3.css({display:'none'}).eq($(this).index()).css({display:'block'});
        });

        //服饰馆中的轮播图
        $('.stair_right2').click(function(){
            index++;
            if(index>1) index=0;
            $('.section_stair_content_img2 img').eq(index).stop().fadeIn().siblings().stop().fadeOut();
            $('.section_stair_content_point2').find('li').removeClass('li').eq(index).addClass('li');
        });
        $('.stair_left2').click(function(){
            index--;
            if(index<0) index=1;
            $('.section_stair_content_img2 img').eq(index).stop().fadeIn().siblings().stop().fadeOut();
            $('.section_stair_content_point2').find('li').removeClass('li').eq(index).addClass('li');
        });
        $('.section_stair_content_point2 li').bind('mouseenter',function () {
            $('.section_stair_content_img2 img').eq($(this).index()).fadeIn().siblings().fadeOut();
            $(this).addClass('li').siblings().removeClass('li');

        });

        //服饰馆中的tab切换
        var tab_li4=$('.section_stair_4 .section_stair_nav4 ul li');
        var stair_content4=$('.section_stair_content_right5');
        tab_li4.bind('mouseenter',function () {
            tab_li4.removeClass('stair_flag').eq($(this).index()).addClass('stair_flag');
            stair_content4.css({display:'none'}).eq($(this).index()).css({display:'block'});
        });

        //化妆馆中的轮播图
        $('.stair_right3').click(function(){
            index++;
            if(index>1) index=0;
            $('.section_stair_content_img3 img').eq(index).stop().fadeIn().siblings().stop().fadeOut();
            $('.section_stair_content_point3').find('li').removeClass('li').eq(index).addClass('li');
        });
        $('.stair_left3').click(function(){
            index--;
            if(index<0) index=1;
            $('.section_stair_content_img3 img').eq(index).stop().fadeIn().siblings().stop().fadeOut();
            $('.section_stair_content_point3').find('li').removeClass('li').eq(index).addClass('li');
        });
        $('.section_stair_content_point3 li').bind('mouseenter',function () {
            $('.section_stair_content_img3 img').eq($(this).index()).fadeIn().siblings().fadeOut();
            $(this).addClass('li').siblings().removeClass('li');

        });

        //化妆品中的tab切换
        var tab_li5=$('.section_stair_5 .section_stair_nav5 ul li');
        var stair_content5=$('.section_stair_content_right6');
        tab_li5.bind('mouseenter',function () {
            tab_li5.removeClass('stair_flag').eq($(this).index()).addClass('stair_flag');
            stair_content5.css({display:'none'}).eq($(this).index()).css({display:'block'});
        });

        //母婴馆中的轮播图
        $('.stair_right4').click(function(){
            index++;
            if(index>2) index=0;
            $('.section_stair_content_img4 img').eq(index).stop().fadeIn().siblings().stop().fadeOut();
            $('.section_stair_content_point4').find('li').removeClass('li').eq(index).addClass('li');
        });
        $('.stair_left4').click(function(){
            index--;
            if(index<0) index=2;
            $('.section_stair_content_img4 img').eq(index).stop().fadeIn().siblings().stop().fadeOut();
            $('.section_stair_content_point4').find('li').removeClass('li').eq(index).addClass('li');
        });
        $('.section_stair_content_point4 li').bind('mouseenter',function () {
            $('.section_stair_content_img4 img').eq($(this).index()).fadeIn().siblings().fadeOut();
            $(this).addClass('li').siblings().removeClass('li');

        });

        //母婴馆中的tab切换
        var tab_li6=$('.section_stair_6 .section_stair_nav6 ul li');
        var stair_content6=$('.section_stair_content_right7');
        tab_li6.bind('mouseenter',function () {
            tab_li6.removeClass('stair_flag').eq($(this).index()).addClass('stair_flag');
            stair_content6.css({display:'none'}).eq($(this).index()).css({display:'block'});
        });



        //楼梯效果
        //点击哪个按钮到哪个位置
        var btn_li=$('.stair_nav ul li');
        btn_li.on('click',function () {
            var top=$('.stair').eq($(this).index()).offset().top;
            $('body,html').animate({scrollTop:top},1000,'swing')
        });


        //到达浏览器指定位置  导航栏出现
        $(window).scroll(function () {
            if($(this).scrollTop()>700){
                $('.stair_nav').fadeIn();
            }else {
                $('.stair_nav').fadeOut();
            };
            $('.stair').each(function () {
                if($(window).scrollTop()<$(this).offset().top+$(this).height()/2){
                    btn_li.siblings().children().css({display:'none'}).end().children().eq($(this).index()).css({display:'block'});
                    return false;
                }
            });
        });


        $.getJSON('https://ai.jd.com/index_new.php?app=ABdata&action=ABData&key=BtestData&callback=?',function () {});


      
    });
})(jQuery);


function getCategoryCallback(data) {
    //console.log(data);
    var tmp=data.data;
    for (var i=0;i<tmp.length;i++){
        //left部分
        var abs_left=document.getElementById('abs_left');
        var leftul=document.createElement('ul');
        leftul.setAttribute('index',i);
        leftul.className='leftul';
        abs_left.appendChild(leftul);
        for (var j=0;j<tmp[i].s.length;j++){
            var leftli=document.createElement('li');
            var inner=tmp[i].s[j].n.substring(tmp[i].s[j].n.indexOf('|')+1,tmp[i].s[j].n.lastIndexOf('|')-1);
            if(j!=tmp[i].s.length-1){
                leftli.innerHTML=inner+'<span>'+'/'+'</span>'
            }else {
                leftli.innerHTML=inner
            }
            leftul.appendChild(leftli)
        }

        //right部分
        var banner=document.getElementById('banner');
        var rightbigdiv=document.createElement('div');
        rightbigdiv.className='abs_right_div';
        banner.appendChild(rightbigdiv);
        var titlediv=document.createElement('div');
        titlediv.className='title_div';
        rightbigdiv.appendChild(titlediv);
        for (var k=0;k<tmp[i].t.length;k++){
            var title_a=document.createElement('a');
            var inner2=tmp[i].t[k].substring(tmp[i].t[k].indexOf('|')+1,tmp[i].t[k].lastIndexOf('|')-1);
            title_a.innerHTML=inner2+'<i class="fa fa-angle-right"></i>';
            titlediv.appendChild(title_a)
        }
        //content   div

        for (var a=0;a<tmp[i].s.length;a++){
            for (var b=0;b<tmp[i].s[a].s.length;b++){
                var content_div=document.createElement('div');
                content_div.className='contentdiv';
                rightbigdiv.appendChild(content_div);
                var p=document.createElement('p');
                var inner3=tmp[i].s[a].s[b].n.substring(tmp[i].s[a].s[b].n.indexOf('|')+1,tmp[i].s[a].s[b].n.lastIndexOf('|')-1);
                p.innerHTML=inner3;
                content_div.appendChild(p);
                var abs_ul=document.createElement('ul');
                content_div.appendChild(abs_ul);
                for (var c=0;c<tmp[i].s[a].s[b].s.length;c++){
                    var abs_li=document.createElement('li');
                    var inner4=tmp[i].s[a].s[b].s[c].n.substring(tmp[i].s[a].s[b].s[c].n.indexOf('|')+1,tmp[i].s[a].s[b].s[c].n.lastIndexOf('|')-1);
                    abs_li.innerHTML=inner4;
                    if(tmp[i].s[a].s[b].s[c].n.substring(tmp[i].s[a].s[b].s[c].n.lastIndexOf('|')+1)==1){
                        abs_li.style.color='red';
                        abs_li.style.border='1px dashed red';
                    }
                    abs_ul.appendChild(abs_li);
                }

            }


        }
    }
}
window.onload=function () {
    var abs_left = document.getElementById('abs_left');
    var abs_right=document.getElementsByClassName('abs_right_div');

    for (var i=0;i<abs_left.children.length;i++){
        abs_left.children[i].onmouseenter=function () {
           var index=this.getAttribute('index');
           abs_right[index].style.display='block';

            abs_right[index].onmouseenter=function () {
                this.style.display='block'
            };
            abs_right[index].onmouseleave=function () {
                this.style.display='none';
            };
        };
        abs_left.children[i].onmouseleave=function () {
            var index=this.getAttribute('index');
            abs_right[index].style.display='none';
        }
    }
};






