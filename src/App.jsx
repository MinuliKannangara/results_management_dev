
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginForm from './Components/Login/login';
import { Route, Routes } from 'react-router-dom';
import UserRegistration from './Components/UserRegistration/UserRegistration';
import ManageClassDetails from './Components/ClassTeacher/ManageClassDetails';
import SideBar from './Components/SideBar/SideBar';
// import Dashboard from './Components/NavBar/side';


function App() {

  
  return (
    <Routes>
      <Route path="/login" element={<LoginForm/>} />
      <Route path="/UserRegistration" element={<UserRegistration/>} />
      <Route path="/ClassDetails" element={<ManageClassDetails/>} />
      {/* <Route path="/NavBar" element={<Dashboard/>} /> */}
      <Route path= "/SideBar" element = {<SideBar/>}/>
    </Routes> 
   
  );
}

export default App;
