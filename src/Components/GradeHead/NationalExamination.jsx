import React from 'react';
import ButtonAppBar from '../NavBar/NavBarwrong';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import NavBar from '../NavBar/NavBar';

import axios, { Axios } from 'axios';


const UploadNationalExaminationResults = () => {

   

return (
<div>
{/* <ButtonAppBar PageName="Upload National Examination Results" /> */}
<NavBar PageName="Upload National Examination Results" classesName="7-A" />


<Container fluid className='div_aca_yr '>
        <Row>
         <p className='p_rslt_sheet'>Upload National Examination Results</p>
        </Row>
      </Container>

<Container fluid className='div_aca_yr divAddStudentTable'>
      
   

               
      
      </Container>

</div>
);
};

export default UploadNationalExaminationResults;