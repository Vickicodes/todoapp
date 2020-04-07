module.exports = function(app, passport) {
	// ======== Register a user ==============
	app.post(
		'/register',
		passport.authenticate('local-signup', {
			successRedirect: '/todolist',
			successFlash: true,
			successMessage: 'You have successfully registered',
			failureRedirect: '/',
			failureMessage: 'Username or password is incorrect',
			failureFlash: true
		})
	);

	// =========== Login Routes ======================
	app.post(
		'/login',
		passport.authenticate('local-signin', {
			successRedirect: '/todolist',
			successFlash: true,
			failureRedirect: '/',
			failureMessage: 'Username or password is incorrect',
			failureFlash: true
		})
	);
	app.get('/logout', (req, res) => {
		req.session.destroy(function(err) {
			res.redirect('/');
		});
	});
};
