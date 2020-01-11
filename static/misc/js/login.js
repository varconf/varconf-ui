var $ = layui.jquery;
var form = layui.form;

form.on('submit(login)', function (data) {
  $.ajax({
      type: 'GET',
      url: '/user/login',
      contentType: "application/json",
      dataType: "json",
      data: data.field, 
      success: function(res) {
          if (res.success == true) {
              parent.layer.msg('登陆成功！');
              window.location.href = '/static/html/index.html';
          } else {
              parent.layer.msg('登陆失败！');
          }
      },
      error: function(e) {
          parent.layer.msg('登陆失败！');
      }
  });
  return false;
});