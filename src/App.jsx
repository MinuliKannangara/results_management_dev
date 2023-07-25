
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginForm from './Components/Login/login';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect} from 'react';
import axios from 'axios';
import UserRegistration from './Components/UserRegistration/UserRegistration';
// import SideBar from './Components/SideBar/SideBar';
// import Dashboard from './Components/NavBar/side';
import SideBar from './Components/SideBar/SideBar';
import NavBar from './Components/NavBar/NavBar';

import ManageStudentDetails from './Components/ClassTeacher/ManageStudentDetails';
import ManageClassResults from "../src/Components/ClassTeacher/ManageClassResults";
import ManageSubjectResults from './Components/SubjectTeacher/SubjectResults';
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
import EduOfficeDashboard from './Components/OfficeDashboard/EduOfficeDashboard';
import UploadExaminationResults from './Components/GradeHead/UploadExaminationResults';
import UploadALExamResults from './Components/GradeHead/UploadALExamResults';
import UploadScholarshipResults from './Components/GradeHead/UploadScholarshipResults';
import ALResults from './Components/Development Section/ALResults';



function App() {
  const [authState, setAuthState] = useState({
    username: "",
    className:"",
    userid: 0,
    name:"",
    schoolID: 0,
    status: false,
    role:[],
  });

  useEffect(() => {
    axios.get('http://localhost:3001/UserRegistration/auth', {
      headers: { accessToken: localStorage.getItem('accessToken')}
    }).then((response) => {
      if(response.data.error){
        setAuthState({...authState, status: false});
      }else{
        setAuthState({
          username: response.data.username,
          userid: response.data.id,
          schoolID: response.data.schoolId,
          role: response.data.roles,
          name: response.data.name,
          className:response.data.className,
          status: true,
        });
      }
    });
     
    
  },[]);
  
  return (
    <AuthContext.Provider value={{authState, setAuthState}}>
      <Routes>
      <Route path= "/SideBar" element = {<SideBar/>}/>
      <Route path="/NavBar" element = {<NavBar/>}/>
          {!authState.status ? (
            <>
              <Route path="/login" element={<LoginForm/>} />
      <Route path="/UserRegistration" element={<UserRegistration/>} />
      {/* <Route path= "/SideBar" element = {<SideBar/>}/>
      <Route path="/NavBar" element = {<NavBar/>}/> */}
      <Route path="/School Registration" element={<SchoolRegistration />} />
            </>
          ) : (
            <>
              {authState.role.includes('School Admin') && (
            <>
              <Route path="/School Dashboard" element={<SchoolDashboard />} />
              {/* <Route path="/School Admin Dashboard" element={<SchoolAdminDashboard />} />
               */}
              <Route path="/Manage School Users" element={<ManageSchoolUsers />} />
            </>
          )}
           {authState.role.includes('School Admin') || authState.role.includes('Class Teacher') ? (
            <>
              <Route path="/Manage Student Details" element={<ManageStudentDetails />} />
              <Route path="/Manage Class Results" element={<ManageClassResults />} />
              <Route path ="/School Dashboard" element ={<SchoolDashboard/>}/>
            </>
          ) : null}

{authState.role.includes('School Admin') || authState.role.includes('Subject Teacher') ? (
            <>
              <Route path="/Manage Subject Results" element = {<ManageSubjectResults/>}/>
              <Route path ="/School Dashboard" element ={<SchoolDashboard/>}/>
            </>
          ) : null}

{authState.role.includes('School Admin') || authState.role.includes('Grade Head') || authState.role.includes('Sectional Head') ? (
            <>
               <Route path="/Student Performance" element={<StudentPerformance/>} />
                <Route path="/Prize Holders" element={<PrizeHolders/>}/>
              <Route path ="/School Dashboard" element ={<SchoolDashboard/>}/>
              <Route path ="/Upload National Examination Results" element ={<UploadExaminationResults/>}/>
              <Route path ="/Upload AL Examination Results" element ={<UploadALExamResults/>}/>
              <Route path ="/Upload Scholarship Results" element ={<UploadScholarshipResults/>}/>
            </>
          ) : null}

{authState.role.includes('System Admin') || authState.role.includes('Development Officer') || authState.role.includes('Planning Officer') ? (
            <>
               <Route path="/O/L Results Analysis" element={<OLResults/>}/>
               <Route path="/A/L Results Analysis" element={<ALResults/>}/>
      <Route path="/Scholarship Results Analysis" element={<ScholarshipResults/>}/>
      <Route path="/Zonal Subject Results Analysis" element={<ZonalSubjctResults/>}/>
      <Route path="/Zonal Education Office Dashboard" element={<EduOfficeDashboard/>}/>
            </>
          ) : null}

{authState.role.includes('School Admin') || authState.role.includes('System Admin') ? (
            <>
              <Route path ="/Edit Users/:userName" element ={<EditSchoolUser/>}/>
            </>
          ) : null}

{authState.role.includes('System Admin') && (
            <>
              <Route path="/Manage Education Office Users" element={<ManageEducationOfficeUsers/>}/>
            </>
          )}

  
      
      
      {/* <Route path="/Grade Results Dashboard" element = {<GradeResultsDashboard/>}/> */}
     
      
     
      
     
      
      {/* <Route path ="/School Profile" element ={<SchoolProfile/>}/> */}
     
      
      
      
      
            </>
          )}
        </Routes>
    <Routes>
  


    </Routes> 
    </AuthContext.Provider>
    
  );
}

export default App;
