/**
 * Created by yyl on 2017/3/19.
 */
(function () {
    $(function () {


        //顶部
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
        //底部
        $.ajax({
            url:'../index_bottom.json',
            success:function (res) {
                var tmp3 = res.foot;
                var footer=$('<footer></footer>');
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
                $('body').append(footer)
            }
        });

        //获得焦点时表框变为绿色；输入相应的值出现下拉菜单  ；失去焦点时若满足条件 则span无  若不满足 红色不消失

        var isuser=false;

        var username_div=$('<div class="username_div"></div>');
        username_div.css({display:'none',position:'absolute',left:'110px',top:'30px', zIndex:'2'});
        $('.sec_abs').append(username_div);

        $(document).bind('click',function () {
            username_div.css({display:'none'});
        });

        //做一个标记


        var user=false;
        var password=false;
        var truepass=false;
        var phonepass=false;
        var yzm=false;
        var phoneyzm=false;
        //用户名验证
        $('#name_ipt').bind('focus',function () {
            $(this).css({borderColor:'green'}).siblings('span').css({display:'block'});
            if($(this).val()!=''){
                username_div.html('');
                $.ajax({
                    url:'../myredister.json',
                    success:function (data) {
                       // console.log(data);
                        for (var i=0;i<data.length;i++){
                            var username_div_a=$('<a></a>');
                            //console.log($('#name_ipt').val()+data[i].t);
                            username_div_a.html($('#name_ipt').val()+data[i].t);
                            username_div.append(username_div_a);
                        }
                        username_div.css({padding:'5px',display:'none'});
                    }
                })
            }
            $(this).on('keyup',function () {
                username_div.html('');
                if($(this).val()!=''){
                    $.ajax({
                        url:'../myredister.json',
                        success:function (data) {
                            //console.log(data);
                            for (var i=0;i<data.length;i++){
                                var username_div_a=$('<a></a>');
                              //console.log($('#name_ipt').val()+data[i].t);
                                username_div_a.html($('#name_ipt').val()+data[i].t);
                                username_div.append(username_div_a);
                            }
                            username_div.css({padding:'5px',display:'block'})
                        }
                    })
                }else {
                    username_div.css({display:'none'})
                };


            });

            username_div.bind('click',function (e) {
                $('#name_ipt').html('');
                $('#name_ipt').val($(e.target).context.innerHTML);
                $(this).css({display:'none'})
            });


            $('#name_ipt').bind('blur',function () {
                if($(this).val().length>=4 && $(this).val().length<=30 || $(this).val()==''){
                    $(this).css({borderColor:'#ccc'}).siblings('span').css({display:'none'});
                    user=true;
                }else {
                    $(this).css({borderColor:'red'}).siblings('span').html('用户长度只能在4-30位字符之间').css({borderColor:"red",color:'red'}).end().on('focus',function () {
                        $(this).siblings('span').html('请输入用户名/邮箱/手机号').css({borderColor:"#ddd",color:'#666'});
                        username_div.html('');
                            username_div.css({display:'none'})
                        });

                    }

            })
        });

        //密码验证
        $('#pass_ipt').bind('focus',function () {
            $(this).css({borderColor:'green'}).siblings('span').css({display:'block'});
            $(this).bind('keyup',function () {
                var data=$(this).val();
                //做标记
                var hasnum=false;
                var haschar=false;
                var hassign=false;
                if($(this).val().length>=6){
                    $('.self_b').css({visibility:'visible'});


                    if((/[0-9]/g).test(data)) {
                        hasnum=true;
                    }if((/[a-z]/ig).test(data)){
                        haschar=true;
                    }if((/[`~!@#$%^&*_+<>{}\/'[\]]/g).test(data)){
                        hassign=true;
                    }


                    if(hassign){
                        $('.ruo').css({background:'red'}).addClass('i_bg');
                        $('.zhong').css({background:'yellow'}).addClass('i_bg');
                        $('.strong').css({background:'green'}).addClass('i_bg');
                    }else if(hasnum && haschar){
                        $('.ruo').css({background:'red'}).addClass('i_bg');
                        $('.zhong').css({background:'yellow'}).addClass('i_bg');
                    }else{
                        $('.ruo').css({background:'red'}).addClass('i_bg');
                    }
                }else if($(this).val().length<6) {
                    $('.self_b').css({visibility:'hidden'});
                    $('.self_b').find('i').css({background:'#999'}).removeClass('i_bg');
                }
            })
        });
        $('#pass_ipt').bind('blur',function () {
            if($(this).val().length>=6 && $(this).val().length<=20 || $(this).val()==''){
                password=true;
                $(this).siblings('span').css({display:'none'}).end().css({borderColor:'#ddd'});
                if($('.self_b').find('.i_bg').length==1){
                    $(this).css({borderColor:'red'});
                    $(this).siblings('span').html('密码太简单，建议由数字、字母组成').css({display:'block',color:'red',borderColor:'red'}).end().on('focus',function () {
                        $(this).siblings('span').html('6-20位字符，由符号、字母、数字组成').css({display:'block',color:'#666',borderColor:'#ddd'})
                    });
                }
        }else {
                $(this).css({borderColor:'red'});
                $(this).siblings('span').css({color:'red',borderColor:'red'});
            }
        });
        
        //确认密码
        $('#sure_ipt').bind('focus',function () {
            $(this).css({borderColor:'green'}).siblings('span').html('请确认密码').css({display:'block',borderColor:'#ddd',color:'#666'});
        });
        $('#sure_ipt').bind('blur',function () {
            if($(this).val()==$('#pass_ipt').val()){
                if($('.self_b').find('.i_bg').length==1){
                    $(this).css({borderColor:'red'}).siblings('span').html('密码太简单，建议由数字、字母组成').css({display:'block',color:'red',borderColor:'red'});
                }else {
                    $(this).css({borderColor:'#ddd'}).siblings('span').css({display:'none'});
                    truepass=true;
                }
            }else {
                $(this).css({borderColor:'red'}).siblings('span').html('6-20位字符，由符号、字母、数字组成').css({display:'block',borderColor:'red', color:'red'});
            }
        });
        
        //验证手机
        $('#phone_ipt').bind('focus',function () {
            if($(this).val()==''){
                $(this).css({borderColor:'green'}).siblings('span').css({display:'block'});
            }
        });
        $('#phone_ipt').bind('blur',function () {
            var data=$(this).val();
            var res=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
            if (res.test(data)==true || $(this).val()=='' ){
                $(this).css({borderColor:'#ddd'}).siblings('span').css({display:'none'});
                phonepass=true;
            }else {
                $(this).css({borderColor:'red'}).siblings('span').html('请确认输入的是手机号或者重新输入').css({display:'block',color:'red',borderColor:'red'});
            }
        });
        
        //验证码
        //随机一个数字加字母组合验证码
        function getcolor() {
            var R=Math.round(Math.random()*255).toString(16);
            var G=Math.round(Math.random()*255).toString(16);
            var B=Math.round(Math.random()*255).toString(16);
            R.length<2 ? R='0'+R : R=R;
            G.length<2 ? G='0'+G : G=G;
            B.length<2 ? B='0'+B : B=B;
            return R+G+B;
        }

        function exp() {
            var str=$('<p></p>');
            while (str.find('b').length != 4) {
                var num = Math.round(Math.random() * 74 + 48);
                var b=$('<b></b>');
                var deg=Math.round(Math.random()*120);
                var deg1=deg-60;
                var char = String.fromCharCode(num);
                b.html(char);
                b.css({color:'#'+getcolor(), transform:'rotate('+deg1+'deg)',fontSize:'20px'});
                if (char >= '0' && char <= '9') {
                    str.append(b);
                }
                if (char >= 'A' && char <= 'Z') {
                   str.append(b);
                }
                if (char >= 'a' && char <= 'z'){
                    str.append(b);
                }
            }
            for (var i=0;i<2;i++){
                var div=$('<div></div>');
                var deg=Math.round(Math.random()*60);
                var deg1=deg-30;
                var top=Math.round(Math.random()*20);
                div.css({backgroundColor:'#'+getcolor(),transform:'rotate('+deg1+'deg)',top:top+'px'});
                str.append(div);
            }
            return str;
        }

        $('.yaz_img').html(exp()).on('click',function () {
            $('.yaz_img').html(exp());
        });


        $('#change_img').bind('click',function () {
            $('.yaz_img').html(exp())
        });

        $('#yaz_ipt').bind('focus',function () {
            $(this).css({borderColor:'green'}).siblings('span').css({display:'block'});
        });
        $('#yaz_ipt').bind('blur',function () {
            $(this).css({borderColor:'#ddd'}).siblings('span').css({display:'none'});
            var val='';
            for (var k=0;k<$('.yaz_img').children('p').children('b').length;k++){
                var b_value=$('.yaz_img').children('p').children('b').eq(k).html();
                val += b_value;
            }

            if(val!=$(this).val() && $('#yaz_ipt').val()!=''){
                $(this).css({borderColor:'red'}).siblings('span').html('验证码输入错误').css({display:'block', color:'red',borderColor:'red'}).end().on('focus',function () {
                    $('#yaz_ipt').html('');
                    $('.yaz_img').html(exp());
                    $(this).siblings('span').html('请输入验证码').css({display:'block', color:'#666',borderColor:'#ddd'})
                })
            }
            if($('#yaz_ipt').val()==''){
                $(this).css({borderColor:'#ddd'}).siblings('span').css({display:'none'});
                yzm=true;
            }
        });


        //短信随机验证码
        $('.get_yz').on('click',function () {
            //循环一个六位验证码
            var number='';
            for (var i=0;i<6;i++){
                var num=Math.round(Math.random()*9);
                number += num;
            }
            $(this).html(number);
        });
        $('#mes_ipt').on('focus',function () {
            $(this).css({borderColor:'green'}).siblings('span').css({display:'block'});
        });
        $('#mes_ipt').on('blur',function () {

            if($(this).val()==$('.get_yz').html() || $('#mes_ipt').val()==''){
                $(this).css({borderColor:'#ddd'}).siblings('span').css({display:'none'});
                phoneyzm=true;
            }else {
                $(this).css({borderColor:'red'}).siblings('span').html('验证码输入错误').css({display:'block',color:'red',borderColor:'red'}).end().on('focus',function () {
                    $(this).css({borderColor:'green'}).siblings('span').html('请输入手机验证码').css({display:'block',borderColor:'#ddd',color:'#666'});
                })
            }
        });
        
        //判断是否勾选同意协议
        $('.agree').bind('click',function () {
            $('.redister').toggleClass('re_bg');
        })
        

        //点击注册按钮，首先判断各个框中值是否满足条件，若满足，讲用户名传入数据库，检查是否已经被注册，若没有注册，则将数据添加至数据库；
        $('.redister').on('click',function () {
           if($('#name_ipt').val().length>=4 && $('#name_ipt').val().length<=30){
              if($('#pass_ipt').val().length>=6 && $('#pass_ipt').val().length<=20){
                  if($('#sure_ipt').val()==$('#pass_ipt').val()){
                      if(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test($('#phone_ipt').val())){
                          if($('#yaz_ipt').val()!='' && $('#mes_ipt').val()!=''){
                              var username=$('#name_ipt').val();
                              var password=$('#pass_ipt').val();
                              var phonenumber=$('#phone_ipt').val();
                              $.get('../php/redister.php',{username:username,password:password,phonenumber:phonenumber},function (data) {
                                  console.log(data);
                                  var obj=JSON.parse(data);
                                  if(obj.code==0){
                                      var display_div=$('<div></div>');
                                      display_div.css({
                                          width:'210px',height:'50px', padding:'20px',background:'#fff',fontSize:'20px',
                                          textAlign:'center',lineHeight:'50px', position:'absolute',left:'45%',top:'30%',boxShadow:'0 0 5px #666'
                                      }).html(obj.mes);
                                      $('body').append(display_div);
                                      display_div.fadeOut(2000,'swing');
                                  }
                                  if(obj.code==1){
                                      var display_div1=$('<div></div>');
                                      display_div1.css({
                                          width:'210px',height:'50px', padding:'20px',background:'#fff',fontSize:'20px',
                                          textAlign:'center',lineHeight:'50px', position:'absolute',left:'45%',top:'30%',boxShadow:'0 0 5px #666'
                                      }).html(obj.mes);
                                      $('body').append(display_div1);
                                      display_div1.fadeOut(2000,'swing');
                                  }
                              })
                          }
                      }
                  }
                  
              }
           }else {
              var span=$('<span></span>')
               span.html('信息填写错误！！').css({fontSize:'24px'});
               $('.defite').append(span).css({display:'block'}).fadeOut(2000,function () {
                   $(this).html('');
               })
           }
        })
    })
})(jQuery);