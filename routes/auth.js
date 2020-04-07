module.exports = function(app, passport) {
	// ======== Register a user ==============
	app.post(
		'/register',
		passport.authenticate('local-signup', {
			successRedirect: '/todolist',
			successFlash: true,
			successMessage: 'you have successfully registered',
			failureRedirect: '/',
			failureMessage: 'username or password is incorrect',
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
			failureMessage: 'username or password is incorrect',
			failureFlash: true
		})
	);
	app.get('/logout', (req, res) => {
		req.session.destroy(function(err) {
			res.redirect('/');
		});
	});
};
