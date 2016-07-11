<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->

<!-- BEGIN HEAD -->
<head>
	<meta charset="utf-8"/>
	<title></title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta content="width=device-width, initial-scale=1" name="viewport"/>
	<meta content="" name="description"/>
	<meta content="" name="author"/>
	<!-- BEGIN GLOBAL MANDATORY STYLES -->
	<link href="assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
	<link href="assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
	<link href="assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css"/>
	<link href="assets/global/plugins/metisMenu/metisMenu.min.css" rel="stylesheet" type="text/css"/>
	<link href="assets/global/css/pickList.css" rel="stylesheet" type="text/css"/>
	<!-- END GLOBAL MANDATORY STYLES -->

	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<link href="assets/global/plugins/datatables/datatables.min.css" rel="stylesheet" type="text/css"/>
	<link href="assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" rel="stylesheet"
		  type="text/css"/>
	<link href="assets/global/plugins/icheck/skins/all.css" rel="stylesheet" type="text/css"/>
	<link href="assets/global/plugins/select2/css/select2.min.css" rel="stylesheet" type="text/css"/>
	<link href="assets/global/plugins/select2/css/select2-bootstrap.min.css" rel="stylesheet" type="text/css"/>
	<link href="assets/global/plugins/messenger/css/messenger.css" rel="stylesheet">
	<link href="assets/global/plugins/messenger/css/messenger-theme-air.css" rel="stylesheet">
	<!-- END PAGE LEVEL PLUGINS -->
	<link href="assets/global/css/sb-admin-2.css" rel="stylesheet" type="text/css"/>
	<link href="assets/global/css/components.css" rel="stylesheet" type="text/css"/>
	<link href="assets/global/css/plugins.css" rel="stylesheet" type="text/css"/>
</head>
<!-- END HEAD -->
<body>
<div id="wrapper">
	<!-- Navigation -->
	<div class="navbar navbar-default navbar-static-top navbar-fixed-top" role="navigation" style="margin-bottom: 0">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="index.html">青岛市供热系统</a>
		</div>
		<!-- /.navbar-header -->
	
		<ul class="nav navbar-top-links navbar-right">
			<li class="dropdown">
				<a class="dropdown-toggle" data-toggle="dropdown" href="#">
					<i class="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i>
				</a>
				<ul class="dropdown-menu dropdown-user">
					<li><a href="#"><i class="fa fa-user fa-fw"></i> User Profile</a>
					</li>
					<li><a href="#"><i class="fa fa-gear fa-fw"></i> Settings</a>
					</li>
					<li class="divider"></li>
					<li><a href="login.html"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
					</li>
				</ul>
				<!-- /.dropdown-user -->
			</li>
			<!-- /.dropdown -->
		</ul>
		<!-- /.navbar-top-links -->

		<!-- /.navbar-static-side -->
	</div>

	<div class="navbar-default sidebar" role="navigation">
		<div class="sidebar-nav navbar-collapse collapse">
			<ul class="nav" id="side-menu">
				<li>
					<a href="index.html" class="ajaxify"><i class="fa fa-dashboard fa-fw"></i>
						Dashboard</a>
				</li>
				<li>
					<a href="#"><i class="fa fa-bar-chart-o fa-fw"></i> 系统管理<span class="fa arrow"></span></a>
					<ul class="nav nav-second-level">
						<li>
							<a href="demo/employee.jsp" class="ajaxify" data-code="employee1">用户管理</a>
						</li>
						<li>
							<a href="aaa.html" class="ajaxify" data-code="employee2">登陆日志管理</a>
						</li>
						<li>
							<a href="aaa.html" class="ajaxify" data-code="employee3">菜单管理</a>
						</li>
						
					</ul>
					<!-- /.nav-second-level -->
				</li>
			</ul>
		</div>
		<!-- /.sidebar-collapse -->
	</div>
	<div id="page-wrapper" class="page-content-body">
	</div>
	<!-- /#page-wrapper -->

</div>
<!-- /#wrapper -->

<!--[if lt IE 9]>
<script src="assets/global/plugins/respond.min.js"></script>
<script src="assets/global/plugins/excanvas.min.js"></script>
<![endif]-->
<!-- BEGIN CORE PLUGINS -->
<script src="assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/bootstrap-treeview.js"></script>       
<script src="assets/global/plugins/multiselect.min.js"></script>  
<script src="assets/global/plugins/prettify.min.js"></script>  
<script src="assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/metisMenu/metisMenu.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/lodash.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
<!-- END CORE PLUGINS -->

<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="assets/global/plugins/datatables/datatables.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/moment-with-locales.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min.js"
		type="text/javascript"></script>
<script src="assets/global/plugins/icheck/icheck.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/select2/js/select2.full.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/select2/js/i18n/zh-CN.js" type="text/javascript"></script>
<script src="assets/global/plugins/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/jquery-validation/js/additional-methods.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/jquery-validation/js/localization/messages_zh.min.js"
		type="text/javascript"></script>
<script src="assets/global/plugins/bootstrap-confirmation/bootstrap-confirmation.min.js"
		type="text/javascript"></script>
<script src="assets/global/plugins/bootbox/bootbox.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/messenger/js/messenger.min.js"></script>
<script src="assets/global/plugins/messenger/js/messenger-theme-future.js"></script>
<script src="assets/global/plugins/bootstrap-tabdrop.js"></script>
<!-- END PAGE LEVEL PLUGINS -->

<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="assets/global/scripts/app.js" type="text/javascript"></script>
<script type="text/javascript">
	jQuery(document).ready(function () {
		//设置资源路径
		
		App.setAssetsPath("<%=request.getContextPath() %>/assets/");
		$('#side-menu').metisMenu();
		App.initSlimScroll($('.sidebar-nav'));
	});

</script>
<!-- END PAGE LEVEL SCRIPTS -->
</body>
</html>
