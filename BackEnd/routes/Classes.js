const express = require("express");
const router = express.Router();
const {Subject, users, SubjectCategory, Student,SubjectResults,School} = require("../models");


// to get the subject results of each student for each subject
const getSubjectResults = async (indexNumber, subjectName, year, term) => {
    const subjectResults = await SubjectResults.findAll({
      attributes: ['marks'],
      include: [
        {
          model: Student,
          where: {
            index_number: indexNumber,
          },
        },
        {
          model: Subject,
          where: {
            subject: subjectName,
          },
        },
      ],
      where: {
        year: year,
        term: term,
      },
    });
  
    return subjectResults.map((result) => result.marks);
  };
  
  router.get("/classOfUser/:userName/:year/:term", async (req, res) => {
    try {
      const userName = req.params.userName;
      const year = req.params.year;
      const term = req.params.term;
  
      const classOfUser = await users.findOne({
        where: {
          username: userName,
        },
      });
  
      const grade = parseInt(classOfUser.class_name.match(/\d+/)[0]);

      //to select the section of a class is belongs to
      let category;
      if (grade >= 6 && grade <= 9) {
        category = "grade 6-9";
      } else if (grade >= 10 && grade <= 11) {
        category = "O/L";
      } else {
        category = "A/L";
        //al-bio, al-maths, al-arts, al-commerce dannaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      }
  
      const subjectNames = await Subject.findAll({
        attributes: ["subject"],
        include: [
          {
            model: SubjectCategory,
            where: { name: category },
          },
        ],
      });
  
      //to get the list of students of a particular school particular class.
      const studentsNameList = await Student.findAll({
        attributes: ["student_name", "index_number"],
        include: [
          {
            model: School,
            where: {
              school_ID: classOfUser.school_ID,
            },
          },
        ],
        where: {
          class_name: classOfUser.class_name,
        },
      });
  
      let studentData = [];
  
      if (studentsNameList.length === 0) {
        studentData = ["No student names entered for this class"];
      } else {
        studentData = studentsNameList.map((student) => ({
          student_name: student.student_name,
          index_number: student.index_number,
        }));
      }
  
      //to get the results of each student for each subject
      const resultsOfEachStudent = {};
  
      for (const student of studentData) {
        resultsOfEachStudent[student.index_number] = {};
  
        for (const subject of subjectNames) {
          const subjectResult = await getSubjectResults(
            student.index_number,
            subject.subject,
            year,
            term
          );
          resultsOfEachStudent[student.index_number][subject.subject] = subjectResult;
        }
      }
  
      res.json({
        className: classOfUser.class_name,
        subjectNames: subjectNames.map((subject) => subject.subject),
        studentsNames: studentData,
        resultsOfEachStudent: resultsOfEachStudent,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch the data" });
    }
  });
  

// router.post("/createClass", async(req, res)=>{
//     const classes = req.body;
//     const createStudent = await Class.create(classes);
//     res.json(createStudent);

// });

module.exports = router;