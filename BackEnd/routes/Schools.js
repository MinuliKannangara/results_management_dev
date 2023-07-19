const express = require("express");
const router = express.Router();
const {School} = require("../models");


router.get("/", async(req, res)=>{
    const listOfSchools = await School.findAll();
    res.json(listOfSchools);
});

router.post("/", async(req, res)=>{
    try{
        const school = req.body;
        const createSchool = await School.create(school);
        res.json(createSchool);
    } catch(error){
        console.error(error.message);
        res.status(500).json({ error: "Failed to create school." });
    }
   
});

module.exports = router;