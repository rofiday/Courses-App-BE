"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsToMany(models.User, {
        through: models.UsersCourses,
        foreignKey: "courseId",
        as: "users",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Course.init(
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Course",
      tableName: "courses",
      timestamps: true,
    }
  );
  return Course;
};
