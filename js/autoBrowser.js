//搜索框 清除控制
$(".input input").on("focus", function() {
	if ($(this).val() != "") {
		var inputObj = $(this);
		var closeObj = $(this).siblings(".searchPicRight");
		if (closeObj) {
			var showed = closeObj.attr("showed");
			if (typeof showed == "undefined") {
				showed = "0";
			}
			if (showed != "1") {
				closeObj.show();
				closeObj.attr("showed", "1");
			}
		}
	}
});
$(document).on("input", ".input input", function() {
	var inputObj = $(this);
	var closeObj = $(this).siblings(".searchPicRight");
	if (closeObj) {
		var showed = closeObj.attr("showed");
		if (typeof showed == "undefined") {
			showed = "0";
		}
		if (showed != "1") {
			closeObj.show();
			closeObj.attr("showed", "1");
		}
	}
});
$('.input input').blur(function() {
	var inputObj = $(this);
	var closeObj = $(this).siblings(".searchPicRight");
	if (closeObj) {
		var showed = closeObj.attr("showed");
		var timer = closeObj.data("timer");
		if (typeof showed == "undefined") {
			showed = "1";
		}
		if (showed == "1") {
			if (!timer) {
				timer = setTimeout(function() {
					timer = null;
					closeObj.data("timer", null);
					closeObj.attr("showed", "0");
					closeObj.hide();
				}, 150); //pc端会出现无法清除的现象，需要把时间设大一些
				closeObj.data("timer", timer);
			}
		}
	}
});
$('.input .searchPicRight').on('click', function() {
	//console.log("3");
	var inputObj = $(this).siblings("input");
	var closeObj = $(this);
	inputObj.val("");
	closeObj.attr("showed", "0");
	closeObj.hide();
	inputObj.focus();
});

//4位验正码提示信息
$(".rightCode").on("focus", function() {
	if ($(".rightCode").val() === "") {
		$(".codeGuide").show();
	}
});
$(".rightCode").on("blur input", function() {
	$(".codeGuide").hide();
});

var browser = {
	versions: function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return { //移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

function CalculateGuessLikeWidth(item, marker, img, txt) {
	item = item || ".guessItem";
	marker = marker || ".guessLike-hidden";
	img = img || ".guessItem-img";
	txt = txt || ".guessItem-txt";
	try {
		var guessLikeWidth, guessItemLen;
		function guess(guessWidth, guessLen) {
			$(".swiper-slide").width(guessWidth * guessLen + guessLen * 10);
			$(img).width(guessWidth);
			$(img).height(guessWidth);
			$(img).find("img").css("max-width", guessWidth);
			$(img).find("img").css("max-height", guessWidth);
			$(txt).width(guessWidth - 10);
			$(".swiper-container").height(guessWidth + 82 + 20);
		};

		function resizeBrower() {
			var _width = window.screen.width;
			if (_width <= 860) {
				$(".bodyBlock").css("margin", "0");
			} else {
				$(".bodyBlock").css("margin", "0 20%");
			}
		}
		if (browser.versions.mobile == true) {
			$(".bodyBlock").css("margin", "0");
			guessLikeWidth = $(marker).width() - 20;
			guessItemLen = $(item).length;
			guess(guessLikeWidth, guessItemLen);
		} else {
			resizeBrower();
			$(window).resize(function() {
				resizeBrower();
			});
			guessLikeWidth = 300;
			guessItemLen = $(item).length;
			guess(guessLikeWidth, guessItemLen);
		}
	} catch (e) {}
}
CalculateGuessLikeWidth();