

// Inject a new div into the DOM, and fill it with the code from
// the original div to display.

$('.js-inject-code').each(function(i,obj) {
	var htmlstring = $(this).html();
	var escaped = $("<div>").text(htmlstring).html();
  console.error(escaped.trim());
	$(this).append("<pre><code>" + escaped.trim() + "</code></pre>");
});
