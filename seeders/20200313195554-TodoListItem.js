
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert('todo_list_items', [{
      description: 'Kiss Vij',
      todoListId: 1,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      description: 'Cwtch Haldi',
      todoListId: 1,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      description: 'Make a curry',
      todoListId: 1,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      description: 'Drink Wine',
      todoListId: 1,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      description: 'Drink more wine',
      todoListId: 1,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
   return queryInterface.bulkDelete('todo_list_items', null, {});
  }
};
