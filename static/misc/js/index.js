var $ = layui.jquery;
var element = layui.element;
var mainLayout = $('#id_main_layout');

//初始化菜单
$.ajax({
	type: "GET",
	url: '/user/profile',
	contentType: "application/json",
	dataType: "json",
	success: function(res) {
		$('#id_menu_user').html(res.data.name);
	},
	error: function(e) {
		window.location.href = '/static/html/login.html';
	}
});

//监听导航点击
element.on('nav(leftNav)', function(elem) {
	openTab(elem.attr('data-id'), elem.attr('data-text'), elem.attr('data-url'));
});

//监听导航点击
element.on('nav(rightNav)', function(elem) {
	openTab(elem.attr('data-id'), elem.attr('data-text'), elem.attr('data-url'));
});

//菜单隐藏显示
$('#id_menu_hide').on('click', function() {
	if(!mainLayout.hasClass('hide-side')) {
		mainLayout.addClass('hide-side');
	} else {
		mainLayout.removeClass('hide-side');
	}
});

//登出
$('#id_menu_logout').on('click', function() {
	$.ajax({
		type: 'POST',
		url: '/user/logout',
		contentType: "application/json",
		dataType: "json",
		success: function(res) {
			if (res.success == true) {
				parent.layer.msg('登出成功！');
			} else {
				parent.layer.msg('登出失败！');
			}
			window.location.href = '/static/html/login.html';
		},
		error: function(e) {
			parent.layer.msg('登出失败！');
		}
	});
});

//显示TAB
function openTab(id, text, url) {
	if (!url) {
		return;
	}
	var isActive = $('.main-layout-tab .layui-tab-title').find("li[lay-id=" + id + "]");
	if (isActive.length > 0) {
		element.tabChange('tab', id);
	} else {
		element.tabAdd('tab', {
			title: text,
			content: '<iframe src="' + url + '" name="iframe_' + id + '" class="iframe" framborder="0" data-id="' + id + '" scrolling="auto" width="100%" height="100%"></iframe>',
			id: id
		});
		element.tabChange('tab', id);
	}
	mainLayout.removeClass('hide-side');
}

function openLayer(title, url) {
	layer.open({
		type: 2, 
		title: title,
		area: ['50%', '50%'],
		content: url
	}); 
}

function refreshApp() {
	var iframe = window['iframe_app'];
	if (iframe != null) {
		iframe.reloadTable('');
	}
}

function refreshUser() {
	var iframe = window['iframe_user'];
	if (iframe != null) {
		iframe.reloadTable('');
	}
}

function refreshConfig(appId) {
	var iframe = window['iframe_config_' + appId];
	if (iframe != null) {
		iframe.reloadTable('');
	}
}