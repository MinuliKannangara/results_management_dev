const express =require("express");
const router = express.Router();
const {Student} =require("../models");


router.post("/", async (req, res) => {
    const student = req.body;
    const createStudent = await Student.create(student);
    res.json(createStudent);
  });


router.get("/", async (req,res)=>{
    const listOfStudents = await Student.findAll();
    res.json(listOfStudents);
})




module.exports = router;