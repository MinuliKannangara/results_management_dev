const express = require("express");
const cors = require('cors');
const app = express();
app.use(express.json());
const db = require("./models");

app.use(cors());

//routers
// const usersRouter = require("./routes/Users");  //imports a router from a file called "Users" located in the "./routes" directory.
// //mount this router at the "/login" path. This means that any request starting with "/login" will be handled by this router.
// app.use("/login", usersRouter);
// app.use("/UserRegistration", usersRouter);


//routers
// const usersRouter = require("./routes/Users");  //imports a router from a file called "Users" located in the "./routes" directory.
// app.use("/newusers", usersRouter); //mount this router at the "/Users" path. This means that any request starting with "/Users" will be handled by this router.")

//import the router files
const loginRouter = require("./routes/Users"); 
app.use("/UserRegistration", loginRouter);

const studentRouter = require("./routes/Students");
app.use("/studentDetails", studentRouter);

const schoolRouter = require("./routes/Schools");
app.use("/schoolDetails", schoolRouter);

const NExaminationRouter = require("../BackEnd/routes/NationalExamintion");
app.use("/NationalExaminationDetails", NExaminationRouter);

const subjectRouter = require("./routes/Subjects");
app.use("/subject", subjectRouter);

// const roleRouter = require("./routes/Role");
// app.use("/roleDetails", roleRouter);





//The db.sequelize.sync() method is called to synchronize the database schema with the defined Sequelize models.
//This will create the necessary tables
db.sequelize.sync().then(() => {

    //method is called to start the server and listen on port 3005. 
    app.listen(3001, () =>{
        console.log("server running on 3001");
    });
}); 
 