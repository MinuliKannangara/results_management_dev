const express = require("express");
const router = express.Router();
const {ScholarshipResults,School} = require("../models");


router.post("/", async (req, res) => {
  try {
    const { year, schoolID, results } = req.body;

    // Loop through the results array and create or update records in the database
    for (const result of results) {
      const {
        Count0_5,
        Count6_24,
        Count25_49,
        Count50_69,
        Count70_99,
        Count100_124,
        Count125_150,
        Count151_175,
        Count176_200,
        MaximumMark,
        MinimumMark,
        Absent,
        sat,
      } = result;

      const existingRecord = await ScholarshipResults.findOne({
        where:{
          school_ID: schoolID,
          year:year,
        }
      });

      if(existingRecord){

        const meregedMarks = {
          Count0_5: Count0_5 || existingRecord.Count0_5,
          Count6_24: Count6_24 || existingRecord.Count6_24,
          Count25_49: Count25_49 || existingRecord.Count25_49,
          Count50_69: Count50_69 || existingRecord.Count50_69,
          Count70_99: Count70_99 || existingRecord.Count70_99,
          Count100_124: Count100_124 || existingRecord.Count100_124,
          Count125_150: Count125_150 || existingRecord.Count125_150,
          Count151_175: Count151_175 || existingRecord.Count151_175,
          Count176_200: Count176_200 || existingRecord.Count176_200,
          MaximumMark: MaximumMark || existingRecord.MaximumMark,
          MinimumMark: MinimumMark || existingRecord.MinimumMark,
          absent: Absent || existingRecord.absent,
          NumOfSat: sat || existingRecord.NumOfSat,
        };

        await ScholarshipResults.update(
          meregedMarks,
          {
            where:{
              school_ID: schoolID,
              year:year,
            }
          }
        );  
        
      } else{
        await ScholarshipResults.create({
          Count0_5: Count0_5,
          Count6_24: Count6_24,
          Count25_49: Count25_49,
          Count50_69: Count50_69,
          Count70_99: Count70_99,
          Count100_124: Count100_124,
          Count125_150: Count125_150,
          Count151_175: Count151_175,
          Count175_200: Count176_200,
          MaximumMark: MaximumMark,
          MinimumMark: MinimumMark,
          absent: Absent,
          NumOfSat: sat,
          year: year,
          school_ID: schoolID,
        });
      }
    }

    res.json({ message: "Data uploaded successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:schoolID/:selectedYear", async(req, res)=>{
  try{
      const results = await ScholarshipResults.findAll({
          attributes: ['Count0_5','Count6_24','Count25_49','Count50_69','Count70_99','Count100_124','Count125_150','Count175_200','PassCount','MaximumMark','MinimumMark','Absent','NumOfSat'],
          where:{
            school_ID: req.params.schoolID,
            year: req.params.selectedYear
          }

      })
      res.json (results);
  }catch(err){
      res.json({message:err});
  }
  
});

//for the education office
router.get("/zeoScholarship/:division/:selectedYear", async(req, res)=>{
  try{
    const schoolList = await School.findAll({
      attributes: ['school_ID','school_name'],
      where:{division:req.params.division}
  });
      const results = await ScholarshipResults.findAll({
          attributes: ['Count0_5','Count6_24','Count25_49','Count50_69','Count70_99','Count100_124','Count125_150','Count151_175','Count176_200','PassCount','MaximumMark','MinimumMark','Absent','NumOfSat'],
          include: [
            {
              attributes: ['school_ID','school_name'],
              model:School,
              where:{division:req.params.division}
            }
          ],
          where:{
            year: req.params.selectedYear
          }

      })
      res.json ({schoolList,results});
  }catch(err){
      res.json({message:err});
  }
  
});

  


module.exports = router;

