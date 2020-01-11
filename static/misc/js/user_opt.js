var $ = layui.jquery;
var form = layui.form;
var opt = getQueryVariable('opt');
var userId = getQueryVariable('userId');

if (opt == 'edit') {
    $('input[name="name"]').attr('disabled', true);

    $.ajax({
        type: "GET",
        url: '/user/' + userId,
        contentType: "application/json",
        dataType: "json",
        success: function(res) {
            if (res.success == true) {
                form.val('filter_from_user', res.data);
            } else {
                parent.layer.msg('查询失败！');
            }
        },
        error: function(e) {
            parent.layer.msg('查询失败！');
        }
    });
}

//自定义验证规则
form.verify({
    name: function(value) {
        if(value.length < 5) {
            return '用户名至少得5个字符啊';
        }
    },
    password: [/(.+){6,12}$/, '密码必须6到12位'],
});

form.on('submit(create)', function (data) {
    var type = 'PUT';
    var url = '/user';
    if (opt == 'edit') {
        type = 'PATCH';
        url = '/user/' + userId;
    }

    $.ajax({
        type: type,
        url: url,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(data.field), 
        success: function(res) {
            if (res.success == true) {
                parent.layer.msg('操作成功！');
                parent.layer.close(parent.layer.getFrameIndex(window.name)); 
            } else {
                parent.layer.msg('操作失败！');
            }
            parent.refreshUser();
        },
        error: function(e) {
            parent.layer.msg('操作失败！');
        }
    });
    return false;
});