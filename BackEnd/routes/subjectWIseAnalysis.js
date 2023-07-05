const express =require("express");
const router = express.Router();
const { NationalExaminationResults, NationalExaminations, School, Subject } = require("../models");
const { Op } = require("sequelize");
const { current } = require("@reduxjs/toolkit");


const getSubjectCount = async (division, subject, year) => {

    const count = await NationalExaminationResults.count({
      include: [
        {
          model: School,
          where: { division },
        },
        {
          model: NationalExaminations,
          where: { examination_name: 'O/L' },
        },
        {
          model: Subject,
          where: { subject },
        },
      ],
      where: {
        year,
      },
    });
    return count;
  };

  const getSubjectPassedCount = async (division, subject, year) => {
    const count = await NationalExaminationResults.count({
      include: [
        {
          model: School,
          where: { division },
        },
        {
          model: NationalExaminations,
          where: { examination_name: 'O/L' },
        },
        {
          model: Subject,
          where: { subject },
        },
      ],
      where: {
        year,
        marks: { [Op.in]: ['A', 'B', 'C', 'D'] },
      },
    });
    return count;
  };

router.get("/:year", async(req, res)=>{

    try{
        const year = req.params.year.toString();

      const locations = ["Minuwangoda", "Meerigama", "Divulapitiya"];
      const subjects = [
        "Sinhala",
        "Religion",
        "History",
        "Science",
        "English",
        "Mathematics",
        "Business & Accounting Studies",
        "Geography",
        "Civic Education",
        "Enterpreneurship Studies",
        "Second Language (Sinhala)",
        "Second Language (Tamil)",
      ];

      const subjectCounts = {};

      for (const subject of subjects) {
          subjectCounts[subject] = {};
    
          for (const location of locations) {
            const subjectCount = await getSubjectCount(location, subject, year);
            const subjectPassCount = await getSubjectPassedCount(location, subject, year);
    
            subjectCounts[subject][location] = {
              satCount: subjectCount,
              passCount: subjectPassCount,
            };
          }
        }

        res.json(subjectCounts);
  
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch the subject wise count." });
    }
  
  
  });
  

module.exports = router;