module.exports = (sequelize, DataTypes)=>{
    const NationalExamSchoolCounts = sequelize.define("NationalExamSchoolCounts",{

        Count_ID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        examination_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        satCount:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        passCount:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        year:{
            type:DataTypes.STRING,
            allowNull:false,
        }

    });

    NationalExamSchoolCounts.associate = (models) => {
        NationalExamSchoolCounts.belongsTo(models.School,{
            foreignKey:"school_ID",
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

       
    }

    return NationalExamSchoolCounts;
};

