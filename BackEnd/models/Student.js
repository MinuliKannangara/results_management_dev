module.exports = (sequelize,DataTypes) =>{
    const Student = sequelize.define("Student",{

        //index number cannot be the primary key bcz it can be repeated when a student is repeating for years
        student_ID:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
        },
        index_number:{
            type:DataTypes.INTEGER,
            allowNull:false,
       
        },
        student_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        class_name:{
            type:DataTypes.STRING,
        },
        year:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    });

    Student.associate = (models) => {
        Student.belongsTo(models.School, {
          foreignKey: "school_ID",
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
      

        Student.hasMany(models.NationalExaminationResults,{
            foreignKey:"student_ID",
        });
        Student.hasMany(models.SubjectResults,{
            foreignKey:"student_ID",
        });

       
    };
    return Student;
};