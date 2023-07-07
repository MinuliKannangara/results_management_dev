module.exports = (sequelize, DataTypes)=>{
    const roles = sequelize.define("roles",{

        role_ID:{
             type:DataTypes.INTEGER,
             primaryKey: true,
             autoIncrement: true,
             allowNull: false,
        },
        role_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },

    });

        // Define the association between UserRoles and NewUsers
        roles.associate = (models) => {
        // UserRoles has a foreign key role_ID in NewUsers
        // roles.hasMany(models.users, {
        // foreignKey: "role_ID",

        // });

        // roles.belongsToMany(users, { through: user_roles});
        // roles.belongsToMany(permission, { through: role_permission});
        
        const { users, user_roles } = models;
        roles.belongsToMany(users, { through: user_roles,as: "users", 
        foreignKey: 'role_ID',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' });
    
    };

    return roles;
};
