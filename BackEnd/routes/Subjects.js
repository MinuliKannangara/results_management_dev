const express =require("express");
const router = express.Router();
const {Subject} =require("../models");


router.post("/", async (req, res) => {
    const student = req.body;
    const createSubject = await Subject.create(student);
    res.json(createSubject);
  });


// router.get("/", async (req,res)=>{
//     const listOfStudents = await Subject.findAll();
//     res.json(listOfStudents);
// })




module.exports = router;