const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const {users, Student,SubjectResults,Subject} = require("../models");
const Sequelize = require('sequelize');

router.get("/subjects", async (req, res) => {
    const subjects = await Subject.findAll({
        attributes: ['subject_ID','subject'],
    });
    res.json(subjects);
});

//function to get the range values for the subject range analysis
  const getSubjectRangeAnalysisCounts = async (range, subject, year, schoolID, grade) => {
    if(range == 1){
        const count0To19 = await SubjectResults.count({
            where: {
                year: year,
                marks: {
                  [Op.between]: [0, 19]
                }
              },
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
          
          });
          return count0To19;
    }
    else if(range == 2){
        const count20To39 = await SubjectResults.count({
            where: {
                year: year,
                marks: {
                  [Op.between]: [20, 39]
                }
              },
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
          
          });
          return count20To39;

    }
    else if(range == 3){
        const count40To59 = await SubjectResults.count({
            where: {
                year: year,
                marks: {
                  [Op.between]: [40, 59]
                }
              },
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
           
          });
          return count40To59;

    }
    else if(range == 4){
        const count60To79 = await SubjectResults.count({
            where: {
                year: year,
                marks: {
                  [Op.between]: [60, 79]
                }
              },
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
        
          });
          return count60To79;

    }
    else if(range == 5){
        const count80To100 = await SubjectResults.count({
            where: {
                year: year,
                marks: {
                  [Op.between]: [80, 100]
                }
              },
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
        
          });
          return count80To100;

    }
  };

  router.get("/:username/:grade/:subject", async (req, res) => {
    const usernames = req.params.username;
    const grades = req.params.grade;
    const subjects = req.params.subject;
  
    try {
      const user = await users.findOne({
        where: {
          username: usernames,
        },
      });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const currentYear = new Date().getFullYear();
      const YearList = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];
  
      let yearCounts = {};
      let i = 1;
      for (const year of YearList) {
        try {
          const Count0To19 = await getSubjectRangeAnalysisCounts(1, subjects, year, user.school_ID, grades);
          const Count20To39 = await getSubjectRangeAnalysisCounts(2, subjects, year, user.school_ID, grades);
          const Count40To59 = await getSubjectRangeAnalysisCounts(3, subjects, year, user.school_ID, grades);
          const Count60To79 = await getSubjectRangeAnalysisCounts(4, subjects, year, user.school_ID, grades);
          const Count80To100 = await getSubjectRangeAnalysisCounts(5, subjects, year, user.school_ID, grades);
          const satCount = Count0To19 + Count20To39 + Count40To59 + Count60To79 + Count80To100;
  
          // Check for division by zero
          if (satCount === 0) {
            yearCounts["year" + i] = {
              count0To19: 0,
              count20To39: 0,
              count40To59: 0,
              count60To79: 0,
              count80To100: 0,
            };
          } else {
            yearCounts["year" + i] = {
              count0To19: Math.round((Count0To19 / satCount) * 100),
              count20To39: Math.round((Count20To39 / satCount) * 100),
              count40To59: Math.round((Count40To59 / satCount) * 100),
              count60To79: Math.round((Count60To79 / satCount) * 100),
              count80To100: Math.round((Count80To100 / satCount) * 100),
            };
          }
          i++;
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: error.message });
        }
      }
  
      res.json(yearCounts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;
  
  
  
  
  
  
  

module.exports = router;
