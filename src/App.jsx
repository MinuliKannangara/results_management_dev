
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
import ManageClassResults from './Components/ClassTeacher/ManageClassResults';
import ManageSubjectResults from './Components/SubjectTeacher/SubjectResults';
import GradeResultsDashboard from './Components/GradeResultsDashboard/GradeDashboard';
import StudentPerformance from './Components/GradeHead/StudentPerformance';
import PrizeHolders from './Components/GradeHead/PrizeHolders';
import UploadNationalExaminationResults from './Components/GradeHead/NationalExamination';
import OLResults from './Components/Development Section/OLResults';
import ScholarshipResults from './Components/Development Section/ScholarshipResults';

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
      <Route path="/Upload National Examination Results" element={<UploadNationalExaminationResults/>}/>
      <Route path="/O/L Results Analysis" element={<OLResults/>}/>
      <Route path="/Scholarship Results Analysis" element={<ScholarshipResults/>}/>



    

     

    </Routes> 
    
  );
}

export default App;
