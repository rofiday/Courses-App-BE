const Joi = require("joi");
const { CourseSchedules } = require("../models");
const { Op } = require("sequelize");
module.exports = {
  middlewareCreateCourseSchdule: async (req, res, next) => {
    try {
      const schema = Joi.object({
        schedule: Joi.string().required(),
        courseId: Joi.string().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.message,
        });
      }
      const courseSchedulesValidateRedundant = await CourseSchedules.findOne({
        where: {
          [Op.or]: {
            schedule: req.body.schedule,
            courseId: req.body.courseId,
          },
        },
      });
      if (courseSchedulesValidateRedundant) {
        return res.status(400).json({
          status: "error",
          message: "Data Already Exist",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  middlewareUpdateCourseSchedules: async (req, res, next) => {
    try {
      const schema = Joi.object({
        schedule: Joi.string().required(),
        courseId: Joi.string().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.message,
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};
