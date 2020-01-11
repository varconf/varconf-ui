var $ = layui.jquery;
var form = layui.form;

$.ajax({
    type: "GET",
    url: '/user/profile',
    contentType: "application/json",
    dataType: "json",
    success: function(res) {
        if (res.success == true) {
            form.val('filter_from_profile', res.data);
        } else {
            parent.layer.msg('查询失败！');
        }
    },
    error: function(e) {
        parent.layer.msg('查询失败！');
    }
});

form.on('submit(update)', function (data) {
    if (data.field.password2 != data.field.password3) {
        parent.layer.msg('2次密码不一致！');
        return false;
    }

    $.ajax({
        type: 'POST',
        url: '/user/passwd',
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        data: data.field, 
        success: function(res) {
            if (res.success == true) {
                parent.layer.msg('操作成功！');
            } else {
                parent.layer.msg('操作失败！');
            }
        },
        error: function(e) {
            parent.layer.msg('操作失败！');
        }
    });
    return false;
});