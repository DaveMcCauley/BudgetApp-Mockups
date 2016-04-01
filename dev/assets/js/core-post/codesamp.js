
$('.js-codesamp').each(function(i,obj) {
	var htmlstring = $(this).html();
	var escaped = $("<div>").text(htmlstring).html();
	$(this).append("<pre><code>" + escaped + "</code></pre>");
});
hljs.initHighlighting();