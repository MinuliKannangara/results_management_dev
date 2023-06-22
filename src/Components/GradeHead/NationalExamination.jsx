import React from 'react';
import ButtonAppBar from '../NavBar/NavBar';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

import axios, { Axios } from 'axios';


const UploadNationalExaminationResults = () => {

   

return (
<div>
<ButtonAppBar PageName="Upload National Examination Results" />

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