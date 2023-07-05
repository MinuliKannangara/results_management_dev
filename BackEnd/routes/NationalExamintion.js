const express = require("express");
const router = express.Router();
const { NationalExaminationResults, NationalExaminations, Student, School, Subject } = require("../models");
const { Op, literal } = require("sequelize");


router.get("/NationalExaminationResults/:year", async(req, res)=>{
  try {
    const year = req.params.year.toString();

      
    const meerigamaCount = await NationalExaminationResults.count({
      include: [
        {
          model: School,
          where: { division: 'Meerigama' },
        },
        {
          model: NationalExaminations,
          where: { examination_name: 'O/L' },
        },
      ],
      where: { year},
      distinct: true,
      col: 'admission_number',
    });

    const divulapitiyaCount = await NationalExaminationResults.count({
      include: [
        {
          model: School,
          where: { division: 'Divulapitiya' },
        },
        {
          model: NationalExaminations,
          where: { examination_name: 'O/L' },
        },
      ],
      where: { year},
      distinct: true,
      col: 'admission_number',
    });

    const minuwangodaCount = await NationalExaminationResults.count({
      include: [
        {
          model: School,
          where: { division: 'Minuwangoda' },
        },
        {
          model: NationalExaminations,
          where: { examination_name: 'O/L' },
        },
      ],
       where: { year},
       distinct: true,
      col: 'admission_number',
    });

    const meerigamaPassedCount = await NationalExaminationResults.count({
      include: [
        {
          model: School,
          where: { division: 'Meerigama' },
        },
        {
          model: NationalExaminations,
          where: { examination_name: 'O/L' },
        },
      ],

      where: {
      year,
        marks: { [Op.in]: ['A', 'B', 'C', 'D'] },
      },
    });

    const divulapitiyaPassedCount = await NationalExaminationResults.count({
      include: [
        {
          model: School,
          where: { division: 'Divulapitiya' },
        },
        {
          model: NationalExaminations,
          where: { examination_name: 'O/L' },
        },
      ],

      where: {
        year,
        marks: { [Op.in]: ['A', 'B', 'C', 'D'] },
      },
    });
  
    const minuwangodaPassedCount = await NationalExaminationResults.count({
      include: [
        {
          model: School,
          where: { division: 'Minuwangoda' },
        },
        {
          model: NationalExaminations,
          where: { examination_name: 'O/L' },
        },
      ],

      where: {
        year,
        marks: { [Op.in]: ['A', 'B', 'C', 'D'] },
      },
    });  
    res.json({
      meerigama: meerigamaCount,
      divulapitiya: divulapitiyaCount,
      minuwangoda: minuwangodaCount,
      meerigamaPassed: meerigamaPassedCount,
      divulapitiyaPassed: divulapitiyaPassedCount,
      minuwangodaPassed: minuwangodaPassedCount,  
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch the count." });
  }
  
});



router.post("/NationalExaminations", async (req, res) => {
    try {
      const newExam = req.body;
      const createdExam = await NationalExaminations.create(newExam);
      res.json(createdExam);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create the examination." });
    }
  });

  router.post("/NationalExaminationResults", async (req, res) => {
    try {
      const newExamResults = req.body;
      const createdExamResults = await NationalExaminationResults.create(newExamResults);
      res.json(createdExamResults);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create the examination results." });
    }
  });
  

  //to fetch the scholarship results


  const getScholarshipSatCount = async (division, year) => {
    const count = await NationalExaminationResults.count({
      include: [
        {
          model: School,
          where: { division },
        },
        {
          model: NationalExaminations,
          where: { examination_name: 'Grade five scholarship'},
        }
      ],
      where: {year,},

    });
    return count;

  };

  const getScholarshipPassCount = async (division, year, passmark) => {
    const count = await NationalExaminationResults.count({
      include: [
        {
          model: School,
          where: { division },
        },
        {
          model: NationalExaminations,
          where: { examination_name: 'Grade five scholarship'},
        }
      ],
      where: {
        year,
        marks: {
          [Op.gte]:passmark,
        },
      },
    });
    return count;

  };

  router.get("/ScholarshipResults/:year/:mark", async (req, res) => {

    try{
       const year = req.params.year.toString();
       const passMark = req.params.mark; 
       const locations = ["Minuwangoda", "Meerigama", "Divulapitiya"];

       const divisionCounts = {};

       for(const location of locations){
         const divisionSatCount = await getScholarshipSatCount(location, year);
         const divisionPassCount = await getScholarshipPassCount(location, year, passMark);

          divisionCounts[location] = {
            satCount: divisionSatCount,
            passCount: divisionPassCount,
          };
       }

       res.json(divisionCounts);

    }
    catch (error) {
      console.error(error);
    res.status(500).json({ error: "Failed to fetch the scholarship results count." });
    }
  });



module.exports = router;