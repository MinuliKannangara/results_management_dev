
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
import SubjectWisePerformance from './Components/GradeHead/SubjectPerformances';
import GenrateReportCards from './Components/ClassTeacher/GenerateReportCards';
import SubjectWiseAL from './Components/Development Section/SubjectWiseAL';
import ALResultsData from './Components/Development Section/ALSubjectData';
import ScholarshipResultsData from './Components/Development Section/ScholarshipData';
import OLResultsData from './Components/Development Section/OLResultsData';
import SubjectWiseAnalysisOL from './Components/Development Section/SubjectWiseOL';
import AddStudents from './Components/ClassTeacher/AddStudent';



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
              <Route path="/Register New Students" element={<ManageStudentDetails />} />
              <Route path="/Manage Class Results" element={<ManageClassResults />} />
              <Route path ="/School Dashboard" element ={<SchoolDashboard/>}/>
              <Route path ="/Report Cards/:indexNumber/:studentName" element ={<GenrateReportCards/>}/>
              <Route path ="/Add Students" element ={<AddStudents/>}/>
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
              <Route path ="/Subject Wise Performance" element ={<SubjectWisePerformance/>}/>
            </>
          ) : null}

{authState.role.includes('System Admin') || authState.role.includes('Development Officer') || authState.role.includes('Planning Officer') ? (
            <>
               <Route path="/O/L Results Analysis" element={<OLResults/>}/>
               <Route path="/A/L Results Analysis" element={<ALResults/>}/>
      <Route path="/Scholarship Results Analysis" element={<ScholarshipResults/>}/>
      <Route path="/Zonal Subject Results Analysis" element={<ZonalSubjctResults/>}/>
      <Route path="/Zonal Education Office Dashboard" element={<EduOfficeDashboard/>}/>
      <Route path ="/Subject Wise AL" element ={<SubjectWiseAL/>}/>
      <Route path ="/ALSubjectData" element ={<ALResultsData/>}/>
      <Route path = "/ScholarshipData" element = {<ScholarshipResultsData/>}/>
      <Route path = "/SubjectWiseAnalysisOL" element = {<SubjectWiseAnalysisOL/>}/>
      <Route path = "/OLResultsData" element = {<OLResultsData/>}/>

      
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
