const {
  UsersCourses,
  User,
  Course,
  CourseSchedules,
  sequelize,
} = require("../models");
const { v4: uuidv4 } = require("uuid");
module.exports = {
  getAllUsersCoursesByUserId: async (req, res) => {
    try {
      // ambil token dari cookie
      const usersId = req.user.id;
      console.log(usersId);
      const usersCourses = await UsersCourses.findAll({
        attributes: {
          include: [
            [
              sequelize.literal(
                `(SELECT c.name FROM courses as c WHERE c.id = courseId)`
              ),
              "courseName",
            ],
            [
              sequelize.literal(
                `(SELECT c.imageUrl FROM courses as c WHERE c.id = courseId)`
              ),
              "courseImage",
            ],
            [
              sequelize.literal(
                `(SELECT c.description FROM courses as c WHERE c.id = courseId)`
              ),
              "courseDescription",
            ],
          ],
        },
        where: {
          userId: usersId,
        },
        include: [
          {
            model: CourseSchedules,
            attributes: ["startDate", "endDate"],
            as: "schedule",
          },
        ],
      });
      res.status(200).json({
        status: "success",
        data: usersCourses,
        message: "Get All Users Courses",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  registerCourse: async (req, res) => {
    //membutuhkan body
    const { courseId, schedule } = req.body;
    let transaction;
    try {
      console.log(schedule);
      if (!courseId || schedule === "") {
        return res.status(400).json({
          status: "error",
          message: "Please fill in all fields",
        });
      }
      //mapped transaction
      transaction = await sequelize.transaction();
      const usersCourses = await UsersCourses.create(
        {
          id: uuidv4(),
          courseId: courseId,
          userId: req.user.id,
        },
        { transaction }
      );
      await CourseSchedules.create(
        {
          id: uuidv4(),
          startDate: schedule.split("|")[0],
          endDate: schedule.split("|")[1],
          usersCoursesId: usersCourses.id,
        },
        { transaction }
        //supaya bisa di cek di navicate
        // console.log("user id : ", req.user.id);
        // console.log("schedule : ", schedule);
        //unmaped transaction
      );
      await transaction.commit();
      res.status(201).json({
        status: "success",
        data: usersCourses,
        message: "Users Courses registered Successfully",
      });
      //daftar route
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  getAllUsersCourses: async (req, res) => {
    try {
      const usersCourses = await User.findAll({
        attributes: ["id", "username"],
        include: [
          {
            model: Course,
            attributes: ["id", "name"],
            as: "courses",
            through: { attributes: ["id"] },
          },
        ],
      });
      res.status(200).json({
        status: "success",
        data: usersCourses,
        message: "Get All Users Courses",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  getUsersCoursesById: async (req, res) => {
    const { id } = req.params;
    try {
      const usersCourses = await User.findOne({
        where: { id },
        attributes: ["id", "username"],
        include: [
          {
            model: Course,
            attributes: ["id", "name"],
            as: "courses",
            through: { attributes: ["id"] },
          },
        ],
      });
      res.status(200).json({
        status: "success",
        data: usersCourses,
        message: "Get Users Courses By Id",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  createDataUsersCourses: async (req, res) => {
    try {
      const createUsersCourses = await UsersCourses.create({
        userId: req.body.userId,
        courseId: req.body.courseId,
        id: uuidv4(),
      });
      console.log(createUsersCourses);
      res.status(201).json({
        status: "success",
        data: createUsersCourses,
        message: "Successfully Create Users Courses",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  updateDataUsersCourses: async (req, res) => {
    const { id } = req.params;
    try {
      const updateUsersCourses = await UsersCourses.findOne({
        where: { id },
      });
      await updateUsersCourses.update(req.body);
      res.status(200).json({
        status: "success",
        data: updateUsersCourses,
        message: "Users Courses Updated successfully",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error.message);
    }
  },
  deleteUsersCourses: async (req, res) => {
    const { id } = req.params;
    try {
      console.log(id);
      const deleteUsersCourses = await UsersCourses.findOne({
        where: { id },
      });
      console.log(deleteUsersCourses);
      if (!deleteUsersCourses) {
        return res.status(400).json({
          status: "error",
          message: "Data Invalid",
        });
      }
      await deleteUsersCourses.destroy();
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
