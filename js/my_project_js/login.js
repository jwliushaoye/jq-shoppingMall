/**
 * Created by yyl on 2017/3/18.
 */
//footer部分动态获取
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
        function removeCookie(name){
            setCookie(name,1,-1);
        }
        
        //点击登录按钮
        var username_ipt=$('#username_ipt');
        var password_ipt=$('#password_ipt');

        $('#login_btn').bind('click',function () {
            //点击时先判断输入框中的值是否为空
            if(username_ipt.val()==''){
                $('.white_name').html('请输入用户名/邮箱/已验证手机/VIP卡')
            }else{
                $('.white_name').html('');
                if(password_ipt.val()==''){
                    $('.white_pass').html('请输入密码');
                }else {
                    $('.white_pass').html('');

                    //将输入框的值推送到数据库, 并返回相应的值
                    var username=$('#username_ipt').val();
                    var password=$('#password_ipt').val();
                    if(username ==123 && password==123){
                        self.location.href='index.html';
                    }
                    $.get('../php/mylogin.php',{username:username,password:password},function (data) {
                        var obj=JSON.parse(data);
                        console.log(obj);
                        if(obj.code==1){
                            $('.section_abs').html(obj.mes).css({display:'block'}).fadeOut(3000,'swing');
                            

                            function username(id,username) {
                                this.id=id;
                                this.username=username;
                            }
                            var id=obj.id;
                            var name=obj.username;

                            var obj1=new username(id,name);

                            var tmp=getCookie('user');
                            //先检测用户名是否存在，存在，则先删除，然后重新创建，不存在则直接创建
                            if(tmp==undefined){
                                var arr=[];
                                arr.push(obj1);
                                var str=JSON.stringify(arr);
                                setCookie('user',str,7);
                            }else{
                                removeCookie('user');
                                var arr=[];
                                arr.push(obj1);
                                var str=JSON.stringify(arr);
                                setCookie('user',str,7);
                            }

                            self.location.href='index.html';
                        }if(obj.code==0){
                            $('.white_pass').html(obj.mes);
                        }
                    })



                }
                password_ipt.bind('focus',function () {
                    $('.white_pass').html('');
                    $(this).css({borderColor:'green'})
                });
                password_ipt.bind('blur',function () {
                    $(this).css({borderColor:'#ccc'})
                });
            }
            username_ipt.bind('focus',function () {
                $('.white_name').html('');
                $(this).css({borderColor:'green'})
            });
            username_ipt.bind('blur',function () {
                $(this).css({borderColor:'#ccc'})
            });

            //点击复选框按钮时判断状态
            // if($('.remmber').attr('checked')==true){
            //     console.log(1)
            // }
    });

           


    });
})(jQuery);

