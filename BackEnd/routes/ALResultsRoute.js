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

        const existingRecord = await ALResults.findOne({
          where:{
            subject_ID: subjectID,
            school_ID: schoolID,
            year:year,
          }
        });

        if(existingRecord){

          const mergedMarks = {
            UniversityQualified:UniversityQualified || existingRecord.UniversityQualified,
            A_ForAllSubjects:A_ForAllSubjects || existingRecord.A_ForAllSubjects,
            FailedAllSubjects: FailedAllSubjects || existingRecord.FailedAllSubjects,
            absent: Absent || existingRecord.absent ,
            NumOfSat: sat || existingRecord.NumOfSat ,
            year:year ,
            subject_ID: subjectID,
            school_ID: schoolID,

          };
          await ALResults.update(
            mergedMarks,
            {
              where:{
                subject_ID: subjectID,
                school_ID: schoolID, 
                year:year,
              }
            }
          );
        } else{
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
        }
      }
  
      res.json({ message: "Data uploaded successfully!" });
    } catch (err) {
      res.status(500).json(err. message);
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
                    where:{name:"A/L"}
                }
            ],
        });

        const Results = await ALResults.findAll({
          
              attributes:["UniversityQualified","subject_ID","A_ForAllSubjects","FailedAllSubjects","absent","NumOfSat"],
              where:{
                school_ID: req.params.schoolID,
                year: req.params.selectedYear
              }
          

        })
        res.json({subjectList,Results});
    }catch(err){
        res.json({message:err});
    }
    
});

module.exports = router;

