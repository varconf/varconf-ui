var $ = layui.jquery;
var table = layui.table;
var layer = layui.layer;

table.render({
    url: '/user',
    elem: '#id_table_user',
    page: {
        layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'] 
    },
    cols: [[
        {field: '', title: '序号', width: 60, align: 'center', templet: function(d) {
            return (d.LAY_INDEX);
        }},
        {field: 'name', title: '用户名', align: 'center'},
        {field: 'permission', title: '权限', templet: '#id_table_field_permission', align: 'center'},
        {field: 'createTime', title: '创建时间', align: 'center'},
        {fixed: 'right', align: 'center', title: '操作', toolbar: '#id_table_operate_bar', width: 120, align: 'center'}
    ]],
    response: {
        statusCode: 0
    },
    request: {
        pageName: 'pageIndex',
        limitName: 'pageSize'
    },
    parseData: function(res){ 
        return {
            "code": res.code,
            "count": res.data.totalCount,
            "data": res.data.pageData
        };
    },
    id: 'id_layui_table_user'
});

//监听行工具事件
table.on('tool(filter_table_user)', function(obj){
    if (obj.event == 'edit') {
        parent.openLayer('修改用户', './user_opt.html?opt=edit&userId=' + obj.data.userId);
    } else if (obj.event == 'del') {
        deleteUser(obj.data.userId);
    }
});

//添加用户
$('#id_btn_add').on('click', function() {
    parent.openLayer('添加用户', './user_opt.html?opt=add');
});

//搜索用户
$('#id_btn_search').on('click', function() {
    reloadTable($('#id_input_user').val());
});

//刷新列表
$('#id_btn_refresh').on('click', function() {
    reloadTable('');
});

function reloadTable(name) {
    table.reload('id_layui_table_user', { 
        page: {curr: 1},
        where: {
            likeName: name
        }
    }, 'data');
}

function deleteUser(userId) {
    parent.layer.confirm('是否删除该用户？', {title: '提示'}, 
        function(index) {
            $.ajax({
                type: "DELETE",
                url: '/user/' + userId,
                success: function(res) {
                    if (res.success == true) {
                        parent.layer.msg('删除成功！');
                        reloadTable('');
                    } else {
                        parent.layer.msg('删除失败！');
                    }
                },
                error: function(e) {
                    parent.layer.msg('删除失败！');
                }
            });
            parent.layer.close(index);
        }, 
        function() {}
    );
}