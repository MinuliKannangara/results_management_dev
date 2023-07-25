const express = require("express");
const router = express.Router();
const { NationalExaminationResults, NationalExaminations, Student, School, Subject,NationalExamSchoolCounts,sequelize } = require("../models");
const { Op, literal } = require("sequelize");


//to upload satCount and Pass count to the NationalExamSchoolCounts table

router.post("/NExamCounts", async (req, res) => {
  try {
    const { counts, year } = req.body;
    const uploadedCounts = await NationalExamSchoolCounts.create({
      ...counts,
      year: year,
    });
    res.json(uploadedCounts);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to upload counts." });
  }
});

//for the Division wise O/L results analysis
router.get("/NationalExaminationResults/:year/:exam", async (req, res) => {
  try {
    const year = req.params.year.toString();
    const exams = req.params.exam;
    let exam;
    if(exams==="A_L"){
        exam="A/L"
    } else if(exams==="O_L"){
      exam="O/L"
    } else if(exams==="scholarship"){
      exam="scholarship"
    }
    
    const meerigamaCount = await NationalExamSchoolCounts.findAll({
      attributes: [
        "satCount"
      ],
      include: [
        {
          attributes:[],
          model: School,
          where: { division: 'Meerigama' },
        },
      ],
      where: {
        year: year,
        examination_name: exam,
      },
      // group: [sequelize.col('School.division'), sequelize.col('School.school_ID')],
    });

    const divulapitiyaCount = await NationalExamSchoolCounts.findAll({
      attributes: ["satCount"],
      include: [
        {
          attributes:[],
          model: School,
          where: { division: 'Divulapitiya' },
        },
      ],
      where: {
        year: year,
        examination_name: exam,
      },
     
    });

    const minuwangodaCount = await NationalExamSchoolCounts.findAll({
      attributes: ["satCount"],
      include: [
        {
          attributes:[],
          model: School,
          where: { division: 'Minuwangoda' },
        },
      ],
      where: {
        year: year,
        examination_name: exam,
      },
      
    });

    const meerigamaPassedCount = await NationalExamSchoolCounts.findAll({
      attributes: ["passCount"],
      include: [
        {
          attributes:[],
          model: School,
          where: { division: 'Meerigama' },
        },
      ],
      where: {
        year: year,
        examination_name: exam,
      },
    
    });

    const divulapitiyaPassedCount = await NationalExamSchoolCounts.findAll({
      attributes: ["passCount"],
      include: [
        {
          attributes:[],
          model: School,
          where: { division: 'Divulapitiya' },
        },
      ],
      where: {
        year: year,
        examination_name: exam,
      },
      
    });

    const minuwangodaPassedCount = await NationalExamSchoolCounts.findAll({
      attributes: ["passCount"],
      include: [
        {
          attributes:[],
          model: School,
          where: { division: 'Minuwangoda' },
        },
      ],
      where: {
        year: year,
        examination_name: exam,
      },
     
    });
    
    const meerigamasatCounts = meerigamaCount.map((item) => item.satCount); // Extract all satCount values
    const sumSatCountmeerigama = meerigamasatCounts.reduce((sum, count) => sum + count, 0); // Calculate the sum

    const DivulapitiyasatCounts = divulapitiyaCount.map((item) => item.satCount); // Extract all satCount values
    const sumSatCountDivulapitiya = DivulapitiyasatCounts.reduce((sum, count) => sum + count, 0); // Calculate the sum
    
    const minuwangodasatCounts = minuwangodaCount.map((item) => item.satCount); // Extract all satCount values
    const sumSatCountminuwangoda = minuwangodasatCounts.reduce((sum, count) => sum + count, 0); // Calculate the sum

    const meerigamaPassCounts = meerigamaPassedCount.map((item) => item.passCount); // Extract all satCount values
    const sumPassCountmeerigama = meerigamaPassCounts.reduce((sum, count) => sum + count, 0); // Calculate the sum

    const DivulapitiyaPassCounts = divulapitiyaPassedCount.map((item) => item.passCount); // Extract all satCount values
    const sumPassCountDivulapitiya = DivulapitiyaPassCounts.reduce((sum, count) => sum + count, 0); // Calculate the sum

    const minuwangodaPassCounts = minuwangodaPassedCount.map((item) => item.passCount); // Extract all satCount values
    const sumPassCountminuwangoda = minuwangodaPassCounts.reduce((sum, count) => sum + count, 0); // Calculate the sum
    

    
    res.json({
      meerigama: sumSatCountmeerigama,
      divulapitiya: sumSatCountDivulapitiya,
      minuwangoda: sumSatCountminuwangoda,
      meerigamaPassed: sumPassCountmeerigama,
      divulapitiyaPassed: sumPassCountDivulapitiya,
      minuwangodaPassed: sumPassCountminuwangoda,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message});
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
    res.status(500).json({ error: message.error});
    }
  });



module.exports = router;