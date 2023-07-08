import React, { useState, useEffect } from 'react';
import ButtonAppBar from '../NavBar/NavBarwrong';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import NavBar from '../NavBar/NavBar';

import axios, { Axios } from 'axios';


const StudentPerformance = () => {

   

return (
<div>
{/* <ButtonAppBar PageName="Student Performance" /> */}

<NavBar PageName="Prize Holders"/>

<Container fluid className='div_aca_yr '>
        <Row>
         <p className='p_rslt_sheet'>Student Performance</p>
        </Row>
      </Container>

<Container fluid className='div_aca_yr divAddStudentTable'>

<Container fluid>
            <Row><p className='subTopicsP'>High Performing Students</p></Row>
            <Row>
            <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>#</th>
                <th>Index Number</th>
                <th>Name</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
           
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
      
            </tbody>
          </Table>
            </Row>
</Container>
      
   

               
      
      </Container>

</div>
);
};

export default StudentPerformance;