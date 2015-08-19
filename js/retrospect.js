$(window).load(function() {
	inputWidth(); //处理输入框长度

	//处理一屏显示
	var nowHight = $('.banner').height() + $('.navItems').height() + $('.content').height();
	var changeHight = $(window).height() - nowHight;
	var addHight = changeHight - 72; //32+24+16
	var marginNav,
		marginContent,
		marginSearch;

	if (addHight < 0) {
		var subtractionHight = $(window).height() - 228; //228=16+18+18+18+70+88
		var bannerHight = $('.banner').height() - (subtractionHight);
		var imgHight = -(bannerHight) / 2;
		$('.banner').css("height", subtractionHight + "px");
		$('.banner img').css("margin-top", imgHight + "px");
		marginNav = 18;
		marginContent = 18;
		marginSearch = 18;
	} else {

		var addHightMin = (changeHight + 8) / 5;
		marginNav = addHightMin * 2;
		marginContent = addHightMin * 2;
		marginSearch = addHightMin;
	};
	
	$('.navItems').css("margin-bottom", marginNav + "px");
	$('.content').css("margin-top", marginContent + "px");
	$('.search').css("margin-top", marginSearch + "px");
	

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