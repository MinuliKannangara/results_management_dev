const express = require("express");
const router = express.Router();
const {Subject, users, SubjectCategory} = require("../models");



router.get("/classOfUser/:userName", async(req, res)=>{

    try {
        const userName = req.params.userName;
    
        const classOfUser = await users.findOne({
            where:{
                username:userName,
             }
             
        });

        const grade = parseInt(classOfUser.class_name.match(/\d+/)[0]);
        let category;
        if(grade >=6 && grade <=9){
            category = "grade 6-9";
     }
     else if(grade >=10 && grade <=11){
              category = "O/L Section";
     }
     else {
      category = "A/L Section";

      //al-bio, al-maths, al-arts, al-commerce dannaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
     }

     
     const subjectNames = await Subject.findAll({
        attributes:["subject"],
        include:[{
            model:SubjectCategory,
            where: { category_name: category,}
        }
        ],
        
    })
  
    res.json({
        className: classOfUser.class_name,
        subjectNames: subjectNames.map((subject) => subject.subject),
    });
    


    } catch (error) {
        console.error(error);
        res.status(500).json({error:"failed to fetch the class name"});
    }
});


router.post("/createClass", async(req, res)=>{
    const classes = req.body;
    const createStudent = await Class.create(classes);
    res.json(createStudent);

});

module.exports = router;