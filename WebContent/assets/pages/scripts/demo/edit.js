/*jshint
 strict:true,
 noempty:true,
 noarg:true,
 eqeqeq:true,
 browser:true,
 bitwise:true,
 curly:true,
 undef:true,
 nonew:true,
 forin:true */

/*global $, App, moment, jQuery, bootbox, _ */

var employeeEdit = function() {
	'use strict';
	var org = null;// 获取部门id，text

	// 全局属性参数
	var configMap = {
		path : '',
		dataUrl : 'xinhaiuser/getUser',
		id : ''
	};

	// 全局Dom
	var jqueryMap = {
		$employeeForm : null,
		$employeeDialog:null
	};
    
	var setJqueryMap = function() {
		jqueryMap.$employeeForm = $('#employeeForm');
	};
    //保存用户信息
	var saveEmployee = function(callback) {
		var blockTarget = jqueryMap.$employeeForm.closest(".modal-content");
		App.blockUI({
			target : blockTarget,
			boxed : true,
			message : '正在保存数据...'
		});
		// var interest = [];
		// var selectedInterests = $('input[name="interest"]:checked');
		// _(selectedInterests).forEach(function (value) {
		// interest.push(value.value);
		// });

		var theDate = new Date();
		// 获取日。aa
		var da = new Date(theDate.getFullYear(), theDate.getMonth(), theDate
				.getDate());
		var data = {
			name : $('input[name="name"]').val(),
			userAccount : $('input[name="userAccount"]').val(),
			password : $('input[name="password"]').val(),
			sex : $('input[name="sex"]:checked').val(),
			age : $('input[name="age"]').val(),
			orgid : $('input[name="orgid"]').val(),
			remark : $('input[name="remark"]').val(),
			email : $('input[name="email"]').val(),
			createDate : da
		// birthday: $('input[name="birthday"]').val(),
		// nationality: $('select[name="nationality"]').val(),
		// interest: _.join(interest, ';')
		};

		var url = "xinhaiuser/updateuser";

		var requestType = 'POST';
		if (configMap.id) {
			url = url + "/" + configMap.id;
			requestType = 'PUT';
		} else {

			url = "xinhaiuser/adduser";
		}

		$.ajax({
			url : url,
			type : requestType,
			contentType : 'application/json; charset=utf-8',
			data : JSON.stringify(data),
			success : function() {
				App.unblockUI(blockTarget);
				callback(true);
			},
			error : function() {
				App.unblockUI(blockTarget);
				App.alert({
					container : jqueryMap.$employeeForm.closest(".modal-body"),
					place : 'prepend',
					type : 'danger',
					message : '保存失败！',
					icon : 'fa fa-warning'
				});
				callback(false);
			}
		});
	};
      //获取用户信息
	var getEmployee = function(id) {

		$.ajax({
			url : configMap.path + configMap.dataUrl + '/' + id,
			dataType : 'JSON',
			type : 'GET',
			success : function(data) {
				$('[name="name"]').val(data.name);
				$('[name="userAccount"]').val(data.userAccount);
				$('[name="password"]').val(data.password);
				$('[name="orgid"]').val(data.orgid);
				$('[name="email"]').val(data.email);
				$('[name="remark"]').val(data.remark);
				$('[value="' + data.sex.toLowerCase() + '"]').attr('checked',
						true);
				$('[name="age"]').val(data.age);
				$('.birthday').datepicker('update',
						moment(data.birthday).format('YYYY-MM-DD'));
				$('[name="nationality"]').val(data.nationality).trigger(
						'change');

				_.split(data.interest, ';').forEach(function(value) {
					$('input[value="' + value + '"]').attr('checked', true);
				});

				App.updateUniform();
			},
			error : function() {
				bootbox.alert('获取雇员信息失败！');
			}
		});
	};
    //表单验证
	var employeeValidation = function() {
		jqueryMap.$employeeForm.validate({
			errorElement : 'span',
			errorClass : 'help-block help-block-error',
			focusInvalid : false,
			ignore : "",
			rules : { // rules 中的属性name、code、sex等为Input的name属性值
				name : {
					minlength : 2,
					required : true
				},

				sex : {
					required : true
				},

				age : {
					required : true,
					number : true
				},

				email : {
					required : true,
					email : true
				},
				markpassword : {
					required : true,
					equalTo : "#password"
				}
			},
			messages : { // 自定义显示消息
				sex : {
					required : "请选择性别！"
				},

			},
			errorPlacement : function(error, element) { // 为每种input设置错误输出位置
				if (element.parent(".input-group").size() > 0) {
					error.insertAfter(element.parent(".input-group"));
				} else if (element.attr("data-error-container")) {
					error.appendTo(element.attr("data-error-container"));
				} else if (element.parents('.checkbox-list').size() > 0) {
					error.appendTo(element.parents('.checkbox-list').attr(
							"data-error-container"));
				} else if (element.parents('.radio-list').size() > 0) {
					error.appendTo(element.parents('.radio-list').attr(
							"data-error-container"));
				} else {
					error.insertAfter(element);
				}
			},
			highlight : function(element) { // 高亮显示控件form-group和has-error都是样式类
				$(element).closest('.form-group').addClass('has-error');
			},
			unhighlight : function(element) { // 取消高亮显示
				$(element).closest('.form-group').removeClass('has-error');
			},
			success : function(label) {
				label.closest('.form-group').removeClass('has-error');
			}
		});

		// 当下拉列表值发生变化时重新验证
		$('.nationality', jqueryMap.$employeeForm).change(function() {
			jqueryMap.$employeeForm.validate().element($(this));
		});

		// 日期发生变化时重新验证
		$('.birthday input[name="birthday"]').change(function() {
			jqueryMap.$employeeForm.validate().element($(this));
		});
	};
	    //定义弹出框初始化
	var editopenModal=function(){
		var dialogButtons={
				cancel:{
					label : '关闭',
					className : 'btn-default'
				},
				success:
				{
					label : "保存",
					className : "btn-success",
					callback : function() {
						jqueryMap.$employeeDialog
								.modal('hide');
						org = {
							id : $('#treetext').treeview(
									'getSelected')[0].id,
							text : $('#treetext').treeview(
									'getSelected')[0].text

						};
						$('[name="orgid"]').val(org.id);
						
						
						

						// $('[name="orgid"]').val(data.orgid);

						// employeeEdit.saveEmployee(function
						// (result) {
						// alert(result);
						// if (result) {
						// initEmployeeData();
						// jqueryMap.$employeeDialog.modal('hide');
						// }
						// });
						//
						// return false;
					}
				}
							
		}
		$.get('demo/tree.jsp', function(data) {
			
			jqueryMap.$employeeDialog = bootbox.dialog({
				title : "选择部门",
				message : data,
				buttons : dialogButtons
			});
			
		});
		
		
	}

	return {
		// 初始化
		init : function(id) {

			$("#btn_dep").off('click').on('click', 
				editopenModal
				);

			configMap.id = id;
			setJqueryMap();
			// $('.birthday').datepicker({
			// clearBtn: true,
			// format: 'yyyy-mm-dd',
			// autoclose: true,
			// language: 'zh-CN',
			// pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left")
			// });

			$('input[name="sex"]').uniform();

			$('input[type="checkbox"]').uniform();

			// $('.nationality').select2({
			// placeholder: '选择国籍',
			// width: '100%',
			// language:'zh-CN',
			// allowClear: true
			// });

			// 控件验证
			employeeValidation();
			if (configMap.id) {

				getEmployee(configMap.id);
			} else {

				getEmployee(0);
			}
		},
		// 设置路径
		setPath : function(path) {
			configMap.path = path;
		},
		// 保存雇员信息，参数为回掉函数
		saveEmployee : function(callback) {
			if (jqueryMap.$employeeForm.valid()) {
				saveEmployee(callback);
			} else {
				//(false);
			}
		}
	};
}();
//@ sourceURL=edit.js