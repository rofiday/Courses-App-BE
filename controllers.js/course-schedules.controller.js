const { CourseSchedules, Course } = require("../models");
const { v4: uuidv4 } = require("uuid");
module.exports = {
  getAllCourseSchedules: async (req, res) => {
    try {
      const courseSchedules = await CourseSchedules.findAll({
        // attribute: ["id", "schedule", "courseId"],
        include: [
          {
            model: Course,
            attributes: ["name"],
            as: "course",
          },
        ],
      });
      res.status(200).json({
        status: "success",
        data: courseSchedules,
        message: "Get All Course Schedules",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  getCourseScheduleById: async (req, res) => {
    const { id } = req.params;
    try {
      const courseSchedules = await CourseSchedules.findOne({
        where: { id },
        include: [
          {
            model: Course,
            attributes: ["name"],
            as: "course",
          },
        ],
      });
      if (!courseSchedules) {
        return res.status(400).json({
          status: "error",
          message: "Invalid Request Data",
        });
      }
      res.status(200).json({
        status: "success",
        data: courseSchedules,
        message: "Get Course Schedules By Id",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  createDataCourseSchedule: async (req, res) => {
    try {
      const createCourseSchedules = await CourseSchedules.create({
        id: uuidv4(),
        ...req.body,
      });
      res.status(201).json({
        status: "success",
        data: createCourseSchedules,
        message: "Successfully Create Course Schedules",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  updateDataCourseSchedule: async (req, res) => {
    const { id } = req.params;
    try {
      const updateCourseSchedule = await CourseSchedules.findOne({
        where: { id },
      });
      console.log(updateCourseSchedule);
      await updateCourseSchedule.update(req.body);
      res.status(200).json({
        status: "success",
        data: updateCourseSchedule,
        message: "Course Schedule Updated successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  deleteCourseSchdule: async (req, res) => {
    const { id } = req.params;
    try {
      const deleteCourse = await CourseSchedules.findOne({
        where: { id },
      });
      if (!deleteCourse) {
        return res.status(400).json({
          status: "error",
          message: "Data Invalid",
        });
      }
      await deleteCourse.destroy();
      res.status(200).json({
        status: "success",
        message: "Data successfully deleted",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};
