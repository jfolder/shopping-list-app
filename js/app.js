$(document).ready(function(){

	var counter = 0;
	function addInput(){
		var item = $("#item-entry").val();
			if(jQuery.trim(item).length != 0)
			{
				counter++;
				$("#list-items").prepend("<li id=\"item-row\" class=\"group\"><input id=\"check-box" + counter + "\" type=\"checkbox\"><label  class=\"checkbox_label\" for=\"check-box" + counter + "\"></label><span class=\"item_text\">" + item + "</span><div class=\"delete_row\">X</div></li>");
			}
			$("#item-entry").val("");
	}

	$("#list-items").sortable();
	
	$(this).on("click", "#plus-sign", function() {
		addInput();
	});

	$(this).on("keyup", "#item-entry", function(event)
	{   
  		if ( event.which == 13 ) 
  		{
   			addInput();
		}
  	});

	$(this).on("click", "#widget", function() {
		$("#optional-input").slideToggle();
	});

	$(this).on("click", ".checkbox_label", function() {
		if(!($(this).prev().is(":checked")))
		{
			$(this).next().wrap("<strike></strike>");
		}
		else
		{
			$(this).next().children(".item_text").unwrap();
		}
	});

	$(this).on("click", ".all", function() {
		$("input[id^='check-box']").closest("li").show();
		$(".all").css({"font-weight":"bold"});
		$(":not(li.all)").css({"font-weight":"normal"});
	});

	$(this).on("click", ".completed", function() {
		$("input[id^='check-box']:checked").closest("li").show();
		$("input[id^='check-box']:not(:checked)").closest("li").hide();
		$(".completed").css({"font-weight":"bold"});
		$(":not(li.completed)").css({"font-weight":"normal"});
	});

	$("#optional-input").on("click", ".pending", function() {
		$("input[id^='check-box']:checked").closest("li").hide();
		$("input[id^='check-box']:not(:checked)").closest("li").show();
		$(".pending").css({"font-weight":"bold"});
		$(":not(li.pending)").css({"font-weight":"normal"});
	});

	$(this).on("click", ".delete_row", function() {
		$(this).closest("li").remove();
	});

	$(this).on("click", "#show-instructions", function() {
		$("#show-instructions").hide();
		$("#hide-instructions").show();
		$("#instructions").slideToggle();
	});

	$(this).on("click", "#hide-instructions", function() {
		$("#show-instructions").show();
		$("#hide-instructions").hide();
		$("#instructions").slideToggle();
	});

});