'use strict';
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'user',
		{
			userName: DataTypes.STRING,
			password: DataTypes.STRING
		},
		{}
	);
	User.associate = function(models) {
		// associations can be defined here
		User.hasMany(models.todo_list, {
			foreignKey: 'userId',
			as: 'todoLists',
			onDelete: 'CASCADE'
		});
	};
	return User;
};
