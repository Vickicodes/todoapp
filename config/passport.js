const bCrypt = require('bcrypt-nodejs');

const generateHash = (password) => {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

const isValidPassword = (userpass, password) => {
	return bCrypt.compareSync(password, userpass);
};

module.exports = (passport, user) => {
	var User = user;
	var LocalStrategy = require('passport-local').Strategy;

	passport.use(
		'local-signup',
		new LocalStrategy(
			{
				usernameField: 'username',
				passwordField: 'password',
				passReqToCallback: true
			},
			(req, username, password, done) => {
				username = username.toLowerCase();

				User.findOne({
					where: {
						username: username
					}
				}).then((user) => {
					if (user) {
						return done(null, false, {
							message: 'That username is already taken'
						});
					} else {
						const userPassword = generateHash(password);
						const data = {
							username: username,
							password: userPassword
						};

						User.create(data).then((newUser) => {
							if (!newUser) {
								return done(null, false);
							}

							return done(null, newUser, { message: 'successfully registered' });
						});
					}
				});
			}
		)
	);

	//LOCAL SIGNIN
	passport.use(
		'local-signin',
		new LocalStrategy(
			{
				usernameField: 'username',
				passwordField: 'password',
				passReqToCallback: true
			},
			(req, username, password, done) => {
				const User = user;

				User.findOne({
					where: {
						username: username.toLowerCase()
					}
				})
					.then((user) => {
						if (!user || !isValidPassword(user.password, password)) {
							return done(null, false, {
								message: 'username or password is incorrect'
							});
						}
						const userinfo = user.get();

						return done(null, userinfo);
					})
					.catch((err) => {
						console.log('Error:', err);
						return done(null, false, {
							message: 'Something went wrong with your Signin'
						});
					});
			}
		)
	);
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	passport.deserializeUser((id, done) => {
		User.findByPk(id).then((user) => {
			if (user) {
				done(null, user.get());
			} else {
				done(user.errors, null);
			}
		});
	});
};
