const express = require("express");
const router = express.Router();
const {NationalExaminationResults,NationalExaminations,Student, School}  = require("../models");
const { } = require("../models");


router.get("/NationalExaminationResults", async(req, res)=>{
    try{
        const meerigamaCount = await NationalExaminationResults.count({
            include: [
                {
                model: Student,
                include:{
                    model: School,
                    where:{
                        division:"Meerigama",
                    },
                },
            },
            {model: NationalExaminations,
                where:{
                    examination_name:"O/L",
                },
            },
            ],
        });

        res.json({
            meerigama: meerigamaCount,
            // divulapitiya: divulapitiyaCount,
            // minuangoda: minuangodaCount,
          });

        
        

    } catch(error){
        console.error(error);
        res.status(500).json({error: "failedd to fetch the count. "});
       
    }
});


router.post("/NationalExaminations", async (req, res) => {
    try {
      const newExam = req.body;
      const createdExam = await NationalExaminations.create(newExam);
      res.json(createdExam);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create the examination." });
    }
  });

  router.post("/NationalExaminationResults", async (req, res) => {
    try {
      const newExamResults = req.body;
      const createdExamResults = await NationalExaminationResults.create(newExamResults);
      res.json(createdExamResults);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create the examination results." });
    }
  });
  



module.exports = router;