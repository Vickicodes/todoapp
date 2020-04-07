const passportLocalSequelize = require('passport-local-sequelize');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'user',
		{
			username: DataTypes.STRING,
			password: DataTypes.STRING
		},
		{}
	);
	User.associate = function(models) {
		User.hasMany(models.todo_list, {
			foreignKey: 'userId',
			as: 'todoLists',
			onDelete: 'CASCADE'
		});
	};

	passportLocalSequelize.attachToUser(User, {
		usernameField: 'username'
	});
	return User;
};
