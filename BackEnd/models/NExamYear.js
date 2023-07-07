module.exports = (sequelize, DataTypes) => {
    const NExamYear = sequelize.define("NExamYear", {
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      

    });
  
    NExamYear.associate = (models) => {
      NExamYear.belongsTo(models.NationalExaminations, {
        foreignKey: "exam_ID",
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    };
  
    return NExamYear;
  };

  