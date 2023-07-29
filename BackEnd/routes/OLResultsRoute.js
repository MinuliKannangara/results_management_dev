const express = require("express");
const router = express.Router();
const {OLResults,SubjectCategory,Subject} = require("../models");


router.post("/", async (req, res) => {
  try {
    const { year, schoolID, results } = req.body;

    // Loop through the results array and create or update records in the database
    for (const result of results) {
      const {
        subjectID,
        A,
        B,
        C,
        S,
        W,
        Absent,
        sat,
        pass,
      } = result;

      // Check if a record with the subject ID already exists in the database
      const existingRecord = await OLResults.findOne({
         where: { 
        subject_ID: subjectID,
        school_ID: schoolID,
        year:year,
      } 
    });

      if (existingRecord) {
          // If a record exists, merge the existing marks with the updated marks
          const mergedMarks = {
            A_Passes: A || existingRecord.A_Passes,
            B_Passes: B || existingRecord.B_Passes,
            C_Passes: C || existingRecord.C_Passes,
            S_Passes: S || existingRecord.S_Passes,
            W_Passes: W || existingRecord.W_Passes,
            absent: Absent || existingRecord.absent,
            NumOfSat: sat || existingRecord.NumOfSat,
            NumOfPass: pass || existingRecord.NumOfPass,
            year: year,
            subject_ID: subjectID,
            school_ID: schoolID,
          };
        // If a record exists, update the values
        await OLResults.update(
         mergedMarks,
          { where: { 
            subject_ID: subjectID,
            school_ID: schoolID, 
            year:year,
          } }
        );
      } else {
        // If a record does not exist, create a new record
        await OLResults.create({
          subject_ID: subjectID,
          A_Passes: A,
          B_Passes: B,
          C_Passes: C,
          S_Passes: S,
          W_Passes: W,
          absent: Absent,
          NumOfSat: sat,
          NumOfPass: pass,
          year: year,
          school_ID: schoolID,
        });
      }
    }

    res.json({ message: "Data uploaded successfully!" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});


router.get("/:schoolID/:selectedYear", async(req, res)=>{
    try{
        const subjectList = await Subject.findAll({
            attributes: ['subject_ID','subject'],
            include: [
                {
                    attributes: [],
                    model: SubjectCategory,
                    where:{name:"O/L"}
                }
            ],
        });

        const results = await OLResults.findAll({
            attributes: ['subject_ID','A_Passes','B_Passes','C_Passes','S_Passes','W_Passes','absent','NumOfSat','NumOfPass','year'],
            where:{
              school_ID: req.params.schoolID,
              year: req.params.selectedYear
            }

        })
        res.json ({subjectList,results});
    }catch(err){
        res.json({message:err});
    }
    
});

module.exports = router;

