const express = require("express");
const router = express.Router();
const {School} = require("../models");

router.get("/", async (req, res) => {
    try{
        const totalSchols = await School.count();
        const minuwangodaSchools = await School.count({
            where:{
                division:"Minuwangoda"
            }
        })

        const divulapitiyaSchools = await School.count({
            where:{
                division:"Divulapitiya"
            }
        })
        const meergamaSchools = await School.count({
            where:{
                division:"Meerigama"
            }
        })
        res.json({
            totalSchools:totalSchols,
            minuwangodaCount:minuwangodaSchools,
            divulapitiyaCount:divulapitiyaSchools,
            meerigamaCount:meergamaSchools
        });
    } catch(error){
        res.status(500).json({ error: error });
    }
    
});

module.exports = router;