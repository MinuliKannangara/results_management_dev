import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';

import axios, { Axios } from 'axios';


const OLResults = () => {

   

return (
<div>
{/* <ButtonAppBar 
PageName="O/L Results Analysis" 
Tab1="Division Wise Analysis" 
Tab2="Subject Wise Analysis" 
Tab1Link="http://localhost:3000/Manage Student Details"
Tab2Link="http://localhost:3000/Manage Student Details"
/> */}

<NavBar
PageName="O/L Results Analysis" 
Tab1="Division Wise Analysis" 
Tab2="Subject Wise Analysis" 
Tab1Link="http://localhost:3000/Manage Student Details"
Tab2Link="http://localhost:3000/Manage Student Details"
/>


<Container fluid className='topDiv'>
     

</Container >

<Container fluid className='div_aca_yr divAddStudentTable'>
       
      </Container>
</div>
);
};

export default OLResults;