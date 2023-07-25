const express = require("express");
const router = express.Router();
const { School, Subject,ALResults, sequelize } = require("../models");
const { Op } = require("sequelize");
const { current } = require("@reduxjs/toolkit");



const getSubjectCount = async (division, subject, year) => {
  try {
    const count = await ALResults.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('NumOfSat')), 'totalSat'],
        [sequelize.col('School.division'), 'division'], // Include the 'division' field from the 'School' table
      ],
      include: [
        {
          model: School,
          attributes: [],
          where: { division },
        },
        {
          model: Subject,
          attributes: [],
          where: { subject },
        },
      ],
      where: {
        year,
      },
      group: [sequelize.col('School.division')], // Group by the 'division' field from the 'School' table
    });

    return count.dataValues.totalSat || 0;
  } catch (error) {
    console.error('Error:', error);
    return []; // Return an empty array in case of any error
  }
};



  const getSubjectPassedCount = async (division, subject, year) => {
    try{
      const count = await ALResults.findOne({
        attributes: [
          [sequelize.fn('SUM', sequelize.col('UniversityQualified')), 'totalSat'],
          [sequelize.col('School.division'), 'division'], // Include the 'division' field from the 'School' table
        ],
        include: [
          {
            model: School,
            attributes: [],
            where: { division },
          },
          {
            model: Subject,
            attributes: [],
            where: { subject },
          },
        ],
        where: {
          year,
        },
        group: [sequelize.col('School.division')], // Group by the 'division' field from the 'School' table
      
      });
      return count.dataValues.totalSat || 0;
    

    }catch(error){
      console.error('Error:', error);
      return []; // Return an empty array in case of any error
    }
  };    

router.get("/:year", async(req, res)=>{

    try{
        const year = req.params.year.toString();

      const locations = ["Minuwangoda", "Meerigama", "Divulapitiya"];
      const subjects = [
        "Science",
        "Arts",
        "Commerce",
        "Technology",
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
      res.status(500).json({ error: error.message});
    }
  
  
  });
  

module.exports = router;