import React from 'react';
import ButtonAppBar from '../NavBar/NavBarwrong';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

import axios, { Axios } from 'axios';


const GradeResultsDashboard = () => {

   

return (
<div>
<ButtonAppBar PageName="Grade Results Dashboard" />

<Container fluid className='div_aca_yr '>
        <Row>
         <p className='p_rslt_sheet'>Grade Results Dashboard</p>
        </Row>
      </Container>

<Container fluid className='div_aca_yr divAddStudentTable'>
      
   

               
      
      </Container>

</div>
);
};

export default GradeResultsDashboard;