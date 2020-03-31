module.exports = function(app, passport) {
	// ======== Register a user ==============
	app.post(
		'/register',
		passport.authenticate('local-signup', {
			successRedirect: '/todolist',
			failureMessage: 'username or password is incorrect'
		})
	);

	// app.post('/register', function(req, res) {
	// 	req.body.username = req.body.username.toLowerCase();
	// 	//const newUser = User.build({ username: req.body.username });
	// 	if (req.body.password === req.body.confirm) {
	// 		// TODO: learn how to replace User.register with something that works
	// 		// or determine if it uses the local strategy or not (or how to make it do so)
	// 		User.register(req.body.username, req.body.password, function(err, user) {
	// 			if (err) {
	// 				req.flash('error', err.message);
	// 			}
	// 		});
	// 	} else {
	// 		req.flash('error', 'Passwords do not match');
	// 	}
	// });
	// =========== Login Routes ======================
	app.post('/login', (req, res) => {
		passport.authenticate('local', {
			successRedirect: '/todolist',
			failureMessage: 'username or password is incorrect',
			failureFlash: true
		});
	});
	app.get('/logout', (req, res) => {
		req.logout();
		req.flash('success', 'Successfully logged out');
		res.redirect('/');
	});
};
