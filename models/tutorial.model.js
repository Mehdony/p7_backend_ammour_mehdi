module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
      name: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
        
      },
      description: {
        type: Sequelize.STRING,
        allowNull : false
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
    return Tutorial;
  };