import React from 'react';
import ButtonAppBar from '../NavBar/NavBar';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import './SubjectTeacher.css';
import { Formik, Field, Form } from "formik";


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
    


<Container fluid  className='DropdownDiv2'>
      <Formik
 
  initialValues={{ name: '', email: '', class1: '', class2: '', class3: '', class4: '' }}
  onSubmit={async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert(JSON.stringify(values, null, 2));
  }}
>
  <Form>
    <Row>
      <Col lg={6} sm={12}>
        
        <Field as='select' name='class1' className="dropdownSubjects">
          <option value=''>Class Name</option>
          {/* {schoolOptions.map((school) => (
                  <option key={school.value} value={school.value}>
                    {school.label}
                  </option>
          ))} */}
        </Field>
      </Col>
      <Col lg={6} sm={12}>
        
        <Field as='select' name='class2' className="dropdownSubjects">
          <option value=''>Subject</option>
          {/* Add the options for class 2 dropdown */}
        </Field>
      </Col>
    </Row>
    <Row>
      <Col lg={6} sm={12}>
        
        <Field as='select' name='class3' className="dropdownSubjects">
          <option value=''>Year</option>
          {/* Add the options for class 3 dropdown */}
        </Field>
      </Col>
      <Col lg={6} sm={12}>
  
        <Field as='select' name='class4' className="dropdownSubjects">
          <option value=''>Term</option>
          {/* Add the options for class 4 dropdown */}
        </Field>
      </Col>
    </Row>
    {/* Add other fields and submit button */}
  </Form>
</Formik>
</Container>

</div>
);
};

export default ManageSubjectResults;