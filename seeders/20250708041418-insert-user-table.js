"use strict";
import bcrypt from "bcrypt";
import { create } from "domain";
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const adminPass = await bcrypt.hash("admin123", 10);
    const userPass = await bcrypt.hash("user123", 10);
    const superAdminPass = await bcrypt.hash("superadmin123", 10);
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Admin User",
          email: "admin@admin.com",
          password: adminPass,
          role: "admin",
          createdAt: new Date(),
        },
        {
          name: "Regular User",
          phone: "9840000000",
          password: userPass,
          role: "user",
          createdAt: new Date(),
        },
        {
          name: "Super Admin",
          email: "super@admin.com",
          password: superAdminPass,
          role: "superadmin",
          createdAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};
