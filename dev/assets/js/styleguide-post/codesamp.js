// Inject a new div into the DOM, and fill it with the code from
// the original div to display.

$('.js-codesamp').each(function(i,obj) {
	var htmlstring = $(this).html();
	var escaped = $("<div>").text(htmlstring).html();
	$(this).append("<pre><code>" + escaped + "</code></pre>");
});


// Enable code highlighting using the awesome HighlightJS package

hljs.initHighlighting();
