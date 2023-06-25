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
    });

    Student.associate = (models) => {
        Student.belongsTo(models.School, {
          foreignKey: "school_ID",
        });
        Student.belongsTo(models.School, {
            foreignKey: "class_id",
          });

       
    };
    return Student;
};