"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CourseSchedules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CourseSchedules.belongsTo(models.UsersCourses, {
        foreignKey: "usersCoursesId",
        as: "course",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  CourseSchedules.init(
    {
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      usersCoursesId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "CourseSchedules",
      tableName: "course_schedules",
      timestamps: true,
    }
  );
  return CourseSchedules;
};
