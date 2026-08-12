'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const articles = await queryInterface.sequelize.query(
      `SELECT id FROM articles;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );

    if (articles.length < 2) {
      console.warn('No data to seed');
      return;
    }

    const comments = [
      {
        id: uuidv4(),
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        article_id: articles[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        message: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco',
        article_id: articles[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        message: 'Duis aute irure dolor in reprehenderit in voluptate ',
        article_id: articles[1].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        message:
          'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        article_id: articles[1].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('comments', comments);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comments', null, {});
  },
};
