'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('pd_seeds', 'planned_days', {
      type: Sequelize.INTEGER,
      defaultValue: 66,
      comment: "제목",
    })
  },

  async down (queryInterface, Sequelize) {
  }
};
