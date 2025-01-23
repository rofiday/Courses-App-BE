"use strict";
const { Course } = require("../models");
const { v4: uuidv4 } = require("uuid");
const { faker } = require("@faker-js/faker");
const { UsersCourses } = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const usersCourses = await UsersCourses.findAll({
      attributes: ["id"],
    });
    const randomUsersCoursesIds = usersCourses.map((course) => course.id);
    const getRandomUsersCoursesId = () =>
      randomUsersCoursesIds[
        Math.floor(Math.random() * randomUsersCoursesIds.length)
      ];
    let coursesSchedule = [];
    let count = 5;
    for (let i = 0; i < count; i++) {
      const randomDate = faker.date.future();
      coursesSchedule.push({
        id: uuidv4(),
        startDate: randomDate,
        endDate: new Date(randomDate.getTime() + 7 * 24 * 60 * 60 * 1000),
        usersCoursesId: getRandomUsersCoursesId(),
      });
    }
    await queryInterface.bulkInsert("course_schedules", coursesSchedule, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("course_schedules", null, {});
  },
};
