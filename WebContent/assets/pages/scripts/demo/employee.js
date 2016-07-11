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

/*global $, App, moment, jQuery, bootbox, employeeEdit */

var employee = function() {

	// 全局属性参数
	var configMap = {
		path : '',
		dataUrl : '/demo/user',
		datatablesLanguageFile : 'assets/global/plugins/datatables/chinese.json',
		employeeGrid : null,
		editPageUrl : 'demo/edit.jsp',
		viewPageUrl : '/demo/view.jsp',
		editBtn_html : '<a href="javascript:;" class="btn btn-xs default" data-type="edit" data-toggle="tooltip" title="编辑用户信息"><i class="fa fa-edit"></i></a>',
		deleteBtn_html : '<a href="javascript:;" class="btn btn-xs default" data-type="del" data-toggle="tooltip" title="删除用户"><i class="fa fa-times"></i></a>',
		viewBtn_html : '<a href="javascript:;" class="btn btn-xs default" data-type="view" data-toggle="tooltip" title="设置角色"><i class="fa fa-search"></i></a>'
	};

	// 全局Dom
	var jqueryMap = {
		$blockTarget : null,
		$employeeDialog : null
	};

	// var setJqueryMap = function () {
	// jqueryMap.$blockTarget = $('body');
	// };
	//  刷新数据
	var initEmployeeData = function() {
		App.blockUI({
			target : jqueryMap.$blockTarget,
			boxed : true,
			message : '正在加载数据，请稍候...'
		});

		$.ajax({
			url : "xinhaiuser/getAllUsers1.action",
			dataType : 'JSON',
			type : 'GET',
			success : function(datas) {

				configMap.employeeGrid.clear().draw();
				App.unblockUI(jqueryMap.$blockTarget);

				if (datas.length > 0) {

					return configMap.employeeGrid.rows.add(datas).draw();
				}
			},
			error : function() {
				return App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	};
	// 打开弹出框(初始化取消和成功方法)
	var openModal = function(title, url, type, id) {

		// 初始化bootbox.dialog的按钮
		var dialogButtons = {
			cancel : {
				label : '关闭',
				className : 'btn-default'
			}
		};

		if (type === 'edit') {
			dialogButtons.success = {
				label : "保存",
				className : "btn-success",
				callback : function() {
					employeeEdit.saveEmployee(
                   //回调函数
					function(result) {
						jqueryMap.$employeeDialog.modal('hide');
						initEmployeeData();

					});

					return false;
				}
			};
		} else if (type === 'view') {
			dialogButtons.success = {
				label : "保存",
				className : "btn-success",
				callback : function() {
					var str = $('[name="to"]').val();

					var list = {
						userid : id,
						roleids : str
					};

					$.ajax({
						url : 'userroles/adduserroles',

						contentType : 'application/json; charset=utf-8',
						// data:querystr,
						type : 'post', // æ°æ®åéæ¹å¼
						dataType : 'json', // æ¥åæ°æ®æ ¼å¼
						// (è¿éæå¾å¤,å¸¸ç¨çæhtml,xml,js,json)
						// contentType:"application/json",
						data : JSON.stringify(list),

					});

					jqueryMap.$employeeDialog.modal('hide');
				}
			};

		}
		
		$.get(url, function(data) {
			// url为请求地址，data为请求数据的列表，callback为请求成功后的回调函数，该函数接受两个参数，第一个为服务器返回的数据，第二个参数为服务器的状态，是可选参数。
			jqueryMap.$employeeDialog = bootbox.dialog({
				title : title,
				message : data,
				buttons : dialogButtons
			});
		});

	};
     //添加角色
	var viewEmployee = function() {
		var el = $(this);
		var rowIndex = configMap.employeeGrid.cell(el.parent()).index().row;
		var id = configMap.employeeGrid.row(rowIndex).data().id;
		openModal("设置角色", "demo/view.jsp?id=" + encodeURI(id), 'view', id);
	};
     //添加用户
	var addEmployee = function() {
		openModal('添加用户信息', configMap.path + configMap.editPageUrl, 'edit');
	};
     //编辑用户
	var editEmployee = function() {
		var el = $(this);

		var rowIndex = configMap.employeeGrid.cell(el.parent()).index().row;
		var id = configMap.employeeGrid.row(rowIndex).data().id;

		openModal('编辑用户信息', configMap.path + configMap.editPageUrl + "?id="
				+ encodeURI(id), 'edit');
	};
     //删除用户
	var delEmployee = function(event, element) {
		App.blockUI({
			target : jqueryMap.$blockTarget,
			boxed : true,
			message : '正在删除数据，请稍候...'
		});

		var rowIndex = configMap.employeeGrid.cell(element.parent()).index().row;
		var id = configMap.employeeGrid.row(rowIndex).data().id;
		$.ajax({
			url : "xinhaiuser/deleteUser/" + id,
			type : 'DELETE',
			success : function(result) {
				App.unblockUI(jqueryMap.$blockTarget);
				if (result) {
					initEmployeeData();
					Messenger().post("删除成功!");
				} else {
					Messenger().post({
						message : "删除成功!",
						type : 'error'
					});
				}
			},
			error : function() {
				App.unblockUI(jqueryMap.$blockTarget);
			}
		});
	};
	    //点击锁定状态
	var btnmarkclick = function(event) {

		// s += theDate.getFullYear()+"-"; // 获取年份。
		// s += (theDate.getMonth() + 1) + "-"; // 获取月份。
		// s += theDate.getDate(); // 获取日。
			
		var el = $(event.target);
		var rowIndex = configMap.employeeGrid.cell(el.parent()).index().row;
		var id = configMap.employeeGrid.row(rowIndex).data().id;
		var remark = id + ',';
		if (el.attr("data-type") == 'unlock') {
			remark += 0;

		} else {

			remark += 1;
		}
		$.ajax({
			url : 'xinhaiuser/changeremark/' + remark,
			dataType : 'JSON',
			type : 'GET',
			success : function(datas) {

			},

		});
		initEmployeeData();

		// var btnmark=$("#btnmark");
		// var btnmarki=$("#btnmark i");
		// alert(btnmarki.attr("class"));
		// if (btnmark.attr("data-type")=='unlock'){
		// btnmark.attr("data-type",'lock');
		// btnmark.removeClass().addClass("btn sbold red");
		// btnmark.text('已锁定');
		// btnmarki.removeClass().addClass("fa fa-lock")
		//			
		//			
		//			
		// }else{
		// btnmark.attr("data-type",'unlock');
		// btnmark.removeClass().addClass("btn sbold green");
		// btnmark.text('已启动 <i class="fa fa-unlock"></i>');
		//			
		// }
		//		
		//		
	}
      //初始化 用户列表
	var initEmployeeGrid = function() {

		configMap.employeeGrid = $('#employee_data')
				.DataTable(
						{
							"sAjaxSource" : "xinhaiuser/getAllUsers",

							'bPaginate' : true,
							"bDestory" : true,
							"bRetrieve" : true,
							"bFilter" : false,
							"bSort" : false,
							"bProcessing" : true,
							"columns" : [
									{
										"data" : "name",
										"bSortable" : false
									},
									{
										"data" : "userAccount"
									},
									{
										"data" : "createDate"
									},
									{
										"data" : "remark",
										"render" : function(data, type, row) {
											if (row.remark == 1) {

												return '<button  data-toggle="remark" class="btn sbold green" data-type="unlock" > 已启用<i class="fa fa-unlock"></i> </button>';
											}

											else
												return '<button  data-toggle="remark" class="btn sbold red" data-type="lock"> 已锁定<i class="fa fa-lock"></i> </button>';

										}
									},
									{
										"render" : function(data, type, row) {

											return configMap.editBtn_html
													+ configMap.deleteBtn_html
													+ configMap.viewBtn_html;
										}
									} ],
							// "aoColumns": [
							// {
							// "mDataProp": "id",
							// // "fnCreatedCell": function (nTd, sData, oData,
							// iRow, iCol) {
							// // $(nTd).html("<input type='checkbox'
							// name='checkList' value='" + sData + "'>");
							// //
							// // }
							// },
							// {"mDataProp": "name"},
							// {"mDataProp": "userAccount"},
							// {"mDataProp": "createDate"},
							// {"mDataProp": "remark"},
							// {
							// "mDataProp": "id",
							// // "fnCreatedCell": function (nTd, sData, oData,
							// iRow, iCol) {
							// // $(nTd).html("<a href='javascript:void(0);' " +
							// // "onclick='_editFun(\"" + oData.id + "\",\"" +
							// oData.name + "\",\"" + oData.job + "\",\"" +
							// oData.note + "\")'>编辑</a>&nbsp;&nbsp;")
							// // .append("<a href='javascript:void(0);'
							// onclick='_deleteFun(" + sData + ")'>删除</a>");
							// // }
							// },
							// ],
							"oLanguage" : {
								sUrl : "assets/global/plugins/datatables/chinese.json",
								"sSearch" : "快速过滤："
							},
							"drawCallback" : function() { // 数据加载完成后执行

								$('[data-toggle="remark"]').off('click').on(
										'click', btnmarkclick);
								// //alert(JSON.stringify(data));
								var tootipContainer = $('[data-toggle="tooltip"]');
								var editContainer = $('[data-type="edit"]');
								var delContainer = $('[data-type="del"]');
								var viewContainer = $('[data-type="view"]');
								//
								if (tootipContainer.length > 0) {
									tootipContainer.tooltip();
								}
								//
								if (editContainer.length > 0) {
									editContainer.off('click').on('click',
											editEmployee);
								}
								//
								if (delContainer.length > 0) {
									delContainer.confirmation({
										"title" : '确定要删除？',
										"btnOkLabel" : '是',
										"btnCancelLabel" : '否',
										"placement" : 'left',
										"onConfirm" : delEmployee
									});
								}
								//
								if (viewContainer.length > 0) {
									viewContainer.off('click').on('click',
											viewEmployee);
								}
							}
						});
	};

	return {
		init : function() {
			$('#btnNew').off('click').on('click', function() {
				addEmployee();
			});

			// setJqueryMap();
			initEmployeeGrid();
			// initEmployeeData();
		}
	// setPath: function (path) {
	// configMap.path = path;
	// }
	};
}();
// @ sourceURL=employee.js
