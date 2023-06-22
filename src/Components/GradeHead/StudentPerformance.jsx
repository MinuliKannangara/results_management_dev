import React, { useState, useEffect } from 'react';
import ButtonAppBar from '../NavBar/NavBar';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

import axios, { Axios } from 'axios';


const StudentPerformance = () => {

   

return (
<div>
<ButtonAppBar PageName="Student Performance" />

<Container fluid className='div_aca_yr '>
        <Row>
         <p className='p_rslt_sheet'>Student Performance</p>
        </Row>
      </Container>

<Container fluid className='div_aca_yr divAddStudentTable'>
      
   

               
      
      </Container>

</div>
);
};

export default StudentPerformance;