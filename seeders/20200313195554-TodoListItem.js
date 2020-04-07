module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert(
			'todo_list_items',
			[
				{
					description: 'Attend JS bootcamp',
					todoListId: 1,
					completed: false,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					description: 'Complete coding challenges',
					todoListId: 1,
					completed: false,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					description: 'Do some pair programming',
					todoListId: 1,
					completed: false,
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					description: 'Drink Wine',
					todoListId: 1,
					completed: false,
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{}
		);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('todo_list_items', null, {});
	}
};
