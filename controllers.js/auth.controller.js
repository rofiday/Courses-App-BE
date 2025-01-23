const { User } = require("../models");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  register: async (req, res) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      await User.create({ ...req.body, id: uuidv4() });
      res.status(201).json({
        status: "success",
        message: "User created successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  login: async (req, res) => {
    try {
      console.log(req.body);
      const user = await User.findOne({
        where: {
          email: req.body.email,
          // password: req.body.password,
        },
      });
      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "Invalid email or password",
        });
      }
      req.body.password = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!req.body.password) {
        return res.status(404).json({
          status: "error",
          message: "Invalid email or password",
        });
      }
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        process.env.JWT_SECRET
      );
      res.cookie("course-app", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        status: "success",
        // data: { id: user.id, username: user.username, email: user.email },
        data: token,
        message: "User logged in successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  logout: async (req, res) => {
    try {
      //method untuk menghapus cookie yang ada di browser dari backend
      res.clearCookie("course-app");
      res.status(200).json({
        status: "success",
        message: "User logged out successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};
