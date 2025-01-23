const express = require("express");
const {
  getAllUsersCourses,
  getUsersCoursesById,
  createDataUsersCourses,
  deleteUsersCourses,
  registerCourse,
  getAllUsersCoursesByUserId,
} = require("../controllers.js/users-courses.controller");
const { middlewareAuth } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/all", middlewareAuth, getAllUsersCoursesByUserId);
router.post("/register", middlewareAuth, registerCourse);
router.get("/", getAllUsersCourses);
router.get("/:id", getUsersCoursesById);
router.post("/", createDataUsersCourses);
router.put("/:id", createDataUsersCourses);
router.delete("/:id", deleteUsersCourses);
module.exports = router;
