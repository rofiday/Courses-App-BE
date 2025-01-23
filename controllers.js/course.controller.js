const { Course } = require("../models");
const { v4: uuidv4 } = require("uuid");
module.exports = {
  getAllCourse: async (req, res) => {
    try {
      const course = await Course.findAll({
        attribute: ["id", "name", "code", "imageUrl"],
      });
      res.status(200).json({
        status: "success",
        data: course,
        message: "Successfully get all course",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  getCoursebyId: async (req, res) => {
    const { id } = req.params;
    try {
      const course = await Course.findOne({
        where: { id },
      });
      res.status(200).json({
        status: "success",
        data: course,
        message: "Successfully get course by id",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  createCourse: async (req, res) => {
    try {
      const course = await Course.create({
        id: uuidv4(),
        name: req.body.name,
        code: req.body.code.toUpperCase().split("").join("_"),
        imageUrl: req.body.imageUrl,
      });
      res.status(201).json({
        status: "success",
        data: course,
        message: "Successfully create course",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  updateCourse: async (req, res) => {
    const { id } = req.params;
    try {
      const courseUpdate = await Course.findOne({ where: { id } });
      if (!courseUpdate) {
        return res.status(404).json({
          status: "error",
          message: "Course not found",
        });
      }
      await courseUpdate.update({
        name: req.body.name,
        code: req.body.code.toUpperCase().split("").join("_"),
        imageUrl: req.body.imageUrl,
      });
      res.status(200).json({
        status: "success",
        data: courseUpdate,
        message: "Successfully update course",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  deleteCourse: async (req, res) => {
    const { id } = req.params;
    try {
      const course = await Course.findOne({ where: { id } });
      console.log(course);
      if (!course) {
        return res.status(404).json({
          status: "error",
          message: "Course not found",
        });
      }
      await course.destroy();
      res.status(200).json({
        status: "success",
        message: "Successfully delete course",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};
