$(function() {
    var form = layui.form
    var layer = layui.layer
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
      $('.login-box').hide()
      $('.reg-box').show()
    })
  
    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
      $('.login-box').show()
      $('.reg-box').hide()
    })

    form.verify({
        //自定义一个pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位且不能为空格'],
        //校验俩次密码是否一致的规则
        repwd: function(value) {
            //通过形参拿到的是确认密码框中的内容
            //再拿到密码框中的内容
            //然后进行一次等于判断
            //如果判断失败，则return一个提示消息
            var pwd = $('.reg-box [name=password]').val()
            if(pwd !== value) {
                return '俩次密码不一致'
            }
        }
    })

    // 、、监听注册表单的提交事件
    $('#form_reg').on('submit', function(e){
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('http://ajax.frontend.itheima.net/api/reguser', data, function(res){
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功')
            $('#link_login').click()
        })
    })

    //监听登录表单的提交事件
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败!')
                }
                layer.msg('登录成功!')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
  })