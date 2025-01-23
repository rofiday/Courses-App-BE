const { Course } = require("../models");
const { Op } = require("sequelize");
const Joi = require("joi");
module.exports = {
  middlewareCourseAll: async (req, res, next) => {
    try {
      const course = await Course.findAll();
      if (!course) {
        return res.status(404).json({
          status: "error",
          message: "Course not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  middlewareCourseId: async (req, res, next) => {
    const { id } = req.params;
    try {
      const course = await Course.findOne({ where: { id } });
      if (!course) {
        return res.status(404).json({
          status: "error",
          message: "Course not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  middlewareCourseCreate: async (req, res, next) => {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        code: Joi.string().required(),
        imageUrl: Joi.string().required(),
      });

      const { error } = schema.validate(req.body);

      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.details[0].message,
        });
      }
      const course = await Course.findOne({
        where: {
          [Op.or]: {
            name: req.body.name,
            code: req.body.code,
            imageUrl: req.body.imageUrl,
          },
        },
      });
      if (course) {
        return res.status(400).json({
          status: "error",
          message: "Course already exists",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  middlewareCourseUpdate: async (req, res, next) => {
    const { id } = req.params;
    try {
      const course = await Course.findOne({ where: { id } });
      const schema = Joi.object({
        name: Joi.string().required(),
        code: Joi.string().required(),
        imageUrl: Joi.string().required(),
      });

      const { error } = schema.validate(req.body);

      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.details[0].message,
        });
      }

      if (!course) {
        return res.status(404).json({
          status: "error",
          message: "Course not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  middlewareCourseDelete: async (req, res, next) => {
    const { id } = req.params;
    try {
      const course = await Course.findOne({ where: { id } });
      if (!course) {
        return res.status(404).json({
          status: "error",
          message: "Course not found",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};
