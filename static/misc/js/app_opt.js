var $ = layui.jquery;
var form = layui.form;
var opt = getQueryVariable('opt');
var appId = getQueryVariable('appId');

if (opt == 'detail' || opt == 'edit') {
    $('input[name="code"]').attr('disabled', true);
    
    if (opt == 'detail') {
        $('input[name="name"]').attr('disabled', true);
        $('textarea[name="desc"]').attr('disabled', true);
        $('button[name="submit"]').addClass('layui-hide');
    }

    $.ajax({
        type: "GET",
        url: '/app/' + appId,
        contentType: "application/json",
        dataType: "json",
        success: function(res) {
            if (res.success == true) {
                form.val('filter_from_app', res.data);
            } else {
                parent.layer.msg('查询失败！');
            }
        },
        error: function(e) {
            parent.layer.msg('查询失败！');
        }
    });
}

form.on('submit(create)', function (data) {
    var type = 'PUT';
    var url = '/app';
    if (opt == 'edit') {
        type = 'PATCH';
        url = '/app/' + appId;
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
            parent.refreshApp();
        },
        error: function(e) {
            parent.layer.msg('操作失败！');
        }
    });
    return false;
});