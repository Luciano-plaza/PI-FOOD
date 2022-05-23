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
    score: {
      type: DataTypes.DECIMAL,
      validate: {
        min: 0,
        max: 100
      }
    },
    healthscore:{
      type: DataTypes.DECIMAL,
      validate: {
        min: 0,
        max: 100
      }
    },
    steps: {
      type: DataTypes.TEXT
    },
    image: {
      type: DataTypes.TEXT
    },
    dishTypes: {
      type: DataTypes.ENUM('salad', 'lunch', 'main course', 'main dish', 'dinner', 'side dish', 'dessert', 'appetizer', 'bread', 'breakfast', 'soup', 'beverage', 'sauce', 'marinade', 'fingerfood', 'snack', 'drink'),
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

};
