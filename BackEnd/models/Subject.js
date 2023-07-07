module.exports = (sequelize, DataTypes)=>{
    const Subject = sequelize.define("Subject",{

        subject_ID:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        subject:{
            type:DataTypes.STRING,
            allowNull:false,
        },
     
    });

    Subject.associate = (models) => {

        Subject.hasMany(models.NationalExaminationResults,{
            foreignKey:"subject_ID",
        });

        
        Subject.hasMany(models.SubjectResults,{
            foreignKey:"subject_ID",
        });

        Subject.hasMany(models.SubjectCategory,{
            foreignKey:"subject_ID",
        });
    };

    return Subject;
};