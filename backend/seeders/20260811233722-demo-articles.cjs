'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const articleId1 = uuidv4();
    const articleId2 = uuidv4();

    await queryInterface.bulkInsert('articles', [
      {
        id: articleId1,
        title: 'Lorem ipsum dolor sit amet',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: articleId2,
        title: 'Duis aute irure dolor in reprehenderit',
        content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    return { articleId1, articleId2 };
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('articles', null, {});
  },
};