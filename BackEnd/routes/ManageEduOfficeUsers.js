const express = require("express");
const router = express.Router();
const {user_roles, roles,users} = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
    try {  
      const devOfficeUsers = await users.findAll({
        attributes:["user_ID","username","name","email","mobile_number"],
        where: {
          school_ID:null,
        },
        include: [
          {
            attributes:["role_ID","role_name"],
            model: roles,
            through: {
              attributes:[],
              model: user_roles,
            },
            as: "roles", // Alias for the roles association
            where: {
                role_name: {
                  [Op.or]: ["Development Officer", "Planning Officer", "System Admin"],
                },
          },
        }
        ],
      });
      res.json(devOfficeUsers)
      
    }catch(error){
        console.error(error.message);
    }
    });  
module.exports = router;

