module.exports = (sequelize, DataTypes)=>{
    const SubjectResults = sequelize.define("SubjectResults",{

        SubjectResults_ID:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        year:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        term:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        marks:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
    });

    SubjectResults.associate = (models) => {

        SubjectResults.belongsTo(models.Subject,{
            foreignKey:"subject_ID",
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'

        })

        SubjectResults.belongsTo(models.Student,{
            foreignKey:"student_ID",

        })
    };

    return SubjectResults;
};