module.exports = (sequelize, DataTypes)=>{
    const NationalExaminationResults = sequelize.define("NationalExaminationResults",{

        result_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        admission_number:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        marks:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        year:{
            type:DataTypes.STRING,
            allowNull:false,

        }

    });

    NationalExaminationResults.associate = (models) => {
            
            NationalExaminationResults.belongsTo(models.Student,{
                foreignKey:"index_number",
            });
    
            NationalExaminationResults.belongsTo(models.Subject,{
                foreignKey:"subject_ID",
            });

            NationalExaminationResults.belongsTo(models.School,{
                foreignKey:"school_ID",
            });

            NationalExaminationResults.belongsTo(models.NationalExaminations,{
                foreignKey:"exam_ID",
            });

    };
    return NationalExaminationResults;
};