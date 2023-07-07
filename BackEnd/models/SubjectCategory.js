module.exports = (sequelize, DataTypes)=>{
    const SubjectCategory = sequelize.define("SubjectCategory",{

        Subjectcategory_ID:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        }
        
    });

    SubjectCategory.associate = (models) => {

        SubjectCategory.belongsTo(models.Subject,{
            foreignKey:"subject_ID",
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'

        })

       
    };

    return SubjectCategory;
};