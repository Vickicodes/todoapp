const bCrypt = require('bcrypt-nodejs');
module.exports = (passport, user) => {
	var User = user;
	var LocalStrategy = require('passport-local').Strategy;

	passport.use(
		'local-signup',
		new LocalStrategy(
			{
				usernameField: 'username',
				passwordField: 'password',
				passReqToCallback: true // allows us to pass back the entire request to the callback
			},
			(req, username, password, done) => {
				const generateHash = (password) => {
					return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
				};
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
						User.create(data).then((newUser, created) => {
							if (!newUser) {
								return done(null, false);
							}
							if (newUser) {
								return done(null, newUser, { message: 'successfully registered' });
							}
						});
					}
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
	//LOCAL SIGNIN
	passport.use(
		'local-signin',
		new LocalStrategy(
			{
				// by default, local strategy uses username and password, we will override with email

				usernameField: 'username',
				passwordField: 'password',
				passReqToCallback: true // allows us to pass back the entire request to the callback
			},
			(req, username, password, done) => {
				const User = user;
				const isValidPassword = (userpass, password) => {
					return bCrypt.compareSync(password, userpass);
				};
				User.findOne({
					where: {
						username: username
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
};
