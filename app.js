const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');

//========== Models =====================
const models = require('./models');
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
// =========== load passport strategies & routes ============
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

// ========== Routes ======================

app.get('/', (req, res) => {
	res.render('landing');
});

// ===== get the todo items from the db ====
app.get('/todolist/:id?', async (req, res) => {
	let todolists = [];
	let fullLists = [];

	if (req.user) {
		todolists = await TodoList.findAll({
			where: {
				userId: req.user.id
			},
			include: [
				{
					model: models.todo_list_item,
					as: 'todoListItems'
				}
			]
		});
	}
	if (req.params.id) {
		fullLists = todolists.filter((todoList) => {
			return todoList.id == parseInt(req.params.id);
		});
	} else if (todolists.length > 0) {
		fullLists.push(todolists[0]);
	}
	return res.render('index', { todoLists: todolists, fullLists: fullLists });
});

app.post('/todolist', (req, res) => {
	let newTodo = { name: req.body.name, userId: req.user.id };

	TodoList.create(newTodo)
		.then((todolist) => {
			res.redirect('/todolist/' + todolist.id);
		})
		.catch((err) => {
			console.log(err);
		});
});

app.listen(3000, () => {
	console.log('To Do app on port 3000');
});
