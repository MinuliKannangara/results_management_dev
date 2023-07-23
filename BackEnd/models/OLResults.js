module.exports = (sequelize, DataTypes)=>{
    const OLResults = sequelize.define("OLResults",{

        OLresult_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        A_Passes:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        B_Passes:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        C_Passes:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        S_Passes:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        W_Passes:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        absent:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        NumOfPass:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        NumOfSat:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        year:{
            type:DataTypes.STRING,
            allowNull:false,

        }

    });

    OLResults.associate = (models) => {
            
           
            OLResults.belongsTo(models.Subject,{
                foreignKey:"subject_ID",
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });

            OLResults.belongsTo(models.School,{
                foreignKey:"school_ID",
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });


    };
    return OLResults;
};