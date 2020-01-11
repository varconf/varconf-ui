var $ = layui.jquery;
var table = layui.table;
var layer = layui.layer;

table.render({
    url: '/app',
    elem: '#id_table_app',
    page: {
        layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'] 
    },
    cols: [[
        {field: '', title: '序号', width: 60, align: 'center', templet: function(d) {
            return (d.LAY_INDEX);
        }},
        {field: 'name', title: '应用名', align: 'center'},
        {field: 'code', title: '应用代号', align: 'center'},
        {field: 'desc', title: '描述', align: 'center'},
        {field: 'createTime', title: '创建时间', align: 'center'},
        {fixed: 'right', align: 'center', title: '操作', toolbar: '#id_table_operate_bar', width: 180, align: 'center'}
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
    id: 'id_layui_table_app'
});

//监听行工具事件
table.on('tool(filter_table_app)', function(obj){

    if (obj.event == 'config') {
        parent.openTab('config_' + obj.data.appId, obj.data.name + '-配置', './config.html?appId=' + obj.data.appId);
    } else if (obj.event == 'detail') {
        parent.openLayer('应用详情', './app_opt.html?opt=detail&appId=' + obj.data.appId);
    } else if (obj.event == 'edit') {
        parent.openLayer('修改应用', './app_opt.html?opt=edit&appId=' + obj.data.appId);
    } else if (obj.event == 'del') {
        deleteApp(obj.data.appId);
    }
});

//添加应用
$('#id_btn_add').on('click', function() {
    parent.openLayer('添加应用', './app_opt.html?opt=add');
});

//搜索应用
$('#id_btn_search').on('click', function() {
    reloadTable($('#id_input_app').val());
});

//刷新列表
$('#id_btn_refresh').on('click', function() {
    reloadTable('');
});

function reloadTable(name) {
    table.reload('id_layui_table_app', { 
        page: {curr: 1},
        where: {
            likeName: name
        }
    }, 'data');
}

function deleteApp(appId) {
    parent.layer.confirm('是否删除该应用？删除后全部配置将失效！', {title: '提示'}, 
        function(index) {
            $.ajax({
                type: "DELETE",
                url: '/app/' + appId,
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