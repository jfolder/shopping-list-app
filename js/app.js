$(document).ready(function(){

	var counter = 0;
	
	function addInput(){
		var item = $("#item-entry").val();
		var selected_category = $("#selected").data("category");
		if(jQuery.trim(item).length != 0)
		{
			counter++;
			$("#list-items").prepend("<li id=\"item-row\" class=\"group\" data-category=" + selected_category + "><input id=\"check-box" + counter + "\" type=\"checkbox\"><label  class=\"checkbox_label\" for=\"check-box" + counter + "\"></label><span class=\"item_text\">" + item + "</span><div class=\"delete_row\">X</div></li>");
		}
		$("#item-entry").val("");
	}

	function addCategory() {

		var category = $("#item-entry").val();
		/* var category_without_spaces = category.split(" ").join(""); */
		/* change made here */
		var random_number = 1 + Math.floor(Math.random() * 10000);
		if(jQuery.trim(category).length != 0) 
		{	
			$("#categories").prepend("<li class=\"category\" data-category=" + random_number + ">" + category + "</li>");
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

  	$(this).on("click", ".add_as_category", function(){
  		addCategory();
  	});

  	$(this).on("click", ".category", function() {
  		$("#categories").find("#selected").removeAttr("id");
  		$(this).attr("id", "selected");
  		$(".category").css({"background-color":"white"});
  		$(this).css({"background-color":"rgba(156, 202, 109, .5)"});
  		var current_category = $(this).data("category");
  		$("li#item-row").hide();
  		$("#list-items li[data-category='" + current_category + "']").show();
  		$(".all, .pending, .completed").css({"font-weight":"normal"});
  	});

	$(this).on("click", "#widget", function() {
		 $("#categories").slideToggle(); 
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

	$(this).on("dblclick", ".category", function() {
		var current_category = $(this).data("category");
		$("li[data-category='" + current_category + "']").remove();
	});

	$(this).on("click", ".all", function() {
		$("input[id^='check-box']").closest("li").show();
		$(".all").css({"font-weight":"bold"});
		$(":not(li.all)").css({"font-weight":"normal"});
		$(".category").css({"background-color":"white"});
	});

	$(this).on("click", ".completed", function() {
		$("input[id^='check-box']:checked").closest("li").show();
		$("input[id^='check-box']:not(:checked)").closest("li").hide();
		$(".completed").css({"font-weight":"bold"});
		$(":not(li.completed)").css({"font-weight":"normal"});
		$(".category").css({"background-color":"white"});
	});

	$("#status").on("click", ".pending", function() {
		$("input[id^='check-box']:checked").closest("li").hide();
		$("input[id^='check-box']:not(:checked)").closest("li").show();
		$(".pending").css({"font-weight":"bold"});
		$(":not(li.pending)").css({"font-weight":"normal"});
		$(".category").css({"background-color":"white"});
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