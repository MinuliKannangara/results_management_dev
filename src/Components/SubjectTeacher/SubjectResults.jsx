import React from 'react';
import ButtonAppBar from '../NavBar/NavBar';
import { Container,div, Row, Col, Button,FormLabel } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import './SubjectTeacher.css';
import { Formik, Field, Form } from "formik";




import axios, { Axios } from 'axios';


const ManageSubjectResults = () => {

   
  
return (
<div>

  
<ButtonAppBar PageName="Manage Subject Results" />

<Container fluid className='topDiv'>

  <p className='pTopDiv'>Subject Results</p>

  
</Container>


<Container fluid className='subTopicsDiv'>

  <p className='subTopicsP'>Upload Marks</p>

  
</Container>

    
<Container  className='DropdownDiv2'>
      <Formik
 
  // initialValues={{ name: '', email: '', class1: '', class2: '', class3: '', class4: '' }}
  // onSubmit={async (values) => {
  //   await new Promise((resolve) => setTimeout(resolve, 500));
  //   alert(JSON.stringify(values, null, 2));
  // }}
>
  <Form>
    <Row>
    <Col lg={1} sm={12}>

      <FormLabel htmlFor="class1" className='labelForm'>Class Name</FormLabel>

    </Col>
      <Col lg={4} sm={12}>

  
        
        <Field as='select' name='class1' className="dropdownSubjects">
          <option value=''>Class Name</option>
          {/* {schoolOptions.map((school) => (
                  <option key={school.value} value={school.value}>
                    {school.label}
                  </option>
          ))} */}
        </Field>
      </Col>

      <Col lg={1} sm={12}>

      <FormLabel htmlFor="class1" className='labelForm'>Subject</FormLabel>

      </Col>
      <Col lg={4} sm={12}>
       
  
        <Field as='select' name='class2' className="dropdownSubjects">
          <option value=''>Subject</option>
          {/* Add the options for class 2 dropdown */}
        </Field>
      </Col>

      <Col lg={2} sm={12}>
     
      </Col>
    </Row>


    {/* SECOND ROW */}
    <Row>
    <Col lg={1} sm={12}>
        
    <FormLabel htmlFor="class1" className='labelForm'>Year</FormLabel>
    
         
        </Col>

      <Col lg={4} sm={12}>
        
      
  
        <Field as='select' name='class3' className="dropdownSubjects">
          <option value=''>Year</option>
          {/* Add the options for class 3 dropdown */}
        </Field>
      </Col>

      <Col lg={1} sm={12}>
        
        <FormLabel htmlFor="class1" className='labelForm'>Term</FormLabel>
        
             
      </Col>

      <Col lg={4} sm={12}>

      
  
     
        <Field as='select' name='class4' className="dropdownSubjects">
          <option value=''>Term</option>
          {/* Add the options for class 4 dropdown */}
        </Field>

        
      </Col>
      <Col lg={2} sm={12}>
      <Button className='btnViewResults' type='submit'>View Results</Button>
      </Col>

    </Row>
   
  </Form>
</Formik>
</Container >


{/* 
Results table */}



<Container fluid className='allTables '>
        <Row className='TableRoWUp'>

          <Col md={3} sm={6}>
            <p className='pAddStudent'>Total Students</p>
          </Col>
          <Col md={9} sm={6}>
            <form action="">
              <input type="text"
               />
            </form>
            
          </Col>

        </Row>
        <Row className='TableRoWDown'>
        
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

                <td>xx</td>
                <td>xx</td>
                <td>xx</td>
                <td>xx</td>
        {/* {
          listOfStudents.map((index, student) =>{
            return <tr >
               
              <td>{index.index_number}</td>
              <td>{index.index_number}</td>
              <td>{index.student_name}</td>
            </tr>
          })
        } */}
   
       
      </tbody>
    </Table>
           
        </Row>
      </Container>

      <Container fluid className='buttonGroup' >
        <Row>
          <Col lg={4} sm={12}>
          <Formik>
            <Form>
            <Button className='btnCrud' type='submit'>Save</Button>
            </Form>
          </Formik>

          </Col>
          <Col lg={4} sm={12}>
          <Formik>
            <Form>
            <Button className='btnCrud' type='submit'>Update</Button>
            </Form>
          </Formik>
            
          </Col>
          <Col lg={4} sm={12}>
          <Formik>
            <Form>
            <Button className='btnCrud' type='submit'>Delete</Button>
            </Form>
          </Formik>
            
          </Col>
        </Row>

      </Container>



      {/* ranges table */}

      <Container fluid className='subTopicsDiv'>

  <p className='subTopicsP'>Range Analysis</p>

  
</Container>
      <Container fluid className='allTables'>
        <Row className='TableRoWUp'>

        <Col lg={10} sm={12}>

        </Col>
          <Col lg={2} sm={12}>
          <Formik>
            <Form>
            <Button className='btnViewResults' type='submit'>Calculate Values</Button>
            </Form>
          </Formik>

          </Col>

        

        </Row>
        <Row className='TableRoWDown'>
        
            <Table striped bordered hover variant="light">
      <thead>
        <tr>
         
          <th>Range</th>
          <th>Number Of Students</th>
          <th>Percentage</th>

      
        </tr>
      </thead>
      <tbody>

             
                <td>xx</td>
                <td>xx</td>
                <td>xx</td>
        {/* {
          listOfStudents.map((index, student) =>{
            return <tr >
               
              <td>{index.index_number}</td>
              <td>{index.index_number}</td>
              <td>{index.student_name}</td>
            </tr>
          })
        } */}
   
       
      </tbody>
    </Table>
           
        </Row>
      </Container>
</div>
);
};

export default ManageSubjectResults;