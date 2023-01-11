const { uuid } = require('uuidv4');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User',[
      {
        id: uuid(),
        email: "jeffondev@gmail.com",
        password: "test1234",
        name: "Jeff",
        phone: "010-0000-0000",
        createdAt: new Date,
        updatedAt: new Date
      },
    ])   
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('User', null, {});
  }
};
