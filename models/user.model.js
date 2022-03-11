module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  })
    return User;
  };