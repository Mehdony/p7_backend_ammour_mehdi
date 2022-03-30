module.exports = (sequelize, DataTypes) => {
  
    const Comment = sequelize.define("comment", {
      name: {
        type: DataTypes.STRING
      },
      text: {
        type: DataTypes.STRING
      },
      tutorialId: {
        type: DataTypes.INTEGER
      }
    });
  
    return Comment;
  };