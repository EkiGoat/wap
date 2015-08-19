var CardControlInit = function () {

    var card_img_width = function (card_item_content) {
        $(card_item_content).find("img").each(function () {
            var t = $(this);
            $(t)[0].onload = function () {
                var theWidth = $(t).width();
                var windowWidth = $(".bodyBlock").width();
                if (theWidth > windowWidth) {
                    $(t).css("width", "100%");
                    $(t).attr("height", "");
                }
            }
            var theWidth = $(t).width();
            var windowWidth = $(".bodyBlock").width();
            if (theWidth > windowWidth) {
                $(t).css("width", "100%");
                $(t).attr("height", "");
            }
        })
    }

    //点击卡片标题展开或收起卡片
    $(".card_item-title").click(function () {
        var theDiv = $(this);
        var content = $(this).siblings(".card_item-content");
        var sign = $(this).siblings(".card_item-content").attr("data-sign");
        var card_itemScrollTop = 0;
        var card_itemHeight = 0;
        $(".card_item").each(function (index, element) {
            var sign1 = $(this).find(".card_item-content").attr("data-sign");
            if (sign1 == 1) {
                card_itemHeight = $(this).height();
            }
        });
        if (sign != 1) {
            $(".card_item-title").siblings(".card_item-content").hide();
            $(content).stop(true, true).slideDown(500);
            $(".card_item-content").attr("data-sign", "0");
            $(content).attr("data-sign", "1");
            $(".card_item-title").addClass("card_item-title-arrow");
            $(".card_item-title").removeClass("card_item-title-arrowUp");
            $(theDiv).removeClass("card_item-title-arrow");
            $(theDiv).addClass("card_item-title-arrowUp");
            card_img_width(content);
        } else {
            $(".card_item-title").siblings(".card_item-content").stop(true, true).slideUp(500);
            $(".card_item-content").attr("data-sign", "0");
            $(".card_item-title").addClass("card_item-title-arrow");
            $(theDiv).removeClass("card_item-title-arrowUp");
        }
        setTimeout(function () {
            card_itemScrollTop = theDiv.offset().top - 50;
            $("html,body").animate({ "scrollTop": card_itemScrollTop }, 500);
        }, 600);

    });

    var shower = false;
    //页面加载后收起卡片
    $(".card_item").each(function (index, element) {
        var card_item_content = $(this).find(".card_item-content");
        if (card_item_content) {
            var sign = $(card_item_content).attr("data-sign");
            if (sign == 1) {
                card_img_width($(card_item_content).show());
                shower = true;
            }
            else {
                $(card_item_content).hide();
            }
        }
    });

    if (!shower) {
        $(".card_item .card_item-content:first").show()
        card_img_width($(".card_item .card_item-content:first"));
        $(".card_item .card_item-content:first").attr("data-sign", "1");
    }

};
