const express = require("express");
const router = express.Router();
const { users, roles, user_roles,School } = require("../models");

router.get("/:userName", async (req, res) => {
  try {
    const adminData = await users.findOne({
      where: {
        username: req.params.userName,
      },
    });

    const schoolUsers = await users.findAll({
      attributes:["user_ID","name","email","mobile_number","class_name"],
      where: {
        school_ID: adminData.school_ID,
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
        },
      ],
    });

    res.json({
      users: schoolUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch the school users data" });
  }
});


module.exports = router;
