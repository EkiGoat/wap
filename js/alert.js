$(document).ready(function(e) {
	$(document).on("click", ".alert-button", function() {
		$(".alert").remove();
		$(".alert-bg").remove();
	});

	$(document).on("click", ".alert-bg", function() {
		$(".alert").remove();
		$(".alert-bg").remove();
	});
});

function WapAlert(message,fun) {
	var html = '<div class="alert alertBlue"><div class="alert-txt">' + message + '</div><div class="alert-button">确定</div></div><div class="alert-bg"></div>';
	$("body").append(html);
}

