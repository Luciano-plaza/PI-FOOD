const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
  // defino el modelo
  sequelize.define('Recipe', {
    
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    spoonacularScore: {
      type: DataTypes.DECIMAL,
      validate: {
        min: 0,
        max: 100
      }
    },
    healthScore:{
      type: DataTypes.DECIMAL,
      validate: {
        min: 0,
        max: 100
      }
    },
    dishTypes: {
      type: DataTypes.ENUM('salad', 'lunch', 'main course', 'main dish', 'dinner', 'side dish', 'dessert', 'appetizer', 'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'marinade', 'fingerfood', 'snack', 'drink'),
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

};
