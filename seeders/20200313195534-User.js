const bCrypt = require('bcrypt-nodejs');
('use strict');

module.exports = {
	up: (queryInterface, Sequelize) => {
		/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
		return queryInterface.bulkInsert('users', [
			{
				username: 'vicki',
				password: bCrypt.hashSync('password', bCrypt.genSaltSync(8), null),
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
		return queryInterface.bulkDelete('users', null, {});
	}
};
