const express =require("express");
const router = express.Router();
const {Student, users} =require("../models");
// const {createTokens,validateToken} = require("../JWT");
// const app = express(); 
// const cookieParser = require("cookie-parser"); 
// app.use(cookieParser()); 

const {validateToken} = require("../middlewares/AuthMiddleware");



router.post("/", async (req, res) => {
    //const student = req.body;
    const {index_number, student_name, class_name,school_ID, year} = req.body;
    // const school_ID = req.user.schoolId;
    const createStudent = await Student.create({
      index_number: index_number,
      student_name: student_name,
      class_name: class_name,
      year: year,
      school_ID: school_ID,
    });
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


router.get("/:username/:year",validateToken, async (req,res)=>{

  try{
    const userName = req.params.username;
   // const userName = req.user.username; //get the username from the token
    
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