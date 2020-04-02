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
		let todoText = $(this).val();
		$(this).val('');
		$('.todoList').append("<li><span><i class='fas fa-trash-alt'></i></span>" + todoText + '</li>');
	}
});
$('.fa-plus').click(function() {
	$('#todoform').first().fadeToggle();
});

$('#registerForm').on('submit', function() {
	let username = $('#registerForm input[name="username"').val();
	let password = $('#registerForm input[name="password"').val();
	let confirm = $('#registerForm input[name="confirm"').val();
	let messageElement = $('.passwordError');
	let isValid = true;
	if (password !== confirm) {
		messageElement.text('Passwords do not match');
		messageElement.removeClass('d-none');
		isValid = false;
	} else if (!username || !password) {
		messageElement.text('Username and password must be provided');
		messageElement.removeClass('d-none');
		isValid = false;
	} else {
		messageElement.addClass('d-none');
	}
	return isValid;
});
