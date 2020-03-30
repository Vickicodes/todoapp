// cross off todo item
$('ul').on('click', '.todoItem', function() {
	$(this).toggleClass('completed');
});
// click on x to delete todo
$('ul').on('click', '.deleteIcon', function(event) {
	$(this).parent().fadeOut(500, function() {
		$(this).remove();
	});
	event.stopPropagation();
});
// add a to-do item
$("input[type='text']").keypress(function(event) {
	if (event.which === 13) {
		var todoText = $(this).val();
		$(this).val('');
		$('.todoList').append("<li><span><i class='fas fa-trash-alt'></i></span>" + todoText + '</li>');
	}
});
$('.fa-plus').click(function() {
	$('#todoform').first().fadeToggle();
});
