module.exports = (sequelize, DataTypes)=>{
    const NationalExaminations = sequelize.define("NationalExaminations",{

        exam_ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        examination_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    });

    NationalExaminations.associate = (models) => {
        NationalExaminations.hasMany(models.NationalExaminationResults,{
            foreignKey:"exam_ID",
        });

       
    }

    return NationalExaminations;
};

