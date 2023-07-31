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
  
  router.get("/:indexNumber/:userName/:year", async (req, res) => {
    try {
      const userName = req.params.userName;
      const year = req.params.year;
      const index_number = req.params.indexNumber;
  
      const classOfUser = await users.findOne({
        where: {
          username: userName,
        },
        include: [
            {
                model: School,
                attributes: ["school_name"],
            },
        ],

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
  
  
      let resultsOfEachStudentTerm1 = {};
      let resultsOfEachStudentTerm2 = {};
      let resultsOfEachStudentTerm3 = {};
      
      for (const subject of subjectNames) {
        const subjectResultTerm1 = await getSubjectResults(index_number, subject.subject, year, "1st Term");
        resultsOfEachStudentTerm1[subject.subject] = subjectResultTerm1[0] || null;
      
        const subjectResultTerm2 = await getSubjectResults(index_number, subject.subject, year, "2nd Term");
        resultsOfEachStudentTerm2[subject.subject] = subjectResultTerm2[0] || null;
      
        const subjectResultTerm3 = await getSubjectResults(index_number, subject.subject, year, "3rd Term");
        resultsOfEachStudentTerm3[subject.subject] = subjectResultTerm3[0] || null;
      }
        res.json({
            className: classOfUser.class_name,
            schoolName: classOfUser.School.school_name,
            subjectNames: subjectNames.map((subject) => subject.subject),
            resultsOfEachStudentTerm1,
            resultsOfEachStudentTerm2,
            resultsOfEachStudentTerm3,
          });
  
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch the data" });
    }
  });
  

module.exports = router;