const express = require("express"); // import express( create an instance of express)

const router = express.Router();
const {NewUsers} = require("../models"); // import the user model
const bcrypt = require("bcrypt"); // import bcrypt(it is used to hash the password)

// router.get("/", (req, res) => {
//     res.send("hello world"); // send hello world to the browser(res: response req: request)
// });

//rount for the registration
//insert data to users table in the database 

router.post("/", async (req, res) => {
    const us = req.body;
    await NewUsers.create(us);
    res.json(us);
}); 









// router.post("/", async (req, res) => {
//     //logic reguaring inserting data to the database 

//     const {name,email,mobile_number,username, password} = req.body; // destructuring the request body
    
//     // hash the password
//     bcrypt.hash(password, 10).then((hashedPassword) => {
//         //tell the "Users model" to create a new user in the database
//          NewUsers.create({
//             name: name,
//             email: email,
//             mobile_number: mobile_number,
//             username: username,
//             password: hashedPassword, //pass the hashed value
//         })

//         res.json("success"); // send the response to the browser
//     }) ;
// });

//route for the login
// router.post("/login", async (req, res) => {
//     const {name,email,mobile_number,username, password} = req.body;

//     const user = await Users.findOne({where: {username: username}}); // find the user by username

//     if(!user){
//         res.json({error: "User doesn't exist"}); // if the user doesn't exist
//     }

//     bcrypt.compare(password, user.password).then((match) => {
//         if(!match){
//             res.json({error: "Wrong username and password combination"}); // if the password doesn't match
//         }

//         res.json("success"); // if the password matches
//     });
// });






module.exports = router; // export router 