const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { School,Student,SubjectResults,Subject,SubjectCategory } = require("../models");

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

router.get("/:grade/:year/:term/:division/:subject", async (req, res) => {
    const grade = req.params.grade;
    const year = req.params.year;
    const Selectedterm = req.params.term;
    const division = req.params.division;
    const subject = req.params.subject
  
  try {
    
    //get the school details
    const SchoolList = await School.findAll({
      attributes:['school_ID','school_name','division','type'],
      where:{
        division: division,
      }
    })
   
// Subject list

//find the subject category that is suitable for the selected grade
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
    attributes: ['subject'],
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

    const studentCounts = {};

    for(const school of SchoolList){
        studentCounts[school] = {};
        const Count0To19 = await getSubjectRangeAnalysisCounts(1,subject,year,school.school_ID,grade,Selectedterm);
        const Count20To39 = await getSubjectRangeAnalysisCounts(2,subject,year,school.school_ID,grade,Selectedterm);
        const Count40To59 = await getSubjectRangeAnalysisCounts(3,subject,year,school.school_ID,grade,Selectedterm);
        const Count60To79 = await getSubjectRangeAnalysisCounts(4,subject,year,school.school_ID,grade,Selectedterm);
        const Count80To100 = await getSubjectRangeAnalysisCounts(5,subject,year,school.school_ID,grade,Selectedterm);
        const absentCount = await getSubjectRangeAnalysisCounts(6,subject,year,school.school_ID,grade,Selectedterm);


        studentCounts[school.school_name]={
            count0To19: Count0To19,
            count20To39: Count20To39,
            count40To59: Count40To59,
            count60To79: Count60To79,
            count80To100: Count80To100,
            absentCount: absentCount,
          
        }

    }
   
    res.json({
     
        subjectList:subjectList,
        studentCounts:studentCounts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
