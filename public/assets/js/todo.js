// cross off todo item
$('ul.todoList').on('click', '.todoItem', function() {
	$(this).toggleClass('completed');
	const itemId = $(this).attr('data-id');

	$.ajax({
		url: '/item/' + itemId + '/toggle',
		method: 'PUT'
	});
});

$('.fa-plus').click(function() {
	$('#todoform').first().fadeToggle();
});

$('#registerForm').on('submit', function() {
	let username = $('#registerForm input[name="username"]').val();
	let password = $('#registerForm input[name="password"]').val();
	let confirm = $('#registerForm input[name="confirm"]').val();
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
