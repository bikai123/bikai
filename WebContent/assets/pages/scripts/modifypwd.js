var modifyPwd = function () {
	var configMap = {
		dataUrl: '/user/users/modifypwd'
	};
	var jqueryMap = {
		$pwdForm: null
	};

	return {
		init: function () {
			jqueryMap.$pwdForm = $('#pwdForm');
			jqueryMap.$pwdForm.validate({
				errorElement: 'span',
				errorClass: 'help-block help-block-error',
				focusInvalid: false,
				ignore: "",
				rules: {
					originUserPwd: {
						required: true
					},
					newUserPwd: {
						required: true,
						minlength: 6
					},
					rePwd: {
						required: true,
						equalTo: '#newUserPwd'
					}
				},
				messages: { // 自定义显示消息
					rePwd: {
						equalTo: '两次输入的密码不一致！'
					}
				},
				errorPlacement: function (error, element) { // 为每种input设置错误输出位置
					if (element.parent(".input-group").size() > 0) {
						error.insertAfter(element.parent(".input-group"));
					} else {
						error.insertAfter(element);
					}
				},
				highlight: function (element) { // 高亮显示控件form-group和has-error都是样式类
					$(element)
						.closest('.form-group').addClass('has-error');
				},
				unhighlight: function (element) { // 取消高亮显示
					$(element)
						.closest('.form-group').removeClass('has-error');
				},
				success: function (label) {
					label
						.closest('.form-group').removeClass('has-error');
					label.remove();
				}
			});
		},
		modify: function (callback) {
			if (jqueryMap.$pwdForm.valid()) {
				var modifyData = {
					origin: hex_md5($('#originUserPwd').val()),
					newPwd: hex_md5($('#newUserPwd').val())
				};

				var blockTarget = jqueryMap.$pwdForm.closest(".modal-content");
				App.blockUI({
					target: blockTarget,
					boxed: true,
					message: '正在修改密码...'
				});

				$.ajax({
					url: configMap.dataUrl,
					type: 'PUT',
					contentType: 'application/json; charset=utf-8',
					data: JSON.stringify(modifyData),
					success: function (result) {
						App.unblockUI(blockTarget);
						if (result.errmsg) {
							callback(false);
							App.alert({
								container: jqueryMap.$pwdForm.closest(".modal-body"),
								place: 'prepend',
								type: 'danger',
								message: result.errmsg,
								icon: 'fa fa-warning'
							});
						}
						else {
							callback(true);
						}
					},
					error: function () {
						App.unblockUI(blockTarget);
						App.alert({
							container: jqueryMap.$pwdForm.closest(".modal-body"),
							place: 'prepend',
							type: 'danger',
							message: '保存失败！',
							icon: 'fa fa-warning'
						});
						callback(false);
					}
				});
			}
			else {
				callback(false);
			}
		}
	}
}();
$(function () {
	modifyPwd.init();
});
//@ sourceURL=modifypwd.js