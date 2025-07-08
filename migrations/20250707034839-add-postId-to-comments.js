'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Comments', 'postId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts', // nama tabel target
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Comments', 'postId');
  }
};
