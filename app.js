const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');

//========== Models =====================
const models = require('./models');
const User = models.user;
const TodoList = models.todo_list;
// =======  ==================
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
// =========== load passport strategies ============
require('./config/passport.js')(passport, models.user);
const authRoute = require('./routes/auth.js')(app, passport);
// ===== Pass User and Flash message to each template ==========
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.path = req.path;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

// ========== Routes ======================

app.get('/', function(req, res) {
	res.redirect('/todolist');
});

// ===== get the todo items from the db ====
app.get('/todolist', async (req, res) => {
	const todolists = await TodoList.findAll({
		include: [
			{
				model: models.todo_list_item,
				as: 'todoListItems'
			}
		]
	});
	return res.render('index', { todoLists: todolists });
});

app.post('/todolist', function(req, res) {
	let todo = req.body.todo;
	let newTodo = { item: todo };
	TodoList.create(newTodo, function(err, item) {
		if (err) {
			console.log(err);
		} else {
			console.log('we just saved ' + item);
			res.redirect('/todolist');
		}
	});
});

app.listen(3000, function() {
	console.log('To Do app on port 3000');
});
