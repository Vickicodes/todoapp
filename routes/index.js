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
// ========= Create a new list ===================
router.post('/todolist', (req, res) => {
	let newTodoList = { name: req.body.name, userId: req.user.id };
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
	let newTodoItem = { description: req.body.todo, todoListId: req.params.id, completed: false };

	TodoListItem.create(newTodoItem)
		.then(() => {
			res.redirect('/todolist/' + req.params.id);
		})
		.catch((err) => {
			console.log(err);
		});
});
// ========== update todo item when completed =========
// ========== delete a to do item ===========
// ========== delete a todo list ============

module.exports = router;
