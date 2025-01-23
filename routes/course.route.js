const express = require("express");
const router = express.Router();
const {
  getAllCourse,
  getCoursebyId,
  createCourse,
  deleteCourse,
  updateCourse,
} = require("../controllers.js/course.controller");
const {
  middlewareCourseAll,
  middlewareCourseId,
  middlewareCourseCreate,
  middlewareCourseUpdate,
  middlewareCourseDelete,
} = require("../middlewares/course.middleware");

router.get("/", middlewareCourseAll, getAllCourse);
router.get("/:id", middlewareCourseId, getCoursebyId);
router.post("/", middlewareCourseCreate, createCourse);
router.put("/:id", middlewareCourseUpdate, updateCourse);
router.delete("/:id", middlewareCourseDelete, deleteCourse);
module.exports = router;
