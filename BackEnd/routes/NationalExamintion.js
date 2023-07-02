const express = require("express");
const router = express.Router();
const { NationalExaminationResults, NationalExaminations, Student, School } = require("../models");
const { Op } = require("sequelize");


router.get("/NationalExaminationResults", async(req, res)=>{

  // const result = await NationalExaminationResults.findAndCountAll({
  //   attributes: [
  //     [sequelize.fn('COUNT', sequelize.col('admission_number')), 'divisionCount'],
  //   ],
  //   include: [
  //     { model: School },
  //     { model: Student },
  //     { model: NationalExaminations },
  //   ],
  // });
  // const divisionCount = result.count;
  
  // console.log('Division Count:', divisionCount);

  try {
  

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
      // where: { year: 2022 },
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
      // where: { year: 2022 },
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
      // where: { year: 2022 },
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
        // year: 2022,
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
        // year: 2022,
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
        // year: 2022,
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
  
  



  // try {
  

  //   const meerigamaCount = await NationalExaminationResults.findAndCountAll({
  //     where: {
  //       school_ID: {
  //         [Op.in]: sequelize.literal(
  //           `(SELECT school_ID FROM Schools WHERE division = 'Meerigama')`
  //         ),
  //       },
  //       exam_ID: {
  //         [Op.in]: sequelize.literal(
  //           `(SELECT exam_ID FROM NationalExaminations WHERE examination_name = 'O/L')`
  //         ),
  //       },
  //     },
  //   });

  //   res.json({
  //     meerigama: meerigamaCount,
  //   });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: "Failed to fetch the count." });
  // }
  



    // try {
    //     const meerigamaCount = await NationalExaminationResults.count({
    //       include: [
    //         {
    //           model: Student,
    //           include: {
    //             model: School,
    //             where: {
    //               division: "Meerigama",
    //             },
    //           },
    //         },
    //         {
    //           model: NationalExaminations,
    //           where: {
    //             examination_name: "O/L",
    //           },
    //         },
    //       ],
    //     });
      
    //     const minuwangodaCount = await NationalExaminationResults.count({
    //       include: [
    //         {
    //           model: Student,
    //           include: {
    //             model: School,
    //             where: {
    //               division: "Minuwangoda",
    //             },
    //           },
    //         },
    //         {
    //           model: NationalExaminations,
    //           where: {
    //             examination_name: "O/L",
    //           },
    //         },
    //       ],
    //     });
      
    //     const divulapitiyaCount = await NationalExaminationResults.count({
    //       include: [
    //         {
    //           model: Student,
    //           include: {
    //             model: School,
    //             where: {
    //               division: "'Divulapitiya'",
    //             },
    //           },
    //         },
    //         {
    //           model: NationalExaminations,
    //           where: {
    //             examination_name: "O/L",
    //           },
    //         },
    //       ],
    //     });
      
    //     res.json({
    //       meerigama: meerigamaCount,
    //       minuwangoda: minuwangodaCount,
    //       divulapitiya: divulapitiyaCount,
    //     });
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: "Failed to fetch the count." });
    //   }
      
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
  



module.exports = router;