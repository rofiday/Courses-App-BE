const express = require("express");
const router = express.Router();

const {
  getAllCourseSchedules,
  getCourseScheduleById,
  createDataCourseSchedule,
  updateDataCourseSchedule,
  deleteCourseSchdule,
} = require("../controllers.js/course-schedules.controller");
const {
  middlewareCreateCourseSchdule,
  middlewareUpdateCourseSchedules,
} = require("../middlewares/course-schedules.middleware");

router.get("/", getAllCourseSchedules);
router.get("/:id", getCourseScheduleById);
router.post("/", middlewareCreateCourseSchdule, createDataCourseSchedule);
router.put("/:id", middlewareUpdateCourseSchedules, updateDataCourseSchedule);
router.delete("/:id", deleteCourseSchdule);
module.exports = router;
