var Login = function() {
	//配置参数实例化
	var configMap = {
		path : ''
	};
    //加密
	var getEncryption = function(password, ucode, vcode) {
		var str1 = hex_md5(password);
		var str2 = hex_md5(str1 + ucode);
		var str3 = hex_md5(str2 + vcode.toUpperCase());
		return str3;
	};
    //登陆
	var login = function() {
		var loginForm = $('.login-form');
		if (loginForm.validate().form()) {
			var userName = $('input[name="username"]').val();
			var jCaptchaCode = $('input[name="jCaptchaCode"]').val();
			// var pwd = getEncryption($('input[name="password"]').val(),
			// userName, jCaptchaCode);
			var pwd = $('input[name="password"]').val();
			var postData = {
				name : userName,
				password : pwd

			};

			$.ajax({
				url : configMap.path + '/login1.action?rand=' + jCaptchaCode,
				type : 'POST',
				dataType : 'JSON',
				data : JSON.stringify(postData),
				contentType : 'application/json; charset=utf-8',
				success : function(result) {

					if (result.message == 'success') {

						window.location.href = 'index.jsp';
					} else if (result.message == 'errorname') {
						alert("该用户不存在");
						$('.alert-danger span', loginForm).text(result.msg);
						$('.alert-danger', loginForm).show();
						$('input[name="jCaptchaCode"]').val('');
						$('#checkCode').attr('src',
								'jcaptcha.jpg?d=' + new Date() * 1);
					} else {
						alert("密码错误，请重新输入");

					}
					// if (result=='failed') {
					// $('.alert-danger span', loginForm).text(result.msg);
					// $('.alert-danger', loginForm).show();
					// $('input[name="jCaptchaCode"]').val('');
					// $('#checkCode').attr('src', 'jcaptcha.jpg?d=' + new
					// Date() * 1);
					// }
					// else {
					// window.location.href = 'index.jsp';
					//					
					// }
				},
				error : function(ex, e, ee) {

					$('input[name="jCaptchaCode"]').val('');
					$('#checkCode').attr('src',
							'login/jcaptcha.jpg?d=' + new Date() * 1);
					$('.alert-danger span', loginForm).text('登陆失败！');
					$('.alert-danger', loginForm).show();
				}
			});
		}
	};
    //登录前验证以及绑定事件
	var handleLogin = function() {
		$('.login-form').validate({
			errorElement : 'span',
			errorClass : 'help-block',
			focusInvalid : false,
			rules : {
				username : {
					required : true
				},
				password : {
					required : true
				},
				jCaptchaCode : {
					required : true
				}
			},
			messages : {
				username : {
					required : '请输入用户名'
				},
				password : {
					required : '请输入密码'
				},
				jCaptchaCode : {
					required : '请输入验证码'
				}
			},
			highlight : function(element) {// 出错时触发
				$(element).closest('.form-group').addClass('has-error');
			},
			success : function(label) {// 成功时触发
				label.closest('.form-group').removeClass('has-error');
				label.remove();
			},
			errorPlacement : function(error, element) {// 插入错误时触发
				error.insertAfter(element.closest('.input-icon'));
			}
		});

		$('#btnLogin').off().on('click', function() {
			login();
		});

		$('.login-form input').keypress(function(e) {
			if (e.which == 13) {
				login();
				return false;
			}
		});
	};

	return {
		init : function(path) {

			configMap.path = path;
			handleLogin();
		}
	};

}();
// @ sourceURL=login.js
