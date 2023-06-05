const express = require("express");
const app = express();
app.use(express.json());
const db = require("./models");

//routers
// const usersRouter = require("./routes/Users");  //imports a router from a file called "Users" located in the "./routes" directory.
// //mount this router at the "/login" path. This means that any request starting with "/login" will be handled by this router.
// app.use("/login", usersRouter);
// app.use("/UserRegistration", usersRouter);


//routers
// const usersRouter = require("./routes/Users");  //imports a router from a file called "Users" located in the "./routes" directory.
// app.use("/newusers", usersRouter); //mount this router at the "/Users" path. This means that any request starting with "/Users" will be handled by this router.")


const loginRouter = require("./routes/Users"); 
app.use("/login", loginRouter);











//The db.sequelize.sync() method is called to synchronize the database schema with the defined Sequelize models.
//This will create the necessary tables
db.sequelize.sync().then(() => {

    //method is called to start the server and listen on port 3005. 
    app.listen(3001, () =>{
        console.log("server running on 3001");
    });
}); 
 