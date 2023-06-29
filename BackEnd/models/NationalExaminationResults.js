module.exports = (sequelize, DataTypes)=>{
    const NationalExaminationResults = sequelize.define("NationalExaminationResults",{

        admission_number:{
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        marks:{
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