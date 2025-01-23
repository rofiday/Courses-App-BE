const { User } = require("../models");
const Joi = require("joi");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

module.exports = {
  //membuat endpoint untuk cek login atau tidak
  middlewareAuth: async (req, res, next) => {
    try {
      //ngambil cookie || kenapa req.cookies? mengambil cookie yang udh diset
      const token = req.cookies["course-app"];
      //setiap hit endpoint cek middlware
      console.log(token);
      if (!token) {
        return res.status(401).json({
          status: "error",
          message: "Unauthorized",
        });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decode);
      //buat obj user
      req.user = decoded; //supaya masuk ke user

      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  middlewareAuthRegister: async (req, res, next) => {
    try {
      const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        fullname: Joi.string().required(),
        phoneNumber: Joi.string().required(),
      });

      const { error } = schema.validate(req.body);

      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.message,
        });
      }
      const user = await User.findOne({
        where: {
          [Op.or]: {
            username: req.body.username,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
          },
        },
      });
      if (user) {
        return res.status(400).json({
          status: "error",
          message: "User already exists",
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  middlewareAuthLogin: async (req, res, next) => {
    try {
      const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      });

      const { error } = schema.validate(req.body);

      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.details[0].message,
        });
      }
      next();
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};
