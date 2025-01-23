"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UsersCourses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UsersCourses.hasOne(models.CourseSchedules, {
        foreignKey: "usersCoursesId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        as: "schedule",
      });
    }
  }
  UsersCourses.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: DataTypes.UUID,
      courseId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "UsersCourses",
      tableName: "users_courses",
      timestamps: true,
    }
  );
  return UsersCourses;
};
