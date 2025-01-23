const express = require("express");
const router = express.Router();
const authRoute = require("./auth.route");
const courseRoute = require("./course.route");
const userRoute = require("./user.route");
const courseSchedulesRoute = require("./course-schedules.route");
const usersCoursesRoute = require("./users-courses.route");
router.use("/auth", authRoute);
router.use("/courses", courseRoute);
router.use("/users", userRoute);
router.use("/course-schedules", courseSchedulesRoute);
router.use("/users-courses", usersCoursesRoute);

module.exports = router;
