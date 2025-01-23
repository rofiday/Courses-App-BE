const { v4: uuidv4 } = require("uuid");
const { User } = require("../models");
module.exports = {
  getAllUser: async (req, res) => {
    try {
      const user = await User.findAll({
        attributes: ["id", "username", "email", "phoneNumber", "fullname"],
      });
      res.status(200).json({
        status: "success",
        data: user,
        message: "Successfully get all user",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findOne({
        where: { id },
        attributes: ["id", "username", "email", "phoneNumber", "fullname"],
      });
      res.status(200).json({
        status: "success",
        data: user,
        message: "Successfully get user by id",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  createUser: async (req, res) => {
    try {
      await User.create({
        id: uuidv4(),
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        fullname: req.body.fullname,
      });
      res.status(201).json({
        status: "success",
        message: "Successfully create user",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  updateUser: async (req, res) => {
    const { id } = req.params;
    try {
      const userUpdate = await User.findOne({ where: { id } });
      if (!userUpdate) {
        res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }
      await userUpdate.update({
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        fullname: req.body.fullname,
      });
      res.status(200).json({
        status: "success",
        data: {
          username: userUpdate.username,
          email: userUpdate.email,
          phoneNumber: userUpdate.phoneNumber,
          password: userUpdate.password,
          fullname: userUpdate.fullname,
        },
        message: "Successfully update user",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findOne({ where: { id } });
      if (!user) {
        res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }
      await user.destroy();
      res.status(200).json({
        status: "success",
        message: "Successfully delete user",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
};
