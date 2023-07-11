const express = require("express"); // import express( create an instance of express)

const router = express.Router();
const {users} = require("../models"); // import the user model
const bcrypt = require("bcrypt"); // import bcrypt(it is used to hash the password)


//rount for the registration
//insert data to users table in the database 

// router.post("/", async (req, res) => {
//     const user = req.body;
//     await NewUsers.create(user);
//     res.json(user);
// }); 

 
//to insert data from the registration form
router.post("/", async (req, res) => {
    //logic reguaring inserting data to the database 

    const {name,email,mobile_number,username, password, class_name, school_ID} = req.body; // destructuring the request body
    
    // hash the password
    bcrypt.hash(password, 10).then((hashedPassword) => {
        //tell the "Users model" to create a new user in the database
            users.create({
            name: name,
            email: email,
            mobile_number: mobile_number,
            username: username,
            class_name:class_name,
            password: hashedPassword, //pass the hashed value
            school_ID:school_ID,
            
        })

        res.json("success"); // send the response to the browser
    }) ;
});

// //route for the login
// router.post("/", async (req, res) => {
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