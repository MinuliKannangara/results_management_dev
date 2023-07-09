const express = require("express");
const router = express.Router();
const {CalculatedResults, Student, School} = require("../models");
const {Op} = require("sequelize");


router.post("/", async(req,res) => {
    const results = req.body;
    const createdResult =  await CalculatedResults.create(results);
    res.json(createdResult);
})
router.get("/:year/:term/:schoolName/:grade", async (req, res) => {
    try {
      const school = await School.findOne({
        where: {
          school_name: req.params.schoolName,
        },
      });
  
      if (!school) {
        return res.status(404).json({ error: "School not found" });
      }
  
      const highPerformers = await CalculatedResults.findAll({
        attributes: ["total", "average"],
        include: [
          {
            model: Student,
            attributes: ["index_number", "student_name", "class_name"],
            where: {
              school_ID: school.school_ID,
              class_name: {
                [Op.substring]: req.params.grade,
              },
            },
          },
        ],
        where: {
          year: req.params.year,
          term: req.params.term,
        },
        order: [["total", "DESC"]],
        limit: 10,
      });
  
      const formattedResponse = highPerformers.map((performer) => ({
        indexNumber: performer.Student.index_number,
        name: performer.Student.student_name,
        className: performer.Student.class_name,
        total: performer.total,
        average: performer.average,
      }));


      const lowPerformers = await CalculatedResults.findAll({
        attributes: ["total", "average"],
        include: [
          {
            model: Student,
            attributes: ["index_number", "student_name", "class_name"],
            where: {
              school_ID: school.school_ID,
              class_name: {
                [Op.substring]: req.params.grade,
              },
            },
          },
        ],
        where: {
          year: req.params.year,
          term: req.params.term,
        },
        order: [["total", "ASC"]],
        limit: 50,
      });

      const formattedResponseLow = lowPerformers.map((lowperformer) =>({
        indexNumberLow : lowperformer.Student.index_number,
        nameLow: lowperformer.Student.student_name,
        classNameLow: lowperformer.Student.class_name,
        totalLow: lowperformer.total,
        averageLow: lowperformer.average,
      }));
  
      res.json({
        highPerformers: formattedResponse,
        lowPerformers : formattedResponseLow
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch the calculated values" });
    }
  });
  
module.exports = router;