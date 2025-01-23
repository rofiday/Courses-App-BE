"use strict";

const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const count = 20;
    let users = [];
    for (let i = 0; i < count; i++) {
      users.push({
        id: uuidv4(),
        username: faker.internet.username(),
        fullname: faker.person.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.imei(),
        password: faker.internet.password(),
      });
    }
    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
