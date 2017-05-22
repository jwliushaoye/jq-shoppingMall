/**
 * Created by yyl on 2017/3/21.
 */


(function () {
    $(function () {
        //侧边栏
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
        
       

        //获取传来的id值  获取相应的json串
        // console.log(location.search);
        // console.log(location.search.slice(1).split('='));
        // console.log(location.search.slice(1).split('=')[1]);
        var pid=location.search.slice(1).split('=')[1];
        var purl=pid+'.json';

        $.getJSON("../"+purl,function (data) {
            //console.log(data);
            $('.art_title').html(data.title);
            $('.div_r_t ul li:first').html(data.price);
            //获取颜色
            for (var i=0; i<data.color.length;i++){
                var color_li=$('<li></li>');
                color_li.html(data.color[i].c);
                $('.color_ul').append(color_li).find('li:first').addClass('first_li');
            }
            for (var j=0;j<data.size.length;j++){
                var size_li=$('<li></li>');
                size_li.html(data.size[j].s);
                $('.size_ul').append(size_li).find('li:first').addClass('first_li');
            }
            var choose_li=$('<li class="choose_li"></li>');
            choose_li.html('"'+data.color[0].c+'"'+'"'+data.size[0].s+'"').css({
                color:'red'
            });
            $('.choose_ul').append(choose_li);

            var span_shop=$('<span></span>');
            span_shop.html(data.price);
            $('.add_shop').prepend(span_shop);

            //右边推荐列表
            for (var m=0;m<data.tuijian.length;m++){
                var right_ul=$('<ul></ul>');
                $('.sec_right').append(right_ul);
                var right_ul_img=$('<img>');
                right_ul_img.attr('src',data.tuijian[m].img);
                right_ul.append(right_ul_img);
                var right_ul_li1=$('<li></li>');
                right_ul_li1.addClass('ul_li1');
                right_ul_li1.html(data.tuijian[m].t);
                right_ul.append(right_ul_li1);
                var right_ul_li2=$('<li></li>');
                right_ul_li2.addClass('ul_li2');
                right_ul_li2.html(data.tuijian[m].p);
                right_ul.append(right_ul_li2);
            }

            //放大镜图片;
            for(var k=0;k<data.ssdiv.length;k++){
                var img_li=$('<li></li>');
                var img_img=$('<img>');
                img_img.attr('src',data.ssdiv[k].img);
                img_li.append(img_img);
                $('.img_ul').append(img_li);
            };
            $('.img_ul li:first-child').addClass('choose');

            var sdiv_img=$('<img>');
            sdiv_img.attr('src',data.sdiv);
            $('.div_s').prepend(sdiv_img);


            //详情介绍图片
            var dity_img=$('<img>');
            dity_img.attr('src',data.dity_img);
            $('.sec_tab').append(dity_img);

            //商家
            $('.source').html(data.source)

            //评分
            var one=0;
            var two=0;
            var three=0;
            var four=0;
            var five=0;
            var img_num=0;
            for (var a=0;a<data.pj.length;a++){
                if(data.pj[a].n==5){
                    one +=1;
                }if(data.pj[a].n==4){
                    two +=1;
                }if(data.pj[a].n==3){
                    three +=1;
                }if(data.pj[a].n==2){
                    four +=1;
                }if(data.pj[a].n==1){
                    five +=1;
                }if(data.pj[a].img){
                    img_num +=1;
                }

                //评价内容
                var left_div=$('<div></div>');
                left_div.addClass('left_div');
                left_div.attr('score',data.pj[a].n);
                $('.meg_div').append(left_div);
                var left_p=$('<p></p>');
                left_div.append(left_p);
                var left_p_img=$('<img>');
                left_p_img.attr('src',data.pj[a].tx);
                left_p.append(left_p_img);
                var left_span=$('<span></span>');
                left_span.html(data.pj[a].name);
                left_p.append(left_span);

                var mes_ul=$('<ul></ul>');
                left_div.append(mes_ul);
                var mes_ul_li1=$('<li></li>');
                mes_ul_li1.html('发表时间:'+data.pj[a].t);
                var mes_ul_li1_p=$('<p></p>');
                for (var b=0;b<data.pj[a].n;b++){
                    var star_f=$('<i class="fa fa-star"></i>');
                   mes_ul_li1_p.append(star_f);
                }
                for(var c=0;c<5-data.pj[a].n;c++){
                    var star_n=$('<i class="fa fa-star-o"></i>');
                    mes_ul_li1_p.append(star_n);
                }
                $('.fa-star').css({color:'#fe702b'});
                mes_ul_li1.prepend(mes_ul_li1_p);
                mes_ul.append(mes_ul_li1);
                var mes_ul_li2=$('<li></li>');
                mes_ul_li2.html('客户评价:'+data.pj[a].c);
                mes_ul.append(mes_ul_li2);
                var mes_ul_li3=$('<li></li>');
                mes_ul_li3.html('客服回复:'+data.pj[a].r);
                mes_ul.append(mes_ul_li3);
                var mes_ul_li4=$('<li></li>');
                mes_ul_li4.html('客服时间:'+data.pj[a].rt);
                mes_ul.append(mes_ul_li4);
                if(data.pj[a].img){
                    left_div.attr('img',1);
                    var img_li=$('<li></li>');
                    for (var x=0;x<data.pj[a].img.length;x++){
                        var img_=$('<img>');
                        img_.attr('src',data.pj[a].img[x].i);
                        img_li.append(img_)
                    }
                    mes_ul.append(img_li)
                }else {
                    left_div.attr('img',0);
                }

            }
            $('.pj_div ul li').eq(0).children('span').html('('+one+')');
            $('.pj_div ul li').eq(1).children('span').html('('+two+')');
            $('.pj_div ul li').eq(2).children('span').html('('+three+')');
            $('.pj_div ul li').eq(3).children('span').html('('+four+')');
            $('.pj_div ul li').eq(4).children('span').html('('+five+')');


            $('.meg_div ul:first li:nth-child(1)').append('('+data.pj.length+')');
            $('.meg_div ul:first li:nth-child(2)').append('('+(one+two)+')');
            $('.meg_div ul:first li:nth-child(3)').append('('+three+')');
            $('.meg_div ul:first li:nth-child(4)').append('('+(five+four)+')');
            $('.meg_div ul:first li:nth-child(5)').append('('+img_num+')');

            $('aside ul li:nth-child(1) .bg .fitter').css({width:one/data.pj.length*$('.bg').width()});
            $('aside ul li:nth-child(2) .bg .fitter').css({width:two/data.pj.length*$('.bg').width()});
            $('aside ul li:nth-child(3) .bg .fitter').css({width:three/data.pj.length*$('.bg').width()});
            $('aside ul li:nth-child(4) .bg .fitter').css({width:four/data.pj.length*$('.bg').width()});
            $('aside ul li:nth-child(5) .bg .fitter').css({width:five/data.pj.length*$('.bg').width()});

            $('.mes_ul').on('click','li',function () {
                $(this).siblings('li').removeClass('fa_i').end().addClass('fa_i');
            });


            $('.sec_ch').bind('click',function () {
                $('.sec_tab').css({display:'block'});
                $('.sec_tab4').css({display:'none'});
                $(this).siblings('li').removeClass('sec_ch').end().addClass('sec_ch');
            });
            $('.pingj_li').bind('click',function () {
                $('.sec_tab').css({display:'none'});
                $('.sec_tab4').css({display:'block'});
                $(this).siblings('li').removeClass('sec_ch').end().addClass('sec_ch');
            });

            $('.all_li').bind('click',function () {
                $('.left_div').css({display:'block'})
            });

            $('.good_pj').bind('click',function () {
                for (var l=0;l<$('.left_div').size();l++){
                    var score=$('.left_div').eq(l).attr('score');
                    if(score<4){
                        $('.left_div').eq(l).css({display:'none'})
                    }else {
                        $('.left_div').eq(l).css({display:'block'})
                    }
                }
            });

            $('.three_star').bind('click',function () {
                for (var p=0;p<$('.left_div').size();p++){
                    var score=$('.left_div').eq(p).attr('score');
                    if(score!=3){
                        $('.left_div').eq(p).css({display:'none'})
                    }else {
                        $('.left_div').eq(p).css({display:'block'})
                    }
                }
            });

            $('.bed_pj').bind('click',function () {
                for (var q=0;q<$('.left_div').size();q++){
                    var score=$('.left_div').eq(q).attr('score');
                    if(score>2){
                        $('.left_div').eq(q).css({display:'none'})
                    }else {
                        $('.left_div').eq(q).css({display:'block'})
                    }
                }
            });

            $('.has_img').bind('click',function () {
                for (var z=0;z<$('.left_div').size();z++){
                    var img=$('.left_div').eq(z).attr('img');
                    if(img==1) {
                        $('.left_div').eq(z).css({display: 'block'});
                    }else {
                        $('.left_div').eq(z).css({display: 'none'});
                    }
                }
            });


            //放大镜效果
            $('.art_l_div ul li').on('mouseenter',function () {
                $(this).siblings('li').removeClass('choose').end().addClass('choose');
                $('.div_s img').attr('src','../img/detail_img_f'+($(this).index()+1)+'.jpg');
                $('.div_b img').attr('src','../img/detail_img_f'+($(this).index()+1)+'.jpg')
            });

            //计算大图片的宽度    mask/s=b/x
            var width=($('.div_s').width()*$('.div_b').width())/$('.mask').width();
            $('.div_b img').css({width:width+'px'});

            //计算相对移动的距离

            $('.div_s').on('mouseenter',function () {
                $('.mask').css({display:'block'});
                $('.div_b').css({display:'block'})
            }).on('mouseleave',function () {
                $('.mask').css({display:'none'});
                $('.div_b').css({display:'none'})
            }).on('mousemove',function (e) {
                var x=e.clientX-$(this).offset().left-($('.mask').width())/2;
                var y=e.clientY-($(this).offset().top-$(window).scrollTop())-($('.mask').height())/2;
                $('.mask').css({left:x+'px',top:y+'px'});

                //不让mask超出边界;
                if(x<=0){
                    $('.mask').css({left:0});
                    x=0;
                }if(y<=0){
                    $('.mask').css({top:0});
                    y=0;
                }if(x>=$('.div_s').width()-$('.mask').width()){
                    $('.mask').css({left:$('.div_s').width()-$('.mask').width()});
                    x=$('.div_s').width()-$('.mask').width();
                }if(y>=$('.div_s').height()-$('.mask').height()){
                    $('.mask').css({top:$('.div_s').height()-$('.mask').height()});
                    y=$('.div_s').height()-$('.mask').height();
                }
                //big_div反向运动
                $('.div_b img').css({left:-(x*$('.div_b img').width())/$('.div_s').width()+'px'});
                $('.div_b img').css({top:-(y*$('.div_b img').height())/$('.div_s').height()+'px'})

            });

            //点击添加到购物车  将商品信息保存到cookie
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
            }


            function mygoods(name,price,number,color,size,img,offer,pid,weight,rt,delprice,str) {
                this.name=name;
                this.price=price;
                this.number=number;
                this.color=color;
                this.size=size;
                this.img=img;
                this.offer=offer;
                this.id=pid;
                this.weight=weight;
                this.rt=rt;
                this.delprice=delprice;
                this.str=str;
            }

            $('.add_shoppingcar').bind('click',function () {
                var name=data.title;
                var price=data.price;
                var number=$('#num_ipt').val();
                var color=$('.color_ul .first_li').html();
                var size=$('.size_ul .first_li').html();
                var src=$('.choose img').attr('src');
                var offer='深圳市雅兰家纺科技有限公司';
                var id=pid;
                var weight=0.9;
                var rt=0;
                var delprice='￥176';
                var str='';
                for (var k=0;k<data.cu.length;k++){
                    var str=str+data.cu[k].t;
                }

                var obj=new mygoods(name,price,number,color,size,src,offer,id,weight,rt,delprice,str);
                var tmp=getCookie('mygoods');
                //console.log(tmp);

                if(tmp==undefined){
                    var arr=[];
                    arr.push(obj);
                    var str=JSON.stringify(arr);
                    setCookie('mygoods',str,7);
                }else {
                    var arr=JSON.parse(tmp);
                    $(arr).each(function (k) {
                        if(arr[k].id==obj.id){
                            var num=parseInt(arr[k].number)+parseInt(obj.number);
                            arr[k].number = num;
                            return false;
                        }else {
                            if(k==arr.length-1){
                                arr.push(obj);
                            }
                        }
                    });
                    var str=JSON.stringify(arr);
                    setCookie('mygoods',str,7)
                }
            });



        });


        //增减按钮
        //减
        var num_ipt=$('#num_ipt').val();
        var num1=1;
        $('.fa-minus-square-o').bind('click',function () {
            num1--;
            $('#num_ipt').attr('value',num1);
            if($('#num_ipt').attr('value')<=1){
                $('#num_ipt').attr('value',1);
                num1=1;
            }
        });
        //增

            $('.fa-plus-square-o').bind('click',function () {
                num1++;
                $('#num_ipt').attr('value', num1);
            });



        //选择相应商品
        $('.color_ul,.size_ul').on('mouseenter','li',function () {
            $(this).css({border:'2px solid #e43b3e'})
        }).on('mouseleave','li',function () {
            if($(this).attr('class')){
                $(this).css({border:'2px solid #e43b3e'})
            }else {
                $(this).css({border:'1px solid #cfcfcf'});
            }
        }).on('click','li',function () {
            $(this).siblings('li').removeClass('first_li').css({border:'1px solid #cfcfcf'}).end().addClass('first_li');
            $('.choose_li').html('"'+$('.color_ul .first_li').html()+'"'+','+'"'+$('.size_ul .first_li').html()+'"')
        });



      //点击加入购物车效果
        $('.add_shoppingcar').bind('click',function () {
            $('.big_mask').css({display:'block'});
            $('.addtit_div').css({display:'block'})
        });

        $('#cloose_abs').bind('click',function () {
            $('.big_mask').css({display:'none'});
            $('.addtit_div').css({display:'none'})
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