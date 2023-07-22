const express = require("express");
const router = express.Router();
const {Subject, users, SubjectCategory, Student,SubjectResults,School} = require("../models");
const {Op} = require("sequelize");

router.get("/:grade/:year/:username", async (req, res) => {
    const username = req.params.username;
    const grade = req.params.grade;
    const year = req.params.year;

    const user = await users.findOne({
        where: {
            username: username,
        }
    });

    const studentList = await Student.findAll({
        attributes: ['student_ID','index_number','Student_name','class_name'],
        where:{
            school_ID: user.school_ID,
            year: year,
            class_name: {
                [Op.substring]: grade,
              },
        }
    });

    if(grade>=6 && grade<=9){
        subCategory = "grade 6-9";
    }
    else if(grade>=10 && grade<=11){
        subCategory = "O/L";
    } 
    else if(grade>=12 && grade<=13){
        subCategory = "A/L";
    }

    const subjectList = await Subject.findAll({
        attributes: ['subject_ID','subject'],
        include: [
           
            {
                model: SubjectCategory,
                attributes: [],
                where:{
                    name:subCategory,
                }
            } 
        ],
        
    });

    // get results for each term
    const getResults = async (student_ID,subject_ID,year,term) => {
        const result = await SubjectResults.findAll({
            
            where:{
                year: year,
                term: term,
                student_ID: student_ID,
                subject_ID: subject_ID,
            }
        });
        return result;
    };
  
    const totalMarksForYear = {};
    const prizeHolders = {};
    for (const subject of subjectList) {
      totalMarksForYear[subject.subject] = {}; // Initialize subject object
        prizeHolders[subject.subject] = {}; // Initialize subject object
      for (const student of studentList) {
        const term1 = await getResults(student.student_ID, subject.subject_ID, year, '1st Term');
        const term2 = await getResults(student.student_ID, subject.subject_ID, year, '2nd Term');
        const term3 = await getResults(student.student_ID, subject.subject_ID, year, '3rd Term');
  
        const total = term1.reduce((sum, result) => sum + result.marks, 0)
          + term2.reduce((sum, result) => sum + result.marks, 0)
          + term3.reduce((sum, result) => sum + result.marks, 0);
  
        totalMarksForYear[subject.subject][student.student_ID] = total;
      }
      
    }

    const maxMarks = {};

    for (const subject in totalMarksForYear) {
      const subjectMarks = totalMarksForYear[subject];
      const maxMark = Math.max(...Object.values(subjectMarks));
      const studentId = Object.keys(subjectMarks).find((studentId) => subjectMarks[studentId] === maxMark);
      maxMarks[subject] = {
        maxMark: maxMark,
        studentId: studentId,
      };
    }

    const prizeHoldersList = await Student.findAll({
        attributes: ['student_ID','index_number','Student_name','class_name'],
        where:{
            student_ID: {
                [Op.in]: Object.values(maxMarks).map((maxMark) => maxMark.studentId),
        }
    }});

    
    
  
  
    res.json({studentList,subjectList, totalMarksForYear,maxMarks,prizeHoldersList});
});

module.exports = router;