"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("issues", {
      issue_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("NEW", "ACK", "PENDING", "RESOLVED", "CLOSED"),
        allowNull: false,
        defaultValue: "NEW",
      },
      urgency: {
        type: Sequelize.ENUM("LOW", "MEDIUM", "HIGH"),
        allowNull: false,
        defaultValue: "LOW",
      },
      impact: {
        type: Sequelize.ENUM("LOW", "MEDIUM", "HIGH"),
        allowNull: false,
        defaultValue: "LOW",
      },
      priority: {
        type: Sequelize.ENUM("P1", "P2", "P3", "P4"),
        allowNull: false,
        defaultValue: "P2",
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      admin_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("issues");
  },
};
