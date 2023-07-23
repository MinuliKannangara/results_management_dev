module.exports = (sequelize, DataTypes)=>{
    const ScholarshipResults = sequelize.define("ScholarshipResults",{

        ScholarshipResults_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        Count0_5:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        Count6_24:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        Count25_49:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        Count50_69:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        Count70_99:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        Count100_124:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        Count125_150:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        Count151_175:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        Count175_200:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        PassCount:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        MaximumMark:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        MinimumMark:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        absent:{
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

    ScholarshipResults.associate = (models) => {
        
           
        ScholarshipResults.belongsTo(models.Subject,{
                foreignKey:"subject_ID",
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });

            ScholarshipResults.belongsTo(models.School,{
                foreignKey:"school_ID",
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });


    };
    return ScholarshipResults;
};