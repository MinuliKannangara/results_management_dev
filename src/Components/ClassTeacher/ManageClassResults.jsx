import React, { useEffect, useState } from 'react';
import ButtonAppBar from '../NavBar/NavBarwrong';
import './ManageStudentDetails.css';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Formik, Field, Form } from "formik";
import { Button } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';

import axios, { Axios } from 'axios';


const ManageClassResults = () => {

  

  // write the code to get the user name of the user
  // const username = localStorage.getItem('username');
  const enteredUsername = "laksika"; 
  const year = new Date().getFullYear();
  const term = "1st Term";
  
const [classname, setClassName] = useState({});
const [subjectsForTable, setSubjectsForTable] = useState([]);
const [nameList, setNameList] = useState([]);
const [resultOfStudents, setResultOfStudents] = useState([]);

   useEffect(()=> {
    axios.get(`http://localhost:3001/classDetails/classOfUser/${enteredUsername}/${year}/${term}`).then((response) => {
      setClassName(response.data);
      setSubjectsForTable(response.data.subjectNames);
      setNameList(response.data. studentsNames);
      setResultOfStudents(response.data.resultsOfEachStudent)
      console.log(response.data);})
  

    .catch((error) => {console.log(error)});
   },[]);


return (
<div>
  
{/* <ButtonAppBar PageName="Manage Class Results" /> */}
<NavBar PageName="Manage Class Results" />


<Container fluid className='topDiv '>
        
         <p className='pTopDiv'>Results Sheet - {classname?.className}, year ekatai term ekatai dropdown</p>
         
      
      </Container>

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
      {subjectsForTable.map((subject, index) => (
        <th key={index}>{subject}</th>
      ))}
      <th>Total</th>
      <th>Average</th>
      <th>Rank</th>
    </tr>
  </thead>
  <tbody>
    {nameList.map((name, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{name.index_number}</td>
        <td>{name.student_name}</td>
        {subjectsForTable.map((subject, subjectIndex) => (
          <td key={subjectIndex}>
            {resultOfStudents[name.index_number] &&
              resultOfStudents[name.index_number][subject] &&
              resultOfStudents[name.index_number][subject].join(", ")}
          </td>
        ))}
        <td>Total Value</td>
        <td>Average Value</td>
        <td>Rank Value</td>
      </tr>
    ))}
  </tbody>
</Table>

   
           
        </Row>
      </Container>

</div>
);
};

export default ManageClassResults;