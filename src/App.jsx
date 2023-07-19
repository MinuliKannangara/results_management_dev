
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginForm from './Components/Login/login';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegistration from './Components/UserRegistration/UserRegistration';
// import SideBar from './Components/SideBar/SideBar';
// import Dashboard from './Components/NavBar/side';
import SideBar from './Components/SideBar/SideBar';
import NavBar from './Components/NavBar/NavBar';

import ManageStudentDetails from './Components/ClassTeacher/ManageStudentDetails';
import ManageClassResults from "../src/Components/ClassTeacher/ManageClassResults";
import ManageSubjectResults from './Components/SubjectTeacher/SubjectResults';
import GradeResultsDashboard from './Components/GradeResultsDashboard/GradeDashboard';
import StudentPerformance from './Components/GradeHead/StudentPerformance';
import PrizeHolders from './Components/GradeHead/PrizeHolders';

import OLResults from './Components/Development Section/OLResults';
import ScholarshipResults from './Components/Development Section/ScholarshipResults';
import ManageSchoolUsers from './Components/SchoolAdmin/ManageSchoolUsers'
import EditSchoolUser from '../src/Components/SchoolAdmin/EditUserPage'
import SchoolRegistration from './Components/UserRegistration/School_Registration';
import SchoolProfile from './Components/Profiles/SchoolProfile';
import SchoolAdminDashboard from './Components/SchoolAdmin/SchoolAdminDashboard';
import SchoolDashboard from './Components/School Dashboard/SchoolDashboard';
import ZonalSubjctResults from './Components/Development Section/SubjectResultsAnalysis';
import ManageEducationOfficeUsers from './Components/SystemAdmin/ManageEduOfficeUsers.jsx';

import UploadExaminationResults from './Components/GradeHead/UploadExaminationResults';


function App() {

  
  return (
    <Routes>
      <Route path="/login" element={<LoginForm/>} />
      <Route path="/UserRegistration" element={<UserRegistration/>} />
      {/* <Route path="/ClassDetails" element={<ManageClassDetails/>} /> */}
      {/* <Route path="/NavBar" element={<Dashboard/>} /> */}
      <Route path= "/SideBar" element = {<SideBar/>}/>
      <Route path="/NavBar" element = {<NavBar/>}/>
      <Route path="/Manage Student Details" element = {<ManageStudentDetails/>}/>
      <Route path="/Manage Class Results" element = {<ManageClassResults/>}/>
      <Route path="/Manage Subject Results" element = {<ManageSubjectResults/>}/>
      <Route path="/Grade Results Dashboard" element = {<GradeResultsDashboard/>}/>
      <Route path="/Student Performance" element={<StudentPerformance/>} />
      <Route path="/Prize Holders" element={<PrizeHolders/>}/>
      <Route path ="/upload National Examination Results" element ={<UploadExaminationResults/>}/>
      <Route path="/O/L Results Analysis" element={<OLResults/>}/>
      <Route path="/Scholarship Results Analysis" element={<ScholarshipResults/>}/>
      <Route path= "/Manage School Users" element={<ManageSchoolUsers/>} />
      <Route path ="/Edit Users/:userName" element ={<EditSchoolUser/>}/>
      <Route path ="School Registration" element ={<SchoolRegistration/>}/>
      <Route path ="/School Profile" element ={<SchoolProfile/>}/>
      <Route path ="/School Admin Dashboard" element ={<SchoolAdminDashboard/>}/>
      <Route path ="/School Dashboard" element ={<SchoolDashboard/>}/>
      <Route path="/Zonal Subject Results Analysis" element={<ZonalSubjctResults/>}/>
      <Route path="/Manage Education Office Users" element={<ManageEducationOfficeUsers/>}/>




    

     

    </Routes> 
    
  );
}

export default App;
