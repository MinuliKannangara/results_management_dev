// Sequelize instance, which is responsible for managing 
//the database connection and performing database operations

module.exports = (sequelize, DataTypes) =>{
    const users = sequelize.define("users", {
       
      
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        mobile_number: {
            type: DataTypes.STRING,
            unique: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
        },

});

        // Define the association between NewUsers and UserRoles
        users.associate = (models) => {

        // users.belongsToMany(roles, { through: user_roles});
        const { roles, user_roles } = models;
        users.belongsToMany(roles, { through: user_roles,as: "roles", foreignKey: 'user_ID' });
        

        users.belongsTo(models.School,{
            foreignKey:"school_ID",
        });
        

        // pass the user_ID as foreig keys to the user roles
        // users.hasMany(models.system_admin, {
        //     foreignKey: "user_ID",
        // });

        // users.hasMany(models.school_admin, {
        //     foreignKey: "user_ID",
        // });

        // users.hasMany(models.planning_officer, {
        //     foreignKey: "user_ID",
        // });

        
        // users.hasMany(models.grade_head, {
        //     foreignKey: "user_ID",
        // });

        // users.hasMany(models.dev_officer,{
        //     foreignKey:"user_ID",
        // });

        // users.hasMany(models.sectional_head,{
        //     foreignKey:"user_ID",
        // });

        // users.hasMany(models.subject_teacher,{
        //     foreignKey:"user_ID",
        // });
    };




    return users
};