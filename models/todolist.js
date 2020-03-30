'use strict';
module.exports = (sequelize, DataTypes) => {
	const TodoList = sequelize.define(
		'todo_list',
		{
			name: DataTypes.STRING,
			userId: DataTypes.INTEGER
		},
		{}
	);
	TodoList.associate = function(models) {
		// associations can be defined here
		TodoList.hasMany(models.todo_list_item, {
			foreignKey: 'todoListId',
			as: 'todoListItems',
			onDelete: 'CASCADE'
		});
		TodoList.belongsTo(models.user, {
			foreignKey: 'userId',
			as: 'user',
			onDelete: 'CASCADE'
		});
	};
	return TodoList;
};
