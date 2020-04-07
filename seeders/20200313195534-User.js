const bCrypt = require('bcrypt-nodejs');
('use strict');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('users', [
			{
				username: 'vicki',
				password: bCrypt.hashSync('password', bCrypt.genSaltSync(8), null),
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('users', null, {});
	}
};
