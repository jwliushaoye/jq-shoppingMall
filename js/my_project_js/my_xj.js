/**
 * Created by yyl on 2017/3/16.
 */
$.fn.myLunboJd=function () {
    var oBox=$('.box');
    var oBtn=$('.btn');
    timer=null;
    oBox.hover(function () {
        clearInterval(timer); //停止自动播放;
        oBtn.css('display','block');
    },function () {
        autoPlay();
        oBtn.css('display','none');
    });

    //点击左右按钮事件
    var aLeft=$('.aLeft');
    var aRight=$('.aRight');
    var index=0;
    aLeft.bind('click',function () {
        index--;
        Move();
    });
    aRight.bind('click',function () {
        index++;
        Move();
    });

    //轮播点
    var pLi=$('.pUl li');
    pLi.on('mouseenter',function () {
        index=$(this).index();
        Move();
    });

    //自动播放函数
    autoPlay();
    function autoPlay() {
        timer=setInterval(function () {
            index++;
            Move();
        },2000);
    }

    //运动函数
    var iLi=$('.iUl li');
    function Move() {
        if(index<0){
            index=pLi.size()-1;
        }
        if(index>=pLi.size()){
            index=0;
        }
        iLi.each(function (k) {
            var num=k===index ? 1 : 0 ;
            $(this).stop().animate({
                opacity:num
            },function () {
                $(this).css({
                    zIndex:num
                })
            })
        });
        pLi.removeClass('li').eq(index).addClass('li');
    }
};

(function () {
    $(function () {

        //top部分
        var chat=$('.top .cen .left');
        chat.find('a:first').on('click',function () {
            alert('抱歉，您所使用的浏览器无法完成此操作');
        });
        chat.find('.seconda').hover(function () {
            chat.find('.wechat').css({display:'block'})
        },function () {
            chat.find('.wechat').css({display:'none'})
        });

        //鼠标划入客服时显示下拉菜单；
        var lastli=$('.lastli');
        var pullUl=$('.pullul');
        lastli.hover(function () {
            lastli.css({backgroundColor:'white'});
            pullUl.css({display:'block'})
        },function () {
            lastli.css({backgroundColor:'#f2f2f2'});
            pullUl.css({display:'none'})
        });


        //输入数据时显示相应的搜索结果

        $('.searchipt').on('keyup',function () {
            var iptvalue=$('.searchipt').val();
            $.getJSON('https://suggest.taobao.com/sug?code=utf-8&q='+iptvalue+'&_ksTS=1488373398506_1012&callback=?&k=1&area=c2c&bucketid=8',function (data) {
                //框中无值时，，显示第一个abs   有值时显示第二个
                if(iptvalue==''){
                    $('.absdiv').css({display:'block'});
                    $('.absdiv_se').css({display:'none'});
                }else {
                    $('.absdiv').css({display:'none'});
                    $('.absdiv_se').css({display:'block'});
                    //console.log(data);
                    var tmp=data.result;
                    //console.log(tmp)
                    var html='';
                    for (var i=0;i<tmp.length;i++){
                        //console.log(val);
                        html=html+'<p>'+tmp[i][0]+'</p>';
                    }
                    $('.resule_se').html(html);
                }
            })
        });



        $('.searchipt').on('blur',function () {
            $('.absdiv_se').bind('click',function (e) {
                $('.searchipt').val($(e.target).closest('p').html())
            });
            //遍历第一个div的a  点击让其显示到输入框中
            $('.absdiv_top_right a').on('click',function () {
                $('.searchipt').val($('.absdiv_top_right a').eq($(this).index()-1).html())
            });

            $('.headercenter ul li').on('click',function () {
                $('.searchipt').val($('.headercenter ul li').eq($(this).index()).find('a').html())
            });
            setTimeout(function () {
                $('.absdiv').css({display:'none'});
                $('.absdiv_se').css({display:'none'});
            },150)
        });


        //获取光标时首先判断输入框中是否有值，有值，则显示搜索abs 无值则直接显示热度框
        $('.searchipt').on('focus',function () {
            var iptvalue=$('.searchipt').val();
            if(iptvalue!=''){
                $('.absdiv_se').css({display:'block'});
                $('.absdiv').css({display:'none'});
            }else {
                $('.absdiv').css({display:'block'});
            }
        });

        //点击关闭时消失
        $('.close_abs').bind('click',function () {
            $('.absdiv').css({display:'none'});
            $('.absdiv_se').css({display:'none'});
        });



        //右边fixed部分
        var fixed_close=$('.fixed_close');
        var fixed=$('.fixed');
        var fixed_shop=$('.fixed_shop');
        var fixed_erwei=$('.fixed_erwei');
        fixed_close.hover(function () {
            $(this).addClass('fa-spin');
        },function () {
            $(this).removeClass('fa-spin');
        }).on('click',function () {
            fixed.animate({right:'-270px'})
        });
        fixed_shop.bind('click',function () {
            fixed.animate({right:'0'})
        });
        var fax=$('.fa-fax');
        fixed_erwei.hover(function () {
            $(this).css({display:'block'});
        },function () {
            $(this).css({display:'none'});
            fax.removeClass('bg');
        });
        fax.hover(function () {
            fixed_erwei.css({display:'block'})
        },function () {
            fixed_erwei.css({display:'none'});
            fax.removeClass('bg');
        });
//点击按钮回到顶部
        var go_top=$('.fa-arrow-up');
        go_top.bind('click',function () {
            $('body,html').animate({scrollTop:0});
        });


        $('#close').bind('click',function () {
            $('.nav_img1').fadeOut(1000);
        });



        //bottom
        $.ajax({
            url:'../index_bottom.json',
            success:function (res) {
                // console.log(res);
                var tmp=res.list;
                var bottom=$('<div class="bottom"></div>');
                $('body').append(bottom);
                var bottom_t=$('<div class="bottom_t"></div>');
                $(bottom).append(bottom_t);
                for (var i=0;i<tmp.length;i++){
                    var bottom_ul=$('<ul></ul>');
                    var bottom_p=$('<p></p>');
                    bottom_ul.append(bottom_p);
                    bottom_p.html(tmp[i].t);
                    bottom_t.append(bottom_ul);
                    for (var j=0;j<$(tmp[i].li).length;j++){
                        var bottom_li=$('<li></li>');
                        bottom_li.html(tmp[i].li[j].n);
                        bottom_ul.append(bottom_li);
                        if(tmp[i].li[j].t==1){
                            bottom_ul.css({background: 'url(../img/map.png) no-repeat right'})
                        }
                    }
                }
                var tmp1=res.cen;
                var bottom_c=$('<div class="bottom_c"></div>');
                $('body').append(bottom_c);
                for (var a=0;a<tmp1.length;a++){
                    var bottom_c_ul=$('<ul></ul>');
                    var bottom_c_img=$('<img>');
                    bottom_c_img.attr('src',tmp1[a].t);
                    bottom_c_ul.append(bottom_c_img);
                    var bottom_c_p=$('<p></p>');
                    bottom_c_p.html(tmp1[a].ul.t);
                    bottom_c_ul.append(bottom_c_p);
                    bottom_c.append(bottom_c_ul);
                    var tmp2=tmp1[a].ul.s;
                    for (var b=0;b<tmp2.length;b++){
                        var bottom_c_li=$('<li></li>');
                        bottom_c_li.html(tmp2[b].t);
                        bottom_c_ul.append(bottom_c_li);
                    }
                }

                //footer部分
                var tmp3=res.foot;
                var footer=$('<footer></footer>');
                $('body').append(footer);
                var footer_ul=$('<ul class="footer_ul"></ul>');
                footer.append(footer_ul);
                for (var k=0;k<tmp3.s.length;k++){
                    var footer_li=$('<li>');
                    footer_li.html(tmp3.s[k].n);
                    footer_ul.append(footer_li);
                }
                var footer_cen=$('<div class="footer_cen"></div>');
                footer.append(footer_cen);
                for (var m=0;m<tmp3.t.length;m++){
                    var footer_cen_a=$('<a href="javsscript:;"></a>');
                    var footer_cen_span=$('<span></span>');
                    var footer_cen_p=$('<p></p>');
                    footer_cen_a.html(tmp3.t[m].l);
                    footer_cen_span.html(tmp3.t[m].c);
                    footer_cen_p.html(tmp3.t[m].r);
                    footer_cen.append(footer_cen_a).append(footer_cen_span).append(footer_cen_p);
                }
                var footer_bot=$('<div class="footer_bot"></div>');
                footer.append(footer_bot);
                for(var n=0;n<tmp3.b.length;n++){
                    var footer_bot_img=$('<img>');
                    footer_bot_img.attr('src',tmp3.b[n].n);
                    footer_bot.append(footer_bot_img);
                }
            }
        });

        $('.heder_centertop a').css({cursor: 'pointer'})
        $('.heder_centertop a').bind('click',function () {
            $(this).attr('href','goods_list.html');
        });



        //获取user  cookie
        //获取cookie
        function setCookie(name,value,day) {
            var newDate=new Date();
            newDate.setDate(newDate.getDate()+day);
            document.cookie = name + '=' + value + ';expires=' + newDate;
        }
        function getCookie(name) {
            var arr = document.cookie.split('; ');
            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split('=');
                if (arr2[0] == name) {
                    return arr2[1];
                }
            }
        };
        function removeCookie(name){
            setCookie(name,1,-1);
        }

        var tmp=getCookie('user');
        if(tmp!=undefined) {
            var arr = JSON.parse(tmp);
            var top_b = $('<b></b>').css({color: 'red', fontWeight: 'bold', fontSize: '14px'});
            top_b.html(arr[0].username);
            $('#username').html('欢迎回来！').append(top_b);

            $('.login a').html('我的购物车').attr('href', 'myshopping_car.html');

            $('.right_fixed .fixed_cen').html(" ");
            //取出cookie中的值加入到右侧，
            var tmp1 = getCookie('mygoods');
            if (tmp1 == undefined) {
                var fixed_p = $('<p></p>').html('您的购物车空空如也~~去');
                var fixed_a = $('<a></a>').html('购物').attr('href', 'goods_list.html').css({
                    cursor: 'pointer',
                    background: 'none',
                    color: 'blue'
                });
                fixed_p.append(fixed_a);
                $('.fixed_cen').append(fixed_p);
            } else {
                var arr1 = JSON.parse(tmp1);
                var numx = 0;
                var parice = 0;
                $('.fixed_p_num').html(arr1.length);
                $(arr1).each(function (i) {
                    var fixed_ul = $('<ul></ul>');
                    fixed_ul.addClass('fixed_ul');
                    fixed_ul.attr('id', arr1[i].id);
                    $('.fixed_cen').append(fixed_ul);
                    var fixed_li1 = $('<li></li>');
                    fixed_li1.addClass('flex_li1');
                    var fixed_li1_b = $('<b></b>');
                    fixed_li1_b.html(arr1[i].offer);
                    fixed_li1.append(fixed_li1_b);
                    var fixed_li1_span = $('<span></span>').html('共' + arr1[i].number + '件商品');
                    fixed_li1.append(fixed_li1_span);
                    fixed_ul.append(fixed_li1);
                    var fixed_li2 = $('<li></li>');
                    fixed_li2.addClass('flex_li2');
                    var fixed_img = $('<img>');
                    fixed_img.attr('src', arr1[i].img);
                    fixed_li2.append(fixed_img);
                    var fixed_li2_p = $('<p></p>');
                    var fixed_li2_a = $('<a></a>').html(arr1[i].name);
                    fixed_li2_a.attr('href', 'detail.html?id=' + arr1[i].id);
                    fixed_li2_p.append(fixed_li2_a);
                    var fixed_h3 = $('<h3></h3>');
                    var fixed_h4 = $('<h4></h4>');
                    var fixed_h4_b = $('<b></b>').html(arr1[i].price);
                    fixed_h4.append(fixed_h4_b);
                    fixed_h4.append('×' + arr1[i].number);
                    var fixed_h3_a = $('<a></a>').addClass('delete_cookie').html('删除').addClass('delete_a');
                    fixed_h3.append(fixed_h4);
                    fixed_h3.append(fixed_h3_a);
                    fixed_li2_p.append(fixed_h3);
                    fixed_li2.append(fixed_li2_p);
                    fixed_ul.append(fixed_li2);
                    numx = parseInt(arr1[i].number) + parseInt(numx);
                    parice = parseInt(arr1[i].number) * parseInt(arr1[i].price.split('￥')[1]) + parice;

                });
                $('.num_b').html(numx);
                $('.price_add').html(parice);


                $('.delete_a').bind('click', function () {
                    $(this).parent().parent().parent().parent().remove();
                    var pid = $(this).parent().parent().parent().parent().attr('id');
                    $(arr1).each(function (k) {
                        if (pid == arr1[k].id) {
                            arr1.splice(k, 1);
                            return false;
                        }
                    });
                    var str = JSON.stringify(arr1);
                    setCookie('mygoods', str, 7);

                    if (arr1.length == 0) {
                        removeCookie('mygoods');
                    }
                    ;

                    $('.fixed_p_num').html($('.fixed_ul').length);

                    var num1 = 0;
                    var price = 0;
                    $('.fixed_ul').each(function (a) {
                        num1 = num1 + parseInt($('.fixed_ul').find('h4').html().split('×')[1]);
                        price = price + (parseInt($('.fixed_ul').eq(a).find('h4').html().split('×')[1]) * parseInt($('.fixed_ul').find('h4').children('b').html().split("￥")[1]));
                    });

                    $('.num_b').html(num1);
                    $('.price_add').html(price);


                })
            }


            //注册按钮变为退出
            $('.redister a').html('退出登录').removeAttr('href').css({cursor: 'pointer'}).bind('click', function () {
                removeCookie('user');
                $('#username').html('你好，欢迎来到红领巾');
                $('.login a').html('登录').attr('href', 'login.html');
                var re_a = $('<a href="register.html">注册</a>');
                $('.redister').html('').append(re_a);
                $('.right_fixed .fixed_cen').html('');
                var fixed_p = $('<p></p>');
                fixed_p.html('你的购物车是空的，如已添加过商品，可登录查看');
                var fixed_a = $('<a></a>');
                fixed_a.html('登录').attr('href', 'login.html').css({cursor: 'pointer'});
                $('.right_fixed .fixed_cen').append(fixed_p).append(fixed_a);
                $('.num_b').html(0);
                $('.price_add').html(0);
                $('.fixed_p_num').html(0);
            })
        }

    })
})(jQuery);