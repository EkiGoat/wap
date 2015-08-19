//防伪查询
$(document).ready(function() {
	var antiFakeState = false;
	$("#antiFakeQuery").click(function() {
		if (!antiFakeState) {
			antiFakeState = true;
			var d = {
				Code: ""
			};

			if ($("#AntiCode").val().length > 0) {
				//普通查询
				d.Code = $("#AntiCode").val();
			} else if ($("#AntiVCode").val().length > 0) {
				//验正码查询
				var left_code = $("#AntiVCode").val();
				var right_code = $("#AntiRightCode").val();
				if (!right_code || right_code.length < 4) {
					WapAlert("请输入4位验正码");
					antiFakeState = false;
					return;
				}
				d.Code = left_code + right_code;
			}

			if (d.Code.length != 20 && d.Code.length != 21 && d.Code.length != 22) {
				WapAlert("请输入正确的防伪码");
				antiFakeState = false;
				return;
			}

			if (!/^\d+$/.test(d.Code)) {
				WapAlert("请输入正确的防伪码");
				antiFakeState = false;
				return;
			}

            if ($("#AntiVerifyPanel").length > 0 && $("#AntiVerifyPanel").attr("need") == "1" && $("#verifyCode").length > 0) {
				var validate = $("#verifyCode").val();
				if (!validate || validate.length < 4) {
					WapAlert("请输入右侧图片中的4位数字");
					antiFakeState = false;
					return;
				}
				d.Validate = validate;
			}

			$.ajax({
				type: "POST",
				url: wap_config.data_service("AntiFakeQuery"),
				cache: false,
				data: {
					data: JSON.stringify(d)
				},
				success: function(r) {
					try {
						if (r && r.success) {
							location.href = wap_config.anti_result(r.result.ResultID);
						} else {
							if (r.result && r.result.validate_code_error == "1") {
								if ($("#AntiVerifyPanel").length > 0 && $("#verifyPic").length > 0) {
								    $("#AntiVerifyPanel").attr("need", "1");
								    $("#verifyPic").attr("src", wap_config.get_validate_code());
								    $("#verifyCode").val("");
								    $("#AntiVerifyPanel").show();
								} else {
									location.href = location.href;
								}
							} else {
								WapAlert(r.message);
							}
						}
					} catch (e) {}
					antiFakeState = false;
				},
				dataType: 'json',
				error: function() {
					WapAlert("网络异常");
					antiFakeState = false;
				}
			});
		} else {
			WapAlert("查询中,请稍后");
		}
	})
});


//积分充值
$(document).ready(function() {
	var integrateCreditState = false;
	$("#integrateCredit").click(function() {
		if (!integrateCreditState) {
			integrateCreditState = true;
			var d = {
				Code: "",
				Mobile: "",
				Guide: "",
				OrgCode: "",
				Referrer: ""
			};

			if ($("#IntegratePanel").length > 0) {
				d.Code = $("#IntegrateCode").val();
			} else if ($("#IntegrateVPanel").length > 0) {
				//验正码查询
				var left_code = $("#IntegrateVCode").val();
				var right_code = $("#IntegrateRightCode").val();
				if (!right_code || right_code.length < 4) {
					WapAlert("请输入4位验正码");
					integrateCreditState = false;
					return;
				}
				d.Code = left_code + right_code;
			}
			if (d.Code.length != 20 && d.Code.length != 21 && d.Code.length != 22) {
				WapAlert("请输入正确的积分码");
				integrateCreditState = false;
				return;
			}

			if (!/^\d+$/.test(d.Code)) {
				WapAlert("请输入正确的积分码");
				integrateCreditState = false;
				return;
			}

			d.Mobile = $("#Mobile").val();

			if (!/^1[3|4|5|6|7|8]\d{9}$/.test(d.Mobile)) {
				WapAlert("您的手机号码不正确，请重新输入");
				integrateCreditState = false;
				return;
			}

			d.Guide = $("#Guide").val();
			d.OrgCode = $("#OrgCode").val();
			d.Referrer = $("#Referrer").val();
			if (d.Referrer && d.Referrer.length > 0 && !/^1[3|4|5|6|7|8]\d{9}$/.test(d.Referrer)) {
				WapAlert("推荐人的手机号码不正确，请重新输入");
				integrateCreditState = false;
				return;
			}

			$.ajax({
				type: "POST",
				url: wap_config.data_service("IntegrateCredit"),
				cache: false,
				data: {
					data: JSON.stringify(d)
				},
				success: function(r) {
					try {
						if (r && r.success) {
							d.result = {
								CreditResult: {}
							};
							d.result.CreditResult.Registered = r.result.CreditResult.Registered
							d.result.CreditResult.LoginName = r.result.CreditResult.LoginName;
							d.result.CreditResult.Password = r.result.CreditResult.Password;
							FormSubmit("IntegrateCreditSuccess.aspx", d);
						} else {
							if (r.result && r.result.CreditResult && r.result.CreditResult.Registered == "1") {
								var corpName = (r.result.CorpName || "");
								var loginName = (r.result.CreditResult.LoginName || "");
								var password = (r.result.CreditResult.Password || "");
								WapAlert("您已注册为" + corpName + "会员!帐号:" + loginName + " , 密码:" + password + " . <br/> 但积分失败:" + r.message);
							} else {
								WapAlert("积分失败:" + r.message);
							}
						}
					} catch (e) {}
					integrateCreditState = false;
				},
				dataType: 'json',
				error: function() {
					WapAlert("网络异常");
					integrateCreditState = false;
				}
			});
		} else {
			WapAlert("充值中,请稍后");
		}
	});
});


//积分查询
 $(document).ready(function() {
	var userLoginState = false;
	$("#userLogin").click(function() {
		if (!userLoginState) {
			userLoginState = true;
			var d = {
				LoginName: "",
				Password: ""
			};

            d.LoginName = $("#jifen_LoginName").val();
            d.Password = $("#jifen_Password").val();

			if (!d.LoginName || d.LoginName.length < 1) {
				WapAlert("请输入您的手机号");
				userLoginState = false;
				return;
			}

			if (!/^1[3|4|5|6|7|8]\d{9}$/.test(d.LoginName)) {
				WapAlert("您的手机号不正确，请重新输入");
				userLoginState = false;
				return;
			}

			if (!d.Password || d.Password.length < 1) {
				WapAlert("请输入密码");
				userLoginState = false;
				return;
			}

			$.ajax({
				type: "POST",
				url: wap_config.data_service("CustomerLogin"),
				cache: false,
				data: {
					data: JSON.stringify(d)
				},
				success: function(r) {
					try {
						if (r && r.success) {
						    location.href = "CorpCustomerIntegrate.aspx?CorpID=" + wap_config.corp_id + "&Mobile=" + d.LoginName;
						} else {
							WapAlert(r.message);
						}
					} catch (e) {}
					userLoginState = false;
				},
				dataType: 'json',
				error: function() {
					WapAlert("网络异常");
					userLoginState = false;
				}
			});
		} else {
			WapAlert("登录中，请稍后");
		}
	});

	$("#LoginedPanel #currentUser").click(function() {
		location.href = "CustomerAllIntegrate.aspx";
	});

	$("#LoginedPanel #changeUser").click(function() {
		$("#LoginPanel").show();
		$("#LoginedPanel").hide();
	})
});    


//物流查询
$(document).ready(function() {
	var logisticsQueryState = false;
	$("#logisticsQuery").click(function() {
		if (!logisticsQueryState) {
			logisticsQueryState = true;
			var d = {
				CorpID: "",
				Code: "",
				LoginName: "",
				Password: ""
			};

			d.LoginName = $("#LoginName").val();
			d.Password = $("#Password").val();
			d.Code = $("#LogisticsCode").val();

			var logined = $("#IsLogined").val() == "1";

			if (!logined) {
				if (d.LoginName.length < 1) {
					logisticsQueryState = false;
					WapAlert("请输入用户名");
					return;
				}
				if (d.Password.length < 1) {
					logisticsQueryState = false;
					WapAlert("请输入密码");
					return;
				}
			}

			if (d.Code.length != 16 && d.Code.length != 17 && d.Code.length != 18) {
				logisticsQueryState = false;
				WapAlert("请输入正确的物流码");
				return;
			}

			if (!/^\d+$/.test(d.Code)) {
				WapAlert("请输入正确的物流码");
				logisticsQueryState = false;
				return;
			}

			$.ajax({
				type: "POST",
				url: wap_config.data_service("LogisticsQuery"),
				cache: false,
				data: {
					data: JSON.stringify(d)
				},
				success: function(r) {
					try {
						if (r && r.success) {
							location.href = "LogisticsQueryResult.aspx?code=" + d.Code;
						} else {
							WapAlert(r.message);
						}
					} catch (e) {}
					logisticsQueryState = false;
				},
				dataType: 'json',
				error: function() {
					WapAlert("网络异常");
					logisticsQueryState = false;
				}
			});
		} else {
			WapAlert("正在查询，请稍候");
		}
	});

	$("#LoginName").change(function() {
		$("#IsLogined").val("0");
		$("#PasswordPanel").show();
	});

	if ($("#IsLogined").val() == "1") {
		$("#PasswordPanel").hide();
	}

	var message = $("#MessagePanel") && $("#MessagePanel").val();
	if (message && message.length > 0) {
		WapAlert(message);
	}


});


//溯源查询
$(document).ready(function() {
	var traceQueryState = false;
	$("#traceQuery").click(function() {
		if (!traceQueryState) {
			traceQueryState = true;
			var d = {
				DefinedCorpID: "",
				Code: ""
			};
			d.DefinedCorpID = $("#DefinedCorpID").length > 0 ? $("#DefinedCorpID").val() : "";
			d.Code = $("#TraceCode").val()
			if (d.Code.length != 16 && d.Code.length != 17 && d.Code.length != 18 && d.Code.length != 20 && d.Code.length != 21 && d.Code.length != 22) {
				WapAlert("请输入正确的溯源码");
				traceQueryState = false;
				return;
			}

			if (!/^\d+$/.test(d.Code)) {
				WapAlert("请输入正确的溯源码");
				traceQueryState = false;
				return;
			}

			$.ajax({
				type: "POST",
				url: wap_config.data_service("TraceQuery"),
				cache: false,
				data: {
					data: JSON.stringify(d)
				},
				success: function(r) {
					try {
						if (r && r.success) {
							location.href = "TraceQueryResult.aspx?code=" + d.Code + (d.DefinedCorpID.length > 0 ? "&CorpID=" + d.DefinedCorpID : "");
						} else {
							WapAlert(r.message);
						}
					} catch (e) {}
					traceQueryState = false;
				},
				dataType: 'json',
				error: function() {
					WapAlert("网络异常");
					traceQueryState = false;
				}
			});
		} else {
			WapAlert("正在溯源,请稍后");
		}
	});

	var message = $("#MessagePanel") && $("#MessagePanel").val();
	if (message && message.length > 0) {
		WapAlert(message);
	}
});