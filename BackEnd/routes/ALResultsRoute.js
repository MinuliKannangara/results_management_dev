const express = require("express");
const router = express.Router();
const {ALResults,SubjectCategory,Subject} = require("../models");



router.post("/", async (req, res) => {
    try {
      const { year,schoolID, results } = req.body;
  
      // Loop through the results array and create or update records in the database
      for (const result of results) {
        const {
          subjectID,
          UniversityQualified,
          A_ForAllSubjects,
          FailedAllSubjects,
          Absent,
          sat,
        } = result;
  
          await ALResults.create({
            subject_ID: subjectID,
            UniversityQualified: UniversityQualified,
            A_ForAllSubjects: A_ForAllSubjects,
            FailedAllSubjects: FailedAllSubjects,
            absent: Absent,
            NumOfSat: sat,
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
                    where:{name:"A/L"}
                }
            ],
        });
        res.json(subjectList);
    }catch(err){
        res.json({message:err});
    }
    
});

module.exports = router;

