module.exports = (sequelize,DataTypes) =>{
    const Student = sequelize.define("Student",{

        index_number:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
        },
        student_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        class_name:{
            type:DataTypes.STRING,
        }
    });

    Student.associate = (models) => {
        Student.belongsTo(models.School, {
          foreignKey: "school_ID",
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
      

        Student.hasMany(models.NationalExaminationResults,{
            foreignKey:"index_number",
        });
        Student.hasMany(models.SubjectResults,{
            foreignKey:"index_number",
        });

       
    };
    return Student;
};