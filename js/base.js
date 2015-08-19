function contralNav() { //点击导航栏进行切换
	$('.navItems a').on("click", function() {
		$('.navItems a').removeClass("navCurrent");
		$(this).addClass('navCurrent');
		var index = $('.navItems a').index(this) + 1;
		if (!($('.area' + index).css("display") == "block")) {
			$('.area').hide();
			$('.area' + index).show("slow", function() {
				inputWidth();
			});
		};
	})
}

function inputWidth() {
	//输入框的宽度
	$('.footer').css('margin-top', 30 + 'px');
	var inputWidth = $('.content').width() * 9 / 10;
	$('.itemInput').css("width", inputWidth - 26 + "px");
	$('.verifyIpunt').css("width", inputWidth - 144 + "px");
	$('.leftCode').css("width", inputWidth - $('.rightCode').width() - 48 + "px");
	$('.verifyCode').css("width", inputWidth - $('.verifyBox').width() - 50 + "px");

	//处理页面内容不足屏幕高度时拉伸
	var newMarginHight = $(window).height() - $(document.body).height();
	if (newMarginHight > 0) {
		$('.footer').css('margin-top', newMarginHight + 30 + 'px');
	};
}

function WapAlert(message,fun) {
	var html = '<div class="alert alertBlue"><div class="alert-txt">' + message + '</div><div class="alert-button">确定</div></div><div class="alert-bg"></div>';
	$("body").append(html);
}


window.onload = function() {
	$(".area1").show();
	inputWidth(); //处理输入框长度
	contralNav();
	
	$(document).on("click", ".alert-button", function() {
		$(".alert").remove();
		$(".alert-bg").remove();
	});

	$(document).on("click", ".alert-bg", function() {
		$(".alert").remove();
		$(".alert-bg").remove();
	});
}