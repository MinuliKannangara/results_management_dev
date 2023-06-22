const express = require("express");
const router = express.Router();
const {School} = require("../models");


router.get("/", async(req, res)=>{
    const listOfSchools = await School.findAll();
    res.json(listOfSchools);
});

router.post("/", async(req, res)=>{
    const school = req.body;
    const createSchool = await School.create(school);
    res.json(createSchool);
});

module.exports = router;