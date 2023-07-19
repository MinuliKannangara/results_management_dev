module.exports = (sequelize, DataTypes)=>{
    const School = sequelize.define("School",{

        school_ID:{
             type:DataTypes.INTEGER,
             primaryKey: true,
             autoIncrement: true,
             allowNull: false,
        },
        school_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        division:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        type:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    });


    School.associate = (models) => {
        School.hasMany(models.users,{
            foreignKey:"school_ID",
        });

        School.hasMany(models.Student, {
            foreignKey: "school_ID",
          });

        School.hasMany(models.NationalExaminationResults, {
            foreignKey: "school_ID",

        });  
    };

   
       
    

    return School;
};