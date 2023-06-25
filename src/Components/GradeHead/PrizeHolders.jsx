import React from 'react';
import ButtonAppBar from '../NavBar/NavBar';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Formik, Field, Form } from "formik";
import './GreadHead.css';
import { Button } from 'react-bootstrap';

import axios, { Axios } from 'axios';


const PrizeHolders = () => {

   

return (
<div>
<ButtonAppBar PageName="Prize Holders" />

<Container fluid className='topDiv'>
        <Row>
         <p className='pTopDiv'>Prize Holders List</p>
        </Row>
      </Container>

      <Container fluid className='divAllDropdown'>
      <Formik
 
  // initialValues={{ name: '', email: '', class1: '', class2: '', class3: '', class4: '' }}
  // onSubmit={async (values) => {
  //   await new Promise((resolve) => setTimeout(resolve, 500));
  //   alert(JSON.stringify(values, null, 2));
  // }}
>
  <Form>
    <Row>
    <Col lg={4} sm={12}>
      <label className='pLables'>Select Academic Year</label>
     

    </Col>
      <Col lg={8} sm={12}>
      <Field as='select' name='class2'  className="dropdownSubjects">
          <option value=''>Year</option>
          {/* Add the options for class 2 dropdown */}
        </Field>
      
      </Col>

    </Row>


   
  </Form>
</Formik>
</Container >

<Container fluid className='div_aca_yr divAddStudentTable'>
        <Row className='TableRoWUp'>

          <Col md={2} sm={6}>
            <p className='pAddStudent'>Total Subjects</p>
          </Col>
          <Col md={3} sm={6}>
          <form action="">
              <input type="text"
              style={{width:'10%', alignItems:'left', border:'none', borderBottom:'2px solid #000000', backgroundColor:'transparent', color:'#000000', fontSize:'10px', fontWeight:'bold'}}
               />
            </form>
            
          </Col>
          <Col md={4} sm={6}>
           <p className='pAddStudent'> add a search bar</p>
            
          </Col>
          <Col md={3} sm={6}>
            
            <Formik>
            <Form>
            <Button className='btnUpdate' type='submit'>Update Table</Button>
            </Form>
          </Formik>
            
          </Col>

        </Row>
        <Row className='TableRoWDown'>
        
            <Table striped bordered hover variant="light">
      <thead>
        <tr>
          <th>#</th>
          <th>Index Number</th>
          <th>Name</th>
          <th>Subject </th>
          <th>Rank</th>
      
        </tr>
      </thead>
      <tbody>

                <td>vd</td>
                <td>vd</td>
                <td>vd</td>
    
   
       
      </tbody>
    </Table>
           
        </Row>
      </Container>
</div>
);
};

export default PrizeHolders;