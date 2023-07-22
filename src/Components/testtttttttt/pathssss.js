import React, { useEffect, useState } from "react";

import { BrowserRouter as Router,Route,Routes,Link,Switch } from 'react-router-dom'

import Ann_Hero from '../pages/Annonymous/Ann_Hero/Ann_Hero'
import Events_1 from '../pages/Customer/Events_1/Events_1'

import Aboutus from '../pages/Customer/About us/Aboutus'
import Login from '../pages/Annonymous/Login/Login'
import { Appointments } from './Service_provider/Appointments/Appointments'
import Ann_Register from '../pages/Annonymous/Ann_Register/Ann_Register'
import Cust_reg from '../pages/Customer/Customer_registration/Cust_reg'
import { Service_prov_reg } from './Service_provider/Service_prov_Reg/Service_prov_reg'
import { Serv_provid_Home } from './Service_provider/Serv_provid_Home/Serv_provid_Home'
import Customer_createEvents  from '../pages/Customer/Customer_createEvents/Customer_createEvents'
import Add_services from '../pages/Admin/Manage_services/Add_services'
import Admin_CreateEventTemplate from './Admin/Manage_Event_templates/Create_Event_template/Admin_Create_event_template'
//sadkjaskdjkjaskjdkjsk
import CreateEventsForm  from './Customer/Events_createEvents/CreateEventsForm' 

import Admin_View_Services from '../pages/Admin/View tables/Admin_View_Services'
//admin view services
import Service_Provider_portfolio from '../pages/Service_provider/Portfolio/Service_provider_portfolio'
import Serv_prov_reg from '../pages/Service_provider/Service_prov_Reg/Serv_prov_reg'
import Photo from "../Components/Customer_Components/Photos upload test/Photo"
/sample ohoto upload/

// import ProtectectedRoutes from "../ProtectectedRoutes";

import Smple01 from '../pages/Customer/Customer_createEvents/Smple01';
import SmpProvidersPage from '../Components/Customer_Components/smple_providerspage/smp_providerspage';
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";
import PagenotFound from '../Components/PageNotFound/PagenotFound'

import Portfoliosmp from '../Components/Customer_Components/Portfolio_pages/Portfoliosmp';
import Booking from '../Components/Customer_Components/Booking/Booking';
import Add_Appointments from "../Components/Customer_Components/Appointments/Appointments";
import Package from "./Service_provider/Packages/Package";
import Booking_serv from "../pages/Service_provider/Booking/Booking";
import SideBar from "../pages/Admin/SideBar/SideBar";
import Siidebar from "../../src/Components/Admin/SideBar";

import NotVerified from "./Service_provider/NotVerified";
import AllUserLandingPage from "../Components/Main Landing Pages/All users/AllUserLandingPage";
import CustomerLandingPage from "../Components/Main Landing Pages/Customer/CustomerLandingPage";
import Services from '../pages/Customer/Services/Services'

import Admin_service_Provider from "../pages/Admin/Main Service Providers Page/Admin_service_Provider"
import Admin_Customers from "./Admin/Customers/Admin_Customers";
import MainServicePage from "./Admin/Main Services Page/MainServicePage";
import Homwe from "../pages/Admin/Home/Home"
import MainEventTemplate from '../pages/Admin/Main Event Templates/MainEventTemplate'
import MyEvent from "../pages/Customer/MyEventsPage/MyEvent";
import EventsMine from "./Customer/MyEventsPage/EventsMine";
import TailwindAbout from "../Components/TailwindAboutUS";
import MyEventsProvidersPage from "../Components/Customer_Components/MyEventsComponents/MyEventsProvidersPage";
import MyEventsPortfolio from "../Components/Customer_Components/MyEventsComponents/MyEventsPortfolio";
import AppointmentsCustomer from '../../src/pages/Customer/Appointments/AppointmentButtons'
import BookingsCustomer from "./Customer/Bookings/BookingsButton";


export default function Pathroute() {
  const [authState, setAuthState] = useState({});
  const [isVerified, setIsVerified] = useState(false);

  // pass the eventId and service name to child components
  const [data, setData] = useState({id: "", service: ""});

  const [Eventid,seteventID]=useState("")
  const [serviceName,setServiceName]=useState("")

  useEffect(() => {
    // Fetch authentication status
    axios
      .get("http://localhost:3001/usrpw/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data);
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            role: response.data.role,
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching authentication status:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch service provider verification status
    if (authState.id) {
      axios
        .get("http://localhost:3001/serviceproviderreg")
        .then((response) => {
          if (response.data.error) {
            console.log(response.data);
          } else {
            const serviceProvider = response.data.find(
              (provider) => provider.userID === authState.id
            );
            if (serviceProvider) {
              const isVerified = serviceProvider.isVerified;
              console.log("isVerified:", isVerified);
              setIsVerified(isVerified);
              // Do something with the isVerified value
            } else {
              console.log(
                "Service provider not found for the userID:",
                authState.id
              );
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching service provider verification:", error);
        });
    }
  }, [authState.id]);

  // JSX part
  console.log(authState);
  


  
  return (
    console.log(authState),
    <div style={{marginTop:"3%"}}>
            <AuthContext.Provider value={{ authState, setAuthState }}>

      <Router>
        <Routes>



{/* Customer */}
              {authState.role == "customer" && ( 
                <>
               <Route   path='/home' element={<CustomerLandingPage/>}></Route>
               <Route   path='/aboutus' element={<Ann_Hero/>}></Route>
                <Route  path = "/events" element={<MyEvent/>}></Route>
                <Route  path='/appointment/:id' element={<Add_Appointments/>} />     
                <Route  path='/bookings/:id' element={<Booking/>} />
                <Route  path='/myevents' element={<MyEvent/>} />
                <Route  path='/createevents' element={<Customer_createEvents/>}></Route>
                {/* <Route path='/selectedEvent' element={<EventsMine/>} /> */}
                <Route exact path='/myevents/:id' element={<EventsMine seteventID={seteventID} />} />
                <Route   path='/MyEventsServicePortfolio/:id' element={<MyEventsProvidersPage setServiceName={setServiceName}/>} />
                <Route   path='/MyEventsPortfolio/:id' element={<MyEventsPortfolio  Eventid={Eventid} serviceName={serviceName} />} />

                <Route   path='/Appointments' element={<AppointmentsCustomer/>} />
                
                <Route   path='/Bookings' element={<BookingsCustomer/>} />
                </>)}   


            {authState.role == "admin" && ( 
            <>

            <Route  path='/addservices' element={<Add_services/>}></Route>
            <Route  path='/createeventtemplate' element={<Admin_CreateEventTemplate/>}></Route>
            <Route  path='/view_services' element={<Admin_View_Services/>}></Route> 

            <Route  path='/ManageServiceProviders' element={<Admin_service_Provider/>}></Route>
            <Route  path='/customers' element={<Admin_Customers/>}></Route>
            <Route  path='/mainServices' element={<MainServicePage/>}></Route>
            
            <Route  path='/hoome' element={<Homwe/>}></Route>
            <Route  path='/eventTemplates' element={<MainEventTemplate/>}></Route>
                </>)}  







                

            <Route  path = "/" exact element={<AllUserLandingPage/>}></Route>
            <Route   path='/portfolio/:id' element={<Portfoliosmp />} />
            <Route   path='/services' element={<Services/>}></Route>
            <Route  path='/service_provider_register' element={<Serv_prov_reg/>}></Route> 
            <Route  path='/customer_register' element={<Cust_reg/>}></Route>
            <Route  path='/serviceprovider/:id' element={<SmpProvidersPage />} />
            <Route  path = "/events" element={<></>}></Route>
            <Route path='/appointment/:id' element={<NotVerified/>} />     
            <Route path='/bookings/:id' element={<NotVerified/>} />
            <Route path='/paala' element={<TailwindAbout/>} />


        {/* serviceProvider */}
            {
            isVerified=="valid" && 
            authState.role == "ServiceProvider" && (
              <>

            <Route  path='/appointments' element={<Appointments/>}></Route>
            <Route  path='/serviceprovider' element={<Serv_provid_Home/>}></Route>
            <Route  path='/portfolio' element={<Service_Provider_portfolio/>}></Route> 
            <Route  path = '/package' element={<Package/>}></Route>
            <Route  path = '/bookings' element={<Booking_serv/>}></Route>

            </>
            )}  


{isVerified== "0" && authState.role == "ServiceProvider" && (
              <>
            <Route  path='/home' element={<NotVerified/>}></Route>
            <Route  path='/appointments' element={<NotVerified/>}></Route>
            <Route  path='/serviceprovider' element={<NotVerified/>}></Route>
            <Route  path='/portfolio' element={<NotVerified/>}></Route> 
            <Route  path = '/package' element={<NotVerified/>}></Route>
            <Route  path = '/allbooking' element={<NotVerified/>}></Route>
            </>

)} 

{isVerified=="false" && authState.role == "ServiceProvider" && (
              <>
            <Route  path='/home' element={<NotVerified/>}></Route>
            <Route  path='/appointments' element={<NotVerified/>}></Route>
            <Route  path='/serviceprovider' element={<NotVerified/>}></Route>
            <Route  path='/portfolio' element={<NotVerified/>}></Route> 
            <Route  path = '/package' element={<NotVerified/>}></Route>
            <Route  path = '/allbooking' element={<NotVerified/>}></Route>
            </>

)} 









{/* if login */}

    
         {!authState.status  &&(
              <>
      
              <Route  path='/login' element={<Login/>}></Route>
              <Route  path='/register' element={<Ann_Register/>}></Route>

              </>

         )}
            



    <Route path='/photo' element={<Photo/>}></Route>

    <Route path='/smp' element={<Smple01/>}></Route> 
    {/* not used in */}



            {/* <Route path='/register/service_provider_register' element={<Service_prov_reg />}></Route> */}
            {/* <Route path='/appointment' element={<Appointments/>}></Route> */}


{/* ///serviceprovider/:id */}
    {/* sample of customeroutes */}

<Route path="*" element={<PagenotFound/>}></Route>

        </Routes>
      </Router>
      </AuthContext.Provider>

    </div>
  )
}