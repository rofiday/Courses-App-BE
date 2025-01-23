"use strict";
const { Course, User } = require("../models");
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const courses = await Course.findAll({
      attributes: ["id"],
    });
    const user = await User.findAll({
      attributes: ["id"],
    });
    const randomCoursesIds = courses.map((course) => course.id);
    const getRandomCourseId = () =>
      randomCoursesIds[Math.floor(Math.random() * randomCoursesIds.length)];
    const randomUserIds = user.map((user) => user.id);
    const getRandomUserId = () =>
      randomUserIds[Math.floor(Math.random() * randomUserIds.length)];
    let usersCourses = [];
    let count = 10;
    for (let i = 0; i < count; i++) {
      usersCourses.push({
        id: uuidv4(),
        userId: getRandomUserId(),
        courseId: getRandomCourseId(),
      });
    }
    await queryInterface.bulkInsert("users_courses", usersCourses, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users_courses", null, {});
  },
};
