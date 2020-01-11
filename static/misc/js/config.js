var $ = layui.jquery;
var table = layui.table;
var form = layui.form;
var appId = getQueryVariable('appId');

table.render({
    url: '/config/' + appId,
    elem: '#id_table_config',
    page: {
        layout: ['limit', 'count', 'prev', 'page', 'next', 'skip'] 
    },
    cols: [[
        {field: '', title: '序号', width: 60, align: 'center', templet: function(d) {
            return (d.LAY_INDEX);
        }},
        {field: 'key', title: 'Key', align: 'center'},
        {field: 'value', title: 'Value', align: 'center'},
        {field: 'desc', title: '描述', align: 'center'},
        {field: 'createTime', title: '创建时间', align: 'center'},
        {field: 'createBy', title: '创建者', align: 'center'},
        {field: 'updateTime', title: '更新时间', align: 'center'},
        {field: 'updateBy', title: '更新者', align: 'center'},
        {field: 'status', title: '状态', templet: '#id_table_field_status', align: 'center'},
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
    id: 'id_layui_table_config_' + appId
});

//监听行工具事件
table.on('tool(filter_table_config)', function(obj){
    if (obj.event == 'detail') {
        parent.openLayer('配置详情', './config_opt.html?opt=detail&appId=' + appId + '&configId=' + obj.data.configId);
    } else if (obj.event == 'edit') {
        parent.openLayer('修改配置', './config_opt.html?opt=edit&appId=' + appId + '&configId=' + obj.data.configId);
    } else if (obj.event == 'del') {
        deleteConfig(obj.data.configId);
    }
});

//添加配置
$('#id_btn_add').on('click', function() {
    parent.openLayer('添加配置', './config_opt.html?opt=add&appId=' + appId);
});

//刷新列表
$('#id_btn_refresh').on('click', function() {
    reloadTable('');
});

//搜索配置
$('#id_btn_search').on('click', function() {
    reloadTable($('#id_input_key').val());
});

//发布配置
$('#id_btn_release').on('click', function() {
    $.ajax({
        type: "POST",
        url: '/config/' + appId + '/release',
        success: function(res) {
            if (res.success == true) {
                parent.layer.msg('发布成功！');
                reloadTable('');
            } else {
                parent.layer.msg('发布失败！');
            }
        },
        error: function(e) {
            parent.layer.msg('发布失败！');
        }
    });
});

function reloadTable(likeKey) {
    table.reload('id_layui_table_config_' + appId, { 
        page: {curr: 1},
        where: {
            likeKey: likeKey
        }
    }, 'data');
}

function deleteConfig(configId) {
    parent.layer.confirm('是否删除该配置？', {title: '提示'}, 
        function(index) {
            $.ajax({
                type: "DELETE",
                url: '/config/' + appId + '/' + configId,
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