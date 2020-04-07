const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const PORT = process.env.PORT || 3000;
const models = require('./models');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//========== passport  ============
app.use(
	session({
		secret: process.env.SESSION_SECRET || 'This is here to help with the set up my app locally',
		resave: true,
		saveUninitialized: true
	})
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// ======== load passport strategies  ============
require('./config/passport.js')(passport, models.user);
require('./routes/auth.js')(app, passport);

// ===== Pass User and Flash message to each template ==========
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.path = req.path;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

// ============= Routes ==================
app.use('/', require('./routes/index.js'));

app.listen(PORT, () => {
	console.log('To Do app running on port', PORT);
});
