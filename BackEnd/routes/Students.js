const express =require("express");
const router = express.Router();
const {Student, users} =require("../models");


router.post("/", async (req, res) => {
    const student = req.body;
    const createStudent = await Student.create(student);
    res.json(createStudent);
  });


router.delete("/:studentID", async (req, res) => {  
    const studentID = parseInt(req.params.studentID);
    await Student.destroy({
      where: {
        student_ID: studentID,
      },
    });
    res.json("Student deleted");
});


router.get("/:username/:year", async (req,res)=>{

  try{
    const userName = req.params.username;
    
    const classOFUser = await users.findOne({
      where: {
        username: userName,
      }

    })

    const listOfStudents = await Student.findAll({

      attributes: ['student_ID','index_number', 'student_name'],
      where: {
        class_name: classOFUser.class_name,
        school_ID: classOFUser.school_ID,
        year: req.params.year,
      }

    });

    
    
    res.json({
      StudentList: listOfStudents,
      userClass: classOFUser.class_name,
    });

  } catch(error){
    console.error(error);
      res.status(500).json({ error: "Failed to fetch the data" });
  }
  
})




module.exports = router;