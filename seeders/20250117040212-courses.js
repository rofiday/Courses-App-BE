"use strict";

const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const count = 10;
    let courses = [];
    for (let i = 0; i < count; i++) {
      const name = faker.commerce.productName();
      courses.push({
        id: uuidv4(),
        name: name,
        code: name.toUpperCase().split("").join("_"),
        imageUrl: faker.image.url(),
        description: faker.lorem.sentence(),
      });
    }
    await queryInterface.bulkInsert("courses", courses, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("courses", null, {});
  },
};
