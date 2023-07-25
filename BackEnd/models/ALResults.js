module.exports = (sequelize, DataTypes)=>{
    const ALResults = sequelize.define("ALResults",{

        ALresult_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        UniversityQualified:{ 
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        A_ForAllSubjects:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        FailedAllSubjects:{
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

    ALResults.associate = (models) => {
            
           
            ALResults.belongsTo(models.Subject,{
                foreignKey:"subject_ID",
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });

            ALResults.belongsTo(models.School,{
                foreignKey:"school_ID",
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });


    };
    return ALResults;
};