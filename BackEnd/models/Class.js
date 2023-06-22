module.exports = (sequelize, DataTypes) =>{
    const Class = sequelize.define("Class",{

        class_id:{
            type:DataTypes.STRING,
            allowNull:false,
            primaryKey:true,
        },
        class_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        number_of_Students:{
            type:DataTypes.INTEGER,
        
        },
    });

    Class.associate = (models) => {
        Class.hasMany(models.Student, {
            foreignKey: "class_id",
        });
    };

    return Class;
};

