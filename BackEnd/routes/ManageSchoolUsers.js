const express = require("express");
const router = express.Router();
const { users, roles, user_roles,School } = require("../models");
const { Op } = require("sequelize");

const {createTokens,validateToken} = require("../JWT");

router.put("/:userID", async (req, res) => {
  const { name, email, mobile_number, class_name, role_ID } = req.body;

   // Check for existing mobile number or email
   const existingUser = await users.findOne({
    where: {
      [Op.or]: [{ mobile_number }, { email }],
      user_ID: { [Op.not]: req.params.userID }, // Exclude the current user ID
    },
  });

  if (existingUser) {
    return res.status(400).json({ message: "Mobile number or email already exists" });
  }

  const updateUser = await users.update(
    { name,email,mobile_number,class_name },
    {
      where: {
        user_ID: req.params.userID,
      },
      returning: true, // Add this line to return the updated record
     
      attributes: ["name", "email", "mobile_number", "class_name"],
    }
  );
  // Delete existing user roles
  await user_roles.destroy({
    where: {
      user_ID: req.params.userID,
    },
  });

 
  //Create new user roles
const userRoles = role_ID.map((id) => ({ user_ID: req.params.userID, role_ID: id }));
const createdUserRoles = await user_roles.bulkCreate(userRoles);

  res.json({ updateUser,createdUserRoles });
});



//this router is used in both the manage school users page and the edit user page. manage users page send the username of the admin
//and the edit user page send the username of the user that is going to be edited
router.get("/:userName", async (req, res) => {
  try {
    const adminData = await users.findOne({
      where: {
        username: req.params.userName,
      },
    });

    const schoolUsers = await users.findAll({
      attributes:["user_ID","username","name","email","mobile_number","class_name"],
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

    const classes = await users.findAll({
      attributes:["class_name"],
      where: {
        school_ID: adminData.school_ID,
      },
    });

    const udpateUser = await users.findOne({
      attributes:["user_ID","username","name","email","mobile_number","class_name"],
      where:{
        username: req.params.userName,
      }

    });

    const updateUserRoles = await user_roles.findAll({
      attributes:["role_ID"],
      where:{ user_ID: udpateUser.user_ID,},
     

      
    });
    const roleIDs = updateUserRoles.map((role) => role.role_ID);

    const userRolesOfUpdateUser = await roles.findAll({
      attributes: ['role_ID', 'role_name'],
      where: { role_ID: roleIDs },
    });


    const userRolesforSchoolAdmin = await roles.findAll({
      attributes: ["role_ID", "role_name"],
      where: {
        role_name: {
          [Op.notIn]: ["Development Officer", "Planning Officer","System Admin"]
        }
      }
    });
    const userRolesforSystemAdmin = await roles.findAll({
      attributes: ["role_ID", "role_name"],  
    });

    res.json({
      users: schoolUsers,
      udpatedUser: udpateUser,
      classList:classes,
      RolesForSchoolAdmin:userRolesforSchoolAdmin,
      RolesForSystemAdmin:userRolesforSystemAdmin,
      updateUserRoles:userRolesOfUpdateUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch the school users data" });
  }
});


module.exports = router;
