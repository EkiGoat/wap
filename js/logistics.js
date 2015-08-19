$(window).load(function() {
	inputWidth(); //处理输入框长度

	function inputWidth() {
		//输入框的宽度
		var inputWidth = $('.content').width() * 9 / 10;
		$('.itemInput').css("width", inputWidth - 26 + "px");
		$('.verifyIpunt').css("width", inputWidth - 144 + "px");
		$('.leftCode').css("width", inputWidth - $('.rightCode').width() - 38 + "px");
		//处理页面内容不足屏幕高度时拉伸
		var newMarginHight = $(window).height() - $(document.body).height();
		if (newMarginHight > 0) {
			$('.footer').css('margin-top', newMarginHight + 30 + 'px');
		};
	}
})