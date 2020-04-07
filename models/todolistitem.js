module.exports = (sequelize, DataTypes) => {
	const TodoListItem = sequelize.define(
		'todo_list_item',
		{
			description: DataTypes.STRING,
			todoListId: DataTypes.INTEGER,
			completed: DataTypes.BOOLEAN
		},
		{}
	);

	TodoListItem.associate = function(models) {
		TodoListItem.belongsTo(models.todo_list, {
			foreignKey: 'todoListId',
			as: 'todoList',
			onDelete: 'CASCADE'
		});
	};
	return TodoListItem;
};
