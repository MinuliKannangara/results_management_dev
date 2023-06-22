import React from 'react';
import ButtonAppBar from '../NavBar/NavBar';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import './SubjectTeacher.css';

import axios, { Axios } from 'axios';


const ManageSubjectResults = () => {

   
  
return (
<div>
<ButtonAppBar PageName="Manage Subject Results" />

      <Container fluid className='topDiv'>
        <Row>
         <p className='p_rslt_sheet'>Subject Results</p>
        </Row>
      </Container>

      <Container fluid className='DropdownDiv2'>
        <Row>
          <Col lg={6} sm={12}>
            <p className='p_rslt_sheet'>Select Class</p>
          </Col>
          <Col lg={6} sm={12}>
            <p className='p_rslt_sheet'>Select Class</p>
          </Col>
        </Row>
        <Row>
          <Col lg={6} sm={12}>
            <p>dfdfd</p>
          </Col>
          <Col lg={6} sm={12}>
            <p className='p_rslt_sheet'>Select Class</p>
          </Col>
        </Row>
      </Container>

<Container fluid className='div_aca_yr divAddStudentTable'>
      
   

               
      
      </Container>

</div>
);
};

export default ManageSubjectResults;