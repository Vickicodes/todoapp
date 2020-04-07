const models = require('../models');
const express = require('express');
const router = express.Router();
const TodoList = models.todo_list;
const TodoListItem = models.todo_list_item;

// ========== Routes ======================
router.get('/', (req, res) => {
	res.render('landing');
});
// ===== get the todo lists from the db ====
router.get('/todolist/:id?', async (req, res) => {
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
					as: 'todoListItems',
					order: models.sequelize.literal('"createdAt"', 'asc')
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

// ========= Create a new list ===================
router.post('/todolist', (req, res) => {
	const newTodoList = { name: req.body.name, userId: req.user.id };

	TodoList.create(newTodoList)
		.then((todolist) => {
			res.redirect('/todolist/' + todolist.id);
		})
		.catch((err) => {
			console.log(err);
		});
});
// ======== Create a new todo item ===============
router.post('/todolist/:id/item', (req, res) => {
	const newTodoItem = { description: req.body.todo, todoListId: req.params.id, completed: false };

	TodoListItem.create(newTodoItem)
		.then(() => {
			res.redirect('/todolist/' + req.params.id);
		})
		.catch((err) => {
			console.log(err);
		});
});
// ========== update todo item when completed =========
router.put('/item/:id/toggle', (req, res) => {
	TodoListItem.findByPk(req.params.id).then((item) => {
		if (item.completed) {
			item.completed = false;
		} else {
			item.completed = true;
		}

		item.save();
	});
});
// ========== delete a to do item ===========
router.delete('/todolist/:listId/item/:id', (req, res) => {
	TodoListItem.destroy({
		where: {
			id: req.params.id
		}
	})
		.then(() => {
			res.redirect('/todolist/' + req.params.listId);
		})
		.catch((err) => {
			console.log(err);
		});
});
// ========== delete a todo list ============
router.delete('/todolist/:id/', (req, res) => {
	TodoList.destroy({
		where: {
			id: req.params.id
		}
	})
		.then(() => {
			res.redirect('/todolist');
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;
