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
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
    
            NationalExaminationResults.belongsTo(models.Subject,{
                foreignKey:"subject_ID",
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });

            NationalExaminationResults.belongsTo(models.School,{
                foreignKey:"school_ID",
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });

            NationalExaminationResults.belongsTo(models.NationalExaminations,{
                foreignKey:"exam_ID",
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });

    };
    return NationalExaminationResults;
};