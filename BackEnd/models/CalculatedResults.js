module.exports = (sequelize, DataTypes) => {
    const CalculatedResults = sequelize.define("CalculatedResults", {
        calculatedResult_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        year:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        term:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        total:{
            type:DataTypes.INTEGER,
        },
        average:{
            type:DataTypes.DOUBLE,
        },
        rank:{
            type:DataTypes.INTEGER,
        }
    });


    CalculatedResults.associate = (models) => {
        CalculatedResults.belongsTo(models.Student, {
            foreignKey: "student_ID",
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

    };

    return CalculatedResults;
};