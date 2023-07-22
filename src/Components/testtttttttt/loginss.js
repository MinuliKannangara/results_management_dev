import React, { useState, useContext, useEffect } from "react";
import "./login_form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import CollapsibleExample from "../navibar/Navibar";

const Login = () => {
  const [athState, setAthState] = useState({
    role: "",
    username: "",
    id: 0,
    status: false,
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add a loading state
  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  const login = async () => {
    setLoading(true); // Show loading state
    try {
      const data = { username: username, password: password };
      const response = await axios.post("http://localhost:3001/usrpw/login", data);

      if (response.data.error) {
        setErrorMessage(response.data.error); // Set error message in the state
      } else {
        localStorage.setItem("accessToken", response.data);
        setAuthState(true);
        console.log(response.data);
        await Role(); // Wait for Role function to complete before calling Direct
      }
    } catch (error) {
      alert("ooooooooooopz");
      setErrorMessage("User Name or Password is Incorrect"); // Set a generic error message
      console.log(error);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      setAuthState(true);
      Role();
    } else {
      setAuthState(false);
    }

    return () => {
      // Cleanup code, if needed
    };
  }, []);

  const Direct = (x) => {
    if (x === "customer") {
      // navigate("/home");
      window.location = "/home1";
    } else if (x === "ServiceProvider") {
      // navigate("/portfolio");
      window.location = "/portfolioe";
    } else if (x === "admin") {
     // navigate("/hoome");
     window.location = "/hoome";
    } 

  };

  const Role = async () => {
    try {
      const response = await axios.get("http://localhost:3001/usrpw/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      });

      localStorage.setItem("role", response.data.role);
      console.log(response);
      if (response.data.error) {
        setAthState({ ...athState, status: false });
      } else {
        setAthState({
          role: response.data.role,
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        Direct(localStorage.getItem("role"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AuthContext.Provider value={{ athState, setAthState }}>
        <div className="Auth-form-container">
          <CollapsibleExample
            propsForHome="Home"
            propsForServices="Services"
            propsForEvents="Events"
          />
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Login</h3>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              <div className="form-group mt-3">
        <label style={{ color: "black", fontWeight: "normal" }}>User Name</label>
        <input
          type="username"
          className="form-control mt-1"
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <label style={{ color: "black", fontWeight: "normal" }}>Password</label>
        <input
          type="password"
          className="form-control mt-1"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="d-grid gap-2 mt-3">
        {/* Show the loading state if loading is true */}
        <button type="button" className="btn btn-primary" onClick={login} disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
      <p className="forgot-password text-right mt-2">
        <a href="#">Forgot password?</a>
      </p>
            </div>
          </form>
        </div>
      </AuthContext.Provider>
    </>
  );
};

export default Login;


















<React.Fragment>

       
<ProtectedRoute
   path="/Manage Student Details"
   component={<ManageStudentDetails />}
   allowedRoles={['School Admin', 'Class Teacher']}
   redirectTo="/login" // Redirect to login page if the role is not allowed
 />
<ProtectedRoute
   path="/Manage Class Results"
   element={<ManageClassResults/>}
   allowedRoles={['School Admin', 'Class Teacher']}
   redirectTo="/login" // Redirect to login page if the role is not allowed
 />
 <ProtectedRoute
   path="/Manage Subject Results"
   element={<ManageSubjectResults/>}
   allowedRoles={['School Admin', 'Subject Teacher']}
   redirectTo="/login" // Redirect to login page if the role is not allowed
 />
 <ProtectedRoute
   path="/Student Performance"
   element={<StudentPerformance/>}
   allowedRoles={['School Admin', 'Grade Head', 'Sectional Head']}
   redirectTo="/login" // Redirect to login page if the role is not allowed
 />
 <ProtectedRoute
   path="/Prize Holders"
   element={<PrizeHolders/>}
   allowedRoles={['School Admin', 'Grade Head', 'Sectional Head']}
   redirectTo="/login" // Redirect to login page if the role is not allowed
 />
  <ProtectedRoute
   path="/Manage School Users"
   element={<ManageSchoolUsers />}
   allowedRoles={['School Admin']}
   redirectTo="/login" // Redirect to login page if the role is not allowed
 />

<ProtectedRoute
   path="/School Registration"
   element={<SchoolRegistration/>}
   allowedRoles={['School Admin']}
   redirectTo="/login" // Redirect to login page if the role is not allowed
 />
 
{/* removed******* */}
<ProtectedRoute
   path="/School Profile"
   element={<SchoolProfile/>}
   allowedRoles={['School Admin']}
   redirectTo="/login" // Redirect to login page if the role is not allowed
 />

{/* 
 <ProtectedRoute
   path="/School Profile"
   element={<SchoolProfile/>}
   allowedRoles={['School Admin']}
   redirectTo="/login" // Redirect to login page if the role is not allowed
 /> */}
 <ProtectedRoute
   path="/School Admin Dashboard"
   element={<SchoolAdminDashboard/>}
   allowedRoles={['School Admin']}
   redirectTo="/login" // Redirect to login page if the role is not allowed
 />
  <ProtectedRoute
   path="/School Dashboard"
   element={<SchoolDashboard/>}
   allowedRoles={['School Admin','Subject Teacher', 'Class Teacher', 'Grade Head', 'Sectional Head']}
   redirectTo="/login" // Redirect to login page if the role is not allowed
 />


{/* Zonal Education Office Routes */}
  <ProtectedRoute
   path="/O/L Results Analysis"
   element={<OLResults/>}
   allowedRoles={['Development Officer', 'Planning Officer', 'System Admin']}
   redirectTo="/login" // Redirect to login page if the role is not allowed
 />
 <ProtectedRoute
   path="/Scholarship Results Analysis"
   element={<ScholarshipResults />}
   allowedRoles={['Development Officer', 'Planning Officer', 'System Admin']}
   redirectTo="/login" // Redirect to login page if the role is not allowed
 />
 <ProtectedRoute
   path="/Zonal Subject Results Analysis"
   element={<ZonalSubjctResults/>}
   allowedRoles={['Development Officer', 'Planning Officer', 'System Admin']}
   redirectTo="/login" // Redirect to login page if the role is not allowed
 />
  <ProtectedRoute
   path="/Zonal Education Office Dashboard"
   element={<EduOfficeDashboard/>}
   allowedRoles={['Development Officer', 'Planning Officer', 'System Admin']}
   redirectTo="/login" // Redirect to login page if the role is not allowed
 />
  <ProtectedRoute
   path="/Manage Education Office Users"
   element={<ManageEducationOfficeUsers/>}
   allowedRoles={['System Admin']}
   redirectTo="/login" // Redirect to login page if the role is not allowed
 />
 
 {/* rotes for both schools and office */}
 <ProtectedRoute
   path="/Edit Users/:userName"
   element={<EditSchoolUser/>}
   allowedRoles={['School Admin', 'System Admin']}
   redirectTo="/login" // Redirect to login page if the role is not allowed
 />
 </React.Fragment>