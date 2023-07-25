const express = require("express");
const router = express.Router();
const {OLResults,SubjectCategory,Subject} = require("../models");



router.post("/", async (req, res) => {
    try {
      const { year,schoolID, results } = req.body;
  
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
        // const existingRecord = await OLResults.findOne({ subject_ID: subjectID });
  
        // if (existingRecord) {
        //   // If a record exists, update the values
        //   await OLResults.updateOne(
        //     { subject_ID: subjectID },
        //     {
        //       A_Passes: A,
        //       B_Passes: B,
        //       C_Passes: C,
        //       S_Passes: S,
        //       W_Passes: W,
        //       absent: Absent,
        //       NumOfSat: sat,
        //       NumOfPass: pass,
        //       year: year,
        //     }
        //   );
        // } else {
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
      //  }
      }
  
      res.json({ message: "Data uploaded successfully!" });
    } catch (err) {
      res.status(500).json(err. message);
    }
  });  

router.get("/", async(req, res)=>{
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
        res.json(subjectList);
    }catch(err){
        res.json({message:err});
    }
    
});

module.exports = router;

