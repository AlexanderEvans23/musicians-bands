const { db, Model, DataTypes } = require("../db");

// TODO - define the Band model
class Song extends Model {}

Song.init(
  {
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    length: DataTypes.INTEGER,
  },
  {
    sequelize: db,
    modelName: "Song",
  }
);
module.exports = {
  Song,
};
