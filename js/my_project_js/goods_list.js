/**
 * Created by yyl on 2017/3/20.
 */


(function () {
    $(function () {
        //动态获取article_top中的值
        $.ajax({
            url:'../goods_list.json',
            success:function (data) {
                //console.log(data)
                var nav_div_f=$('<div></div>');
                $('.article_top').append(nav_div_f);
                var nav_p_t=$('<p></p>');
                nav_p_t.html(data.l);
                nav_div_f.append(nav_p_t);
                var nav_ul_t=$('<ul></ul>');
                nav_div_f.append(nav_ul_t);
                for (var i=0;i<data.s.length;i++){
                    var nav_li_t=$('<li></li>');
                    nav_li_t.html(data.s[i].n);
                    nav_ul_t.append(nav_li_t);
                }
                var nav_div_s=$('<div></div>');
                $('.article_top').append(nav_div_s);
                var nav_p_b=$('<p></p>');
                nav_p_b.html(data.l);
                nav_div_s.append(nav_p_b);
                var nav_ul_b=$('<ul></ul>');
                nav_div_s.append(nav_ul_b);
                for (var j=0;j<data.p.length;j++){
                    var nav_li_b=$('<li></li>');
                    nav_li_b.html(data.p[j].n);
                    nav_ul_b.append(nav_li_b);
                }
            }
        })

        $.getJSON('https://ai.jd.com/index_new.php?app=ABdata&action=ABData&key=BtestData&callback=?',function () {});

        //鼠标划入nav第一个li时，显示侧边栏
        $('.typeli').hover(function () {
            $('#abs_left').css({display:'block'});
        },function () {
            $('#abs_left').css({display:'none'});
        });
        $('#abs_left').hover(function () {
            $(this).css({display:'block'})
        },function () {
            $('.abs_right_div').hover(function () {
                $('#abs_left').css({display:'block'});
            },function () {
                $('#abs_left').css({display:'none'});
            });
            $('#abs_left').css({display:'none'});
        });

        //商品列表中的值，json获取
        $.ajax({
            url:'../goods_list_x.json',
            success:function (data) {
                console.log(data)
                for (var i=0;i<data.length;i++){
                    var div=$('<div class="goods_div"></div>');
                    $('section').append(div);
                    var img=$('<img>');
                    img.attr('src',data[i].img);
                    var a=$('<a></a>');
                    a.attr('href','detail.html?id='+data[i].id); //给商品添加跳转
                    a.html(data[i].a);
                    var span=$('<span></span>');
                    span.html(data[i].s);
                    div.append(img);
                    div.append(a);
                    div.append(span);
                    var pt=$('<p></p>');
                    //console.log(data[i].p);

                    var span1=$('<span></span>');
                    var it=$('<i></i>');
                    it.html(data[i].p.n);
                    //arr.push(data[i].p.n); //将销量信息添加到数组中
                    span1.html('已售');
                    span1.append(it);
                    pt.append(span1);
                    var span2=$('<span></span>');
                    var bt=$('<del></del>');
                    bt.html(data[i].p.p);
                    span2.html('厂商建议价');
                    span2.append(bt);
                    pt.append(span2);
                    div.append(pt);
                }


                //获取user  cookie
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

                var tmp=getCookie('user');
                var arr=JSON.parse(tmp);
                var top_b=$('<b></b>').css({color:'red',fontWeight:'bold',fontSize:'14px'});
                top_b.html(arr[0].username);
                $('#username').html('欢迎回来！').append(top_b);

                $('.login a').html('我的购物车').attr('href','myshopping_car.html');

                //注册按钮变为退出
                $('.redister a').html('退出登录').removeAttr('href').css({cursor: 'pointer'}).bind('click',function () {
                    $('#username').html('你好，欢迎来到红领巾');
                    $('.login a').html('登录').attr('href','login.html');
                    var re_a=$('<a href="register.html">注册</a>')
                    $('.redister').html('').append(re_a);
                });
                

            }
        });
    })
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
                    if(tmp[i].s[a].s[b].s[c].n.substring(tmp[i].s[a].s[b].s[c].n.lastIndexOf('|')+1)==1){
                        abs_li.style.color='red';
                        abs_li.style.border='1px dashed red';
                    }
                    abs_li.innerHTML=inner4;
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










