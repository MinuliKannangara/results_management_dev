const express = require("express");
const cors = require('cors');
const app = express();
app.use(express.json());
const db = require("./models");

const cookieParser = require('cookie-parser');
app.use(cookieParser());


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
const loginRouter = require("./routes/Userss"); 
app.use("/UserRegistration", loginRouter);

const studentRouter = require("../BackEnd/routes/Students");
app.use("/studentDetails", studentRouter);

const schoolRouter = require("./routes/Schools");
app.use("/schoolDetails", schoolRouter);

const NExaminationRouter = require("../BackEnd/routes/NationalExamintion");
app.use("/NationalExaminationDetails", NExaminationRouter);

const subjectRouter = require("./routes/Subjects");
app.use("/subject", subjectRouter);

const subjectWiseAnalysisRouter = require("./routes/subjectWIseAnalysis");
app.use("/subjectWiseAnalysis", subjectWiseAnalysisRouter);

const classesRouter = require("./routes/Classes");
app.use("/classDetails", classesRouter);

const calculatedResultsRouter = require("./routes/calculatedResultsRouter");
app.use("/calculatedResults",calculatedResultsRouter);

const SchoolUsersRouter = require("./routes/ManageSchoolUsers");
app.use("/schoolUsers",SchoolUsersRouter );

const roleRouter = require("./routes/Role");
app.use("/roleDetails", roleRouter);

const prizeHoldersRouter = require("./routes/PrizHolders");
app.use("/prizeHolders", prizeHoldersRouter);

// const prizeHoldersRouter = require("./routes/PrizHolders");
// app.use("/SchoolRegistration ", prizeHoldersRouter);

const SchoolDashboardRouter = require("../BackEnd/routes/SchoolDashboard");
app.use("/SchoolDashboardDetails", SchoolDashboardRouter);

const zonalSubjectResultsRouter = require("../BackEnd/routes/ZonalSubjectResults");
app.use("/ZonalSubjectResults", zonalSubjectResultsRouter);

const EducationOfficeUsersRouter = require("../BackEnd/routes/ManageEduOfficeUsers");
app.use("/EducationOfficeUsers", EducationOfficeUsersRouter);

const OLResultsRouter = require("./routes/OLResultsRoute");
app.use("/OLResults", OLResultsRouter);

const ALResultsRouter = require("./routes/ALResultsRoute");
app.use("/ALResults", ALResultsRouter);

const ScholarshipResultsRouter = require("./routes/ScholarshipResults");
app.use("/ScholarshipResults", ScholarshipResultsRouter);





//The db.sequelize.sync() method is called to synchronize the database schema with the defined Sequelize models.
//This will create the necessary tables
db.sequelize.sync().then(() => {

    //method is called to start the server and listen on port 3005. 
    app.listen(3001, () =>{
        console.log("server running on 3001");
    });
}); 
 