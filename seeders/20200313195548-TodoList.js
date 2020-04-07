'use strict';

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert(
			'todo_lists',
			[
				{
					name: 'Things to Do',
					userId: 1,
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('todo_lists', null, {});
	}
};
