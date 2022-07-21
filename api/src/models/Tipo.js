const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Tipo",
    {
      diets: {
        type: DataTypes.ENUM(
          "gluten free",
          "ketogenic",
          "vegetarian",
          "dairy free",
          "lacto ovo vegetarian",
          "pescatarian",
          "vegan",
          "primal",
          "paleolithic",
          "fodmap friendly",
          "whole 30"
        ),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};
