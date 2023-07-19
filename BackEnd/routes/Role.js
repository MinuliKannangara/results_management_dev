const express = require("express");
const router = express.Router();
const {user_roles, roles} = require("../models");
const { Op } = require("sequelize");


router.post("/userRole", async(req, res)=>{
    const userrole = req.body;
    const createUserRole = await user_roles.create(userrole);
    res.json(createUserRole);
});

router.post("/role", async(req, res)=>{
    const roless = req.body;
    const createRole = await roles.create(roless);
    res.json(createRole);
});

module.exports = router;

