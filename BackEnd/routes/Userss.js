const express = require("express"); // import express( create an instance of express)

const router = express.Router();
const {users,user_roles,roles} = require("../models"); // import the user model
const bcrypt = require("bcrypt"); // import bcrypt(it is used to hash the password)
const jwt = require("jsonwebtoken"); // import jsonwebtoken

const cookieParser = require("cookie-parser"); // import cookie-parser
const app = express(); // create an instance of express
app.use(cookieParser()); // use cookie-parser
const {createTokens,validateToken} = require("../JWT");
const { Op } = require("sequelize");

//used in the user registrtation, manage school users, login page

//to insert data from the registration form
router.post("/", async (req, res) => {
    try {
      const { name, email, mobileNumber, username, password, classes, schoolID, role_ID } = req.body; // destructuring the request body
  
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user in the database
      const newUser = await users.create({
        name: name,
        email: email,
        mobile_number: mobileNumber,
        username: username,
        class_name: classes,
        password: hashedPassword,
        school_ID: schoolID,
      });
  
      // Create new user roles
      const userRoles = role_ID.map((id) => ({ user_ID: newUser.user_ID, role_ID: id }));
      const createdRoles = await user_roles.bulkCreate(userRoles);
  
      res.json(createdRoles); // send the response to the browser
    } catch (err) {
      console.error(err);
      res.status(500).json( err.message );
    }
  });
  

//route for the login
router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    const user = await users.findOne({where: {username: username}}); // find the user by username

    if(!user){
        return res.json({error: "User doesn't exist"}); // if the user doesn't exist
    }

    bcrypt.compare(password, user.password).then((match) => {
        if(!match){
          return res.status(400).json({error: "Wrong username and password combination"}); // if the password doesn't match
        } else{
            const accessToken = createTokens(user);
          res.cookie("access-token", accessToken, {
                maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days
                httpOnly: true, // to disable accessing the cookie via client side js
                }).status(200).json({username: username});;// if the password matches
              //  .json("success")
              // if the password matches
        }

        
       
    }).catch((err) => {
        res.status(500).json(err.message); 

    });
});


router.get("/roleList", async (req, res) => {
    try {
      const roleListForSchool = await roles.findAll({
        attributes: ["role_ID", "role_name"],
        where: {
          role_name: {
            [Op.or]: ["Class Teacher", "Subject Teacher", "School Admin", "Grade Head", "Sectional Head"],
          },
        },
      });

      const roleListForOffice = await roles.findAll({
        attributes: ["role_ID", "role_name"],
        where: {
          role_name: {
            [Op.or]: ["System Admin", "Development Officer", "Planning Officer"],
          },
        },
      });
      res.json({roleListForSchool: roleListForSchool,
        roleListForOffice: roleListForOffice
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json(err.message);
    }
  });
  

module.exports = router; // export router 