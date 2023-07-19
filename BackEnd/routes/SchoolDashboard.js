const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { School, users, Student,SubjectResults,Subject,SubjectCategory } = require("../models");
const Sequelize = require('sequelize');

const sequelize = new Sequelize("results_management_system", "root", 1234, {
    host: 'localhost',
    dialect: 'mysql',
    // Additional configurations...
  });

//   const getSubjectSatCount = async (SchoolID, subject, year, grade, term) => {

//     const count = await SubjectResults.count({
//       include: [
//         {
//           model: Student,
//           where: { 
//             class_name: { [Op.like]: `${grade}-%` },
//             school_ID: SchoolID,
//             year: year },
//         },
//         {
//           model: Subject,
//           where: { subject: subject },
//         },
//         // {
//         //     model: SubjectCategory,
//         //     where: { name:categoryName },
//         // }
//       ],
//       where: {
//         year: year,
//         term: term,
//       },
//     });
//     return count;
//   };

//function to get the range values for the subject range analysis
  const getSubjectRangeAnalysisCounts = async (range, subject, year, schoolID, grade,term) => {
    if(range == 1){
        const count0To19 = await SubjectResults.count({
            include: [
              {
                model: Student,
                where: { 
                  class_name: { [Op.like]: `${grade}-%` },
                  school_ID: schoolID,
                  year: year },
              },
              {
                model: Subject,
                where: { subject: subject },
              },
              // {
              //     model: SubjectCategory,
              //     where: { name:categoryName },
              // }
            ],
            where: {
              year: year,
              term: term,
              marks: {
                [Op.between]: [0, 19]
              }
            },
          });
          return count0To19;
    }
    else if(range == 2){
        const count20To39 = await SubjectResults.count({
            include: [
              {
                model: Student,
                where: { 
                  class_name: { [Op.like]: `${grade}-%` },
                  school_ID: schoolID,
                  year: year },
              },
              {
                model: Subject,
                where: { subject: subject },
              },
              // {
              //     model: SubjectCategory,
              //     where: { name:categoryName },
              // }
            ],
            where: {
              year: year,
              term: term,
              marks: {
                [Op.between]: [20, 39]
              }
            },
          });
          return count20To39;

    }
    else if(range == 3){
        const count40To59 = await SubjectResults.count({
            include: [
              {
                model: Student,
                where: { 
                  class_name: { [Op.like]: `${grade}-%` },
                  school_ID: schoolID,
                  year: year },
              },
              {
                model: Subject,
                where: { subject: subject },
              },
              // {
              //     model: SubjectCategory,
              //     where: { name:categoryName },
              // }
            ],
            where: {
              year: year,
              term: term,
              marks: {
                [Op.between]: [40, 59]
              }
            },
          });
          return count40To59;

    }
    else if(range == 4){
        const count60To79 = await SubjectResults.count({
            include: [
              {
                model: Student,
                where: { 
                  class_name: { [Op.like]: `${grade}-%` },
                  school_ID: schoolID,
                  year: year },
              },
              {
                model: Subject,
                where: { subject: subject },
              },
              // {
              //     model: SubjectCategory,
              //     where: { name:categoryName },
              // }
            ],
            where: {
              year: year,
              term: term,
              marks: {
                [Op.between]: [60, 79]
              }
            },
          });
          return count60To79;

    }
    else if(range == 5){
        const count80To100 = await SubjectResults.count({
            include: [
              {
                model: Student,
                where: { 
                  class_name: { [Op.like]: `${grade}-%` },
                  school_ID: schoolID,
                  year: year },
              },
              {
                model: Subject,
                where: { subject: subject },
              },
              // {
              //     model: SubjectCategory,
              //     where: { name:categoryName },
              // }
            ],
            where: {
              year: year,
              term: term,
              marks: {
                [Op.between]: [80, 100]
              }
            },
          });
          return count80To100;

    }
    else if(range == 6){
        const absentCount = await SubjectResults.count({
            include: [
              {
                model: Student,
                where: { 
                  class_name: { [Op.like]: `${grade}-%` },
                  school_ID: schoolID,
                  year: year },
              },
              {
                model: Subject,
                where: { subject: subject },
              },
              // {
              //     model: SubjectCategory,
              //     where: { name:categoryName },
              // }
            ],
            where: {
              year: year,
              term: term,
              marks: "ab",
            },
          });
          return absentCount;

    }
  };

router.get("/:username/:grade/:year/:term", async (req, res) => {
  const username = req.params.username;
    const grade = req.params.grade;
    const year = req.params.year;
    const Selectedterm = req.params.term;
  
  try {
    const user = await users.findOne({
      where: {
        username: username,
      },
    });

    //get the school details
    const SchoolDetails = await School.findOne({
      attributes:['school_name','division','type'],
      where:{
        school_ID:user.school_ID,
      }
    })
    //counts for the entire school
    const AllStudentCount = await Student.count({
      where: {
        school_ID: user.school_ID,
        year: year,
      },
    });
  
    const distinctClasses = await Student.findAll({
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('class_name')), 'class_name'],
        ],
        where: {
          school_ID: user.school_ID,
            class_name: {
          [Op.not]: null,
          [Op.not]: '',}
        },
      });
  
      const distinctClassesCount = distinctClasses.length;

      //counts for the specific grade
    const AllClassesOfGrade = await Student.count({
        distinct: true,
        col: 'class_name',
        where: {
          school_ID: user.school_ID,
          class_name: {
            [Op.like]: `${grade}-%`,
          },
        },
      });

      const totalStudentsOfGrade = await Student.count({
        where: {
            school_ID: user.school_ID,
            class_name: {
                [Op.like]: `${grade}-%`,
                },
            year: year,    
            },
      });

// Subject list
let subCategory;
if (grade >= 6 && grade <= 9) {
  subCategory = "grade 6-9";
} else if (grade >= 10 && grade <= 11) {
  subCategory = "O/L";
} else if (grade >= 12 && grade <= 13) {
  subCategory = "A/L";
}

let subjectList = [];
if (subCategory) {
  subjectList = await Subject.findAll({
    attributes: ['subject_ID', 'subject'],
    include: [
      {
        model: SubjectCategory,
        attributes: [],
        where: {
          name: subCategory,
        },
      },
    ],
  });
}

    const subjectCounts = {};

    for(const subject of subjectList){
        subjectCounts[subject] = {};
        const Count0To19 = await getSubjectRangeAnalysisCounts(1,subject.subject,year,user.school_ID,grade,Selectedterm);
        const Count20To39 = await getSubjectRangeAnalysisCounts(2,subject.subject,year,user.school_ID,grade,Selectedterm);
        const Count40To59 = await getSubjectRangeAnalysisCounts(3,subject.subject,year,user.school_ID,grade,Selectedterm);
        const Count60To79 = await getSubjectRangeAnalysisCounts(4,subject.subject,year,user.school_ID,grade,Selectedterm);
        const Count80To100 = await getSubjectRangeAnalysisCounts(5,subject.subject,year,user.school_ID,grade,Selectedterm);
        const absentCount = await getSubjectRangeAnalysisCounts(6,subject.subject,year,user.school_ID,grade,Selectedterm);
        const satCount = Count0To19+Count20To39+Count40To59+Count60To79+Count80To100+absentCount;

        subjectCounts[subject.subject]={
            count0To19: Count0To19,
            count20To39: Count20To39,
            count40To59: Count40To59,
            count60To79: Count60To79,
            count80To100: Count80To100,
            absentCount: absentCount,
            satCount: satCount,
        }

    }



      
      
    res.json({
        AllStudentsCount: AllStudentCount,
        AllClassesCount: distinctClassesCount,
        ClassCountOfSelectedGrade: AllClassesOfGrade,
        TotalStudentsOfGrade:totalStudentsOfGrade,
        subjectCounts: subjectCounts,
        subjectList:subjectList,
        SchoolDetails:SchoolDetails,
        

        
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
