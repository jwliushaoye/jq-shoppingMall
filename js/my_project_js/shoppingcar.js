/**
 * Created by yyl on 2017/3/23.
 */


(function () {
    $(function () {
        //top部分
        var chat = $('.top .cen .left');
        chat.find('a:first').on('click', function () {
            alert('抱歉，您所使用的浏览器无法完成此操作');
        });
        chat.find('.seconda').hover(function () {
            chat.find('.wechat').css({display: 'block'})
        }, function () {
            chat.find('.wechat').css({display: 'none'})
        });

        //鼠标划入客服时显示下拉菜单；
        var lastli = $('.lastli');
        var pullUl = $('.pullul');
        lastli.hover(function () {
            lastli.css({backgroundColor: 'white'});
            pullUl.css({display: 'block'})
        }, function () {
            lastli.css({backgroundColor: '#f2f2f2'});
            pullUl.css({display: 'none'})
        });

        //footer部分
        $.ajax({
            url: '../index_bottom.json',
            success: function (res) {
                var tmp3 = res.foot;
                var footer = $('<footer></footer>');
                $('body').append(footer);
                var footer_ul = $('<ul class="footer_ul"></ul>');
                footer.append(footer_ul);
                for (var k = 0; k < tmp3.s.length; k++) {
                    var footer_li = $('<li>');
                    footer_li.html(tmp3.s[k].n);
                    footer_ul.append(footer_li);
                }
                var footer_cen = $('<div class="footer_cen"></div>');
                footer.append(footer_cen);
                for (var m = 0; m < tmp3.t.length; m++) {
                    var footer_cen_a = $('<a href="javsscript:;"></a>');
                    var footer_cen_span = $('<span></span>');
                    var footer_cen_p = $('<p></p>');
                    footer_cen_a.html(tmp3.t[m].l);
                    footer_cen_span.html(tmp3.t[m].c);
                    footer_cen_p.html(tmp3.t[m].r);
                    footer_cen.append(footer_cen_a).append(footer_cen_span).append(footer_cen_p);
                }
                var footer_bot = $('<div class="footer_bot"></div>');
                footer.append(footer_bot);
                for (var n = 0; n < tmp3.b.length; n++) {
                    var footer_bot_img = $('<img>');
                    footer_bot_img.attr('src', tmp3.b[n].n);
                    footer_bot.append(footer_bot_img);
                }
            }
        });


        function setCookie(name,value,day) {
            var newDate=new Date();
            newDate.setDate(newDate.getDate()+day);
            document.cookie = name + '=' + value + ';expires=' + newDate;
        }
        //获取cookie
        function getCookie(name) {
            var arr = document.cookie.split('; ');
            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split('=');
                if (arr2[0] == name) {
                    return arr2[1];
                }
            }
        }

        var tmp = getCookie('mygoods');
        var arr = JSON.parse(tmp);
        var content_div = $('#content');
        $(arr).each(function (i) {
              var art_center = $('<div></div>');
              art_center.attr('id',arr[i].id);
              content_div.append(art_center);
              art_center.addClass('art_center');
              var detail_p = $('<p></p>');
              detail_p.addClass('art_cen_p');
              art_center.append(detail_p);
              var detail_p_input = $('<input type="checkbox" checked="checked">');
              detail_p.append(detail_p_input);
              var detail_p_span = $('<span></span>');
              detail_p_span.html(arr[i].offer);
              detail_p.append(detail_p_span);
              var detail_p_img = $('<img>');
              detail_p_img.attr('src', '../img/lianxi.png');
              detail_p.append(detail_p_img);
              var detail_ul = $('<ul></ul>');
              detail_ul.addClass('detail_ul');
              art_center.append(detail_ul);

              var ul_input = $('<input type="checkbox" checked="checked">');
              detail_ul.append(ul_input);
//商品详情中的图片
              var f_li = $('<li></li>');
              f_li.addClass('f_li');
              var f_li_img = $('<img>');
              f_li_img.attr('src', arr[i].img);
              f_li.append(f_li_img);
              detail_ul.append(f_li);

              //选择的商品的信息
              var f_p = $('<p></p>');
              f_li.append(f_p);
              var f_p_a = $('<a></a>');
              f_p_a.attr('href', 'detail.html?id=' + arr[i].id);
              var f_p_span = $('<span></span>');
              f_p_span.addClass('pro_mes');
              f_p_a.html(arr[i].name + arr[i].color + '-' + arr[i].size);
              f_p.append(f_p_a);
              var f_p_span_i = $('<i class="fa fa-angle-down"></i>');
              f_p_span.html('促销信息');
              var span_div=$('<div></div>').addClass('span_div');
              var span_p=$('<p></p>');
              span_p.html(arr[i].str);
              span_div.append(span_p);
              span_div.css({position:'absolute',border:'1px solid #f0d2d3', width:'240px',top:'19px',left:'-1px',padding:'5px 10px',overflow:'hidden',boxSizing:'border-box',display:'none',background:'#fff'});
              f_p_span.append(span_div);
              f_p_span.append(f_p_span_i);
              f_p.append(f_p_span);

              //价格
              var s_li = $('<li></li>');
              s_li.addClass('s_li');
              var s_li_del = $('<del></del>');
              var s_li_span = $('<span></span>');
              detail_ul.append(s_li);
              s_li_del.html(arr[i].delprice).css({color: '#ccc'});
              s_li_span.html(arr[i].price).css({color: '#da2b28'});
              s_li.append(s_li_del);
              s_li.append(s_li_span);

              //数量
              var t_li = $('<li></li>');
              t_li.addClass('t_li');
              detail_ul.append(t_li);
              var t_li_i1 = $('<i class="fa fa-minus-square-o"></i>');
              var t_li_i2 = $('<i class="fa fa-plus-square-o"></i>');
              var t_li_input = $('<input>');
              t_li_input.attr('value', arr[i].number);
              t_li_input.addClass('num_input');
              t_li.append(t_li_i1);
              t_li.append(t_li_input);
              t_li.append(t_li_i2);

              //返回积分
              var fo_li = $('<li></li>');
              fo_li.addClass('fo_li');
              detail_ul.append(fo_li);
              if (arr[i].rt == 0) {
                  fo_li.html('——');
              } else {
                  fo_li.html(arr[i].rt);
              }

              //重量
              var fi_li = $('<li></li>');
              fi_li.addClass('fi_li');
              detail_ul.append(fi_li);
              fi_li.html(arr[i].weight * arr[i].number + 'kg');

              //小计
              var si_li = $('<li></li>');
              si_li.addClass('si_li');
              detail_ul.append(si_li);
              si_li.html('￥' + (arr[i].price.split('￥')[1]) * arr[i].number);

              //操作
              var se_li = $('<li></li>');
              se_li.addClass('se_li');
              detail_ul.append(se_li);
              var se_li_a1 = $('<a class="movein"></a>').html('移入收藏夹');
              var se_li_a2 = $('<a class="delete"></a>').html('删除');
              se_li.append(se_li_a1);
              se_li.append(se_li_a2);
              var delete_div=$('<div class="delete_div"></div>');
              se_li.append(delete_div);
              var div=$('<div></div>');
              var delete_div_p=$('<p></p>').html('确定从购物车中删除吗?');
              var delete_div_span1=$('<span class="del_span1">确定</span>').css({float:'left'});
              var delete_div_span2=$('<span class="del_span2">取消</span>');
              div.append(delete_div_span1);
              div.append(delete_div_span2);
              delete_div.append(delete_div_p);
              delete_div.append(div);







//商品的数量;
            //$('.number_i').html(i + 1);

            
            //鼠标移入促销信息，显示信息
            $('.pro_mes').hover(function () {
                $(this).find('.span_div').css({display:'block'});
                $(this).css({borderBottom:'none'});
            },function () {
                $('.span_div').css({display:'none'});
                $(this).css({borderBottom:'1px solid #f0d2d3'});
            });

        });

        //已选中商品的数量
        $('.number_i').html($('#content').children().length);


        //增减按钮
        //减
        $('.fa-minus-square-o').bind('click', function () {
            var num = $(this).siblings('input').val();
            num--;
            $(this).siblings('input').attr('value', num);
            if ($(this).siblings('input').attr('value') <= 1) {
                $(this).siblings('input').attr('value', 1);
                num1 = 1;
            }
            //点击按钮的同时更新商品重量和价钱
            //更新价钱
            $(this).parent().siblings('.si_li').html('￥' + ($(this).siblings('input').attr('value')) * ($(this).parent().siblings('.s_li').children('span').html().split('￥')[1]));
            //更新质量
            $(this).parent().siblings('.fi_li').html($(this).siblings('input').attr('value') * 0.9 + 'kg');

            //再次计算总金额
            var add = 0;
            for (var i = 0; i < $('.art_center').length; i++) {
                add = add + parseInt($('.art_center').eq(i).find('.si_li').html().split('￥')[1]);
            }
            $('.add_price').html('￥' + add).css({color: '#da2b28'});
        });
        //
        $('.fa-plus-square-o').bind('click', function () {
            var num = $(this).siblings('input').val();
            num++;
            $(this).siblings('input').attr('value', num);
            //console.log($(this).siblings('input').attr('value'));
            $(this).parent().siblings('.si_li').html('￥' + ($(this).siblings('input').attr('value')) * ($(this).parent().siblings('.s_li').children('span').html().split('￥')[1]));
            $(this).parent().siblings('.fi_li').html($(this).siblings('input').attr('value') * 0.9 + 'kg');

            //再次计算总金额
            var add = 0;
            for (var i = 0; i < $('.art_center').length; i++) {
                add = add + parseInt($('.art_center').eq(i).find('.si_li').html().split('￥')[1]);
            }
            $('.add_price').html('￥' + add).css({color: '#da2b28'});


        });

        //总计金额
        var add = 0;
        for (var i = 0; i < $('.art_center').length; i++) {
            add = add + parseInt($('.art_center').eq(i).find('.si_li').html().split('￥')[1]);
        }
        $('.add_price').html('￥' + add).css({color: '#da2b28'});


        //删除cookie函数
        function removeCookie(name){
            setCookie(name,1,-1);
        }


        //点击删除按钮，删除对应商品  并更改相应的数据，，下面的已选择的商品的数量， 价钱；
        $('.delete').bind('click', function () {
            $(this).siblings('.delete_div').css({display:'block'});
            $('.del_span1').bind('click',function () {
                $(this).parents('.art_center').remove();
                $('.number_i').html($('.art_center').length);
                //再次计算总金额
                var add = 0;
                for (var i = 0; i < $('.art_center').length; i++) {
                    add = add + parseInt($('.art_center').eq(i).find('.si_li').html().split('￥')[1]);
                }
                $('.add_price').html('￥' + add).css({color: '#da2b28'});
                //判断商品是否为0
                if($('.art_center').length==0){
                    $('article').css({display:'none'});
                    $('.kong').css({display:'block'})
                }


                //点击删除按钮删除cookie中的值
                //先获取点击的商品的id值
                var pid=$(this).parent().parent().parent().parent().parent().attr('id');

               var tmp = getCookie('mygoods');
                var arr = JSON.parse(tmp);

                $(arr).each(function (a) {
                    if(arr[a].id==pid){
                        arr.splice(a,1);
                        return false;
                    }
                });
                var str=JSON.stringify(arr);
                setCookie('mygoods',str,7);

                if(arr.length==0){
                    removeCookie('mygoods')
                }

            });
            $('.del_span2').bind('click',function () {
                $(this).parent().parent('.delete_div').css({display:'none'});
            });



        });



        var tmp1=tmp.split(',')
        //清空购物车按钮
        $('#clear_all').bind('click', function () {
            $('.mask').css({display:'block'});
            $('.clear_shopcar').css({display:'block'});
            $('.true_clear').bind('click',function () {
                removeCookie('mygoods');
                $('.art_center').remove();
                $('.number_i').html($('.art_center').length);
                //再次计算总金额
                var add = 0;
                for (var i = 0; i < $('.art_center').length; i++) {
                    add = add + parseInt($('.art_center').eq(i).find('.si_li').html().split('￥')[1]);
                }
                $('.add_price').html('￥' + add).css({color: '#da2b28'});

                //判断商品是否为0
                if($('.art_center').length==0){
                    $('article').css({display:'none'});
                    $('.kong').css({display:'block'})
                };
                $('.mask').css({display:'none'});
                $('.clear_shopcar').css({display:'none'});
            });
            $('.close').bind('click',function () {
                $('.mask').css({display:'none'});
                $('.clear_shopcar').css({display:'none'});
            });

        });
        
//点击去结算，删除cookie
        $('.account').bind('click',function () {
            removeCookie('mygoods')
        })
        

        //
        $('.movein').attr('href', 'login.html').css({color:'#666'});



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
        var arr=JSON.parse(tmp);
        var top_b=$('<b></b>').css({color:'red',fontWeight:'bold',fontSize:'14px'});
        top_b.html(arr[0].username);
        $('#username').html('欢迎回来！').append(top_b);

        $('.login a').html('我的购物车').attr('href','myshopping_car.html');

        //注册按钮变为退出
        $('.redister a').html('退出登录').removeAttr('href').css({cursor: 'pointer'}).bind('click',function () {
            removeCookie('user');
            $('#username').html('你好，欢迎来到红领巾');
            $('.login a').html('登录').attr('href','login.html');
            var re_a=$('<a href="register.html">注册</a>');
            $('.redister').html('').append(re_a);
        })


    })
})(jQuery)