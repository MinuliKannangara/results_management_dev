const express =require("express");
const router = express.Router();
const {Subject,SubjectCategory,SubjectResults} =require("../models");


router.post("/", async (req, res) => {
    const student = req.body;
    const createSubject = await Subject.create(student);
    res.json(createSubject);
  });

  router.post("/subjectCategory", async (req, res) => {
    const subjectCategory = req.body;
    const createSubjectCategory = await SubjectCategory.create(subjectCategory);
    res.json(createSubjectCategory);
  });

  router.post("/SubjectResults", async (req, res) =>{
    const subjectResults = req.body;
    const createSubjectResults = await SubjectResults.create(subjectResults);
    res.json(createSubjectResults);
  })

// router.get("/", async (req,res)=>{
//     const listOfStudents = await Subject.findAll();
//     res.json(listOfStudents);
// })




module.exports = router;