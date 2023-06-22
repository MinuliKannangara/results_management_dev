const express = require("express");
const router = express.Router();
const {user_roles} = require("../models");

router.post("/", async(req, res)=>{
    const role_ID = req.body;
    const createRole = await user_roles.create(role_ID);
    res.json(createRole);
});

