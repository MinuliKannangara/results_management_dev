import React, { useEffect, useState } from 'react';
//import React from 'react';
import ButtonAppBar from '../NavBar/NavBar';
import './ManageStudentDetails.css';
import { Container, Row, Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


import axios, { Axios } from 'axios';






const ManageStudentDetails = () => {


  

  const[listOfStudents, setListOFStudents] = useState([]);

  const [indexNumber,setIndexNumber] = useState([]);
  const [name,setName] = useState([]);

  const submitStudentDetails = (e) => {
    e.preventDefault();
    const data = {
      index_number: parseInt(indexNumber),
      student_name: name,
    };
     
    axios.post('http://localhost:3001/studentDetails', data)
      .then(response => {
        setIndexNumber("");
        setName("");
        // Fetch the updated list of students
        axios.get('http://localhost:3001/studentDetails')
          .then((response) => {
            setListOFStudents(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log('Error creating event:', error);
      });
  };


  


  // useEffect(() => {
  //     axios.get('http://localhost:3001/studentDetails')
  //     .then((response) => {setListOFStudents(response.data)})
  //     .catch((error) => {console.log(error)});
      
  //     }, []);


    
  return (
    <div>
      <ButtonAppBar PageName="Manage Student Details" classesName="7-A" />

      
      


      <Container fluid className='div_aca_yr '>
        <Row>
          <Col md={3} sm={6} className="div_left_aca_yr">
            <p className='p_aca_yr'>Academic Year</p>
          </Col>
          <Col md={3} sm={6}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" className='customDropdown'>
                Select the Year
              </Dropdown.Toggle>

              <Dropdown.Menu className='customDropdown customDropdownItem' >
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={3} sm={6} className="div_left_aca_yr">
            <p className='p_aca_yr'>Class Name</p>
          </Col>
          <Col md={3} sm={6}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" className='customDropdown'>
                Select the Class Name
              </Dropdown.Toggle>

              <Dropdown.Menu className='customDropdown customDropdownItem' >
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>

      
      <Container fluid className='div_aca_yr divAddStudent'>
        <Form  onSubmit={submitStudentDetails}>
        <Row>
        <p className='pAddStudent'>Add New Students</p>
          <Col md={4} >
            <FloatingLabel controlId="floatingInputGrid" label="Enter Index Number">
              <Form.Control type="text" placeholder="Enter index number" value={indexNumber} onChange={(e) => setIndexNumber(e.target.value)} required />
            </FloatingLabel>
          </Col>
          <Col md={4}>
            <FloatingLabel controlId="floatingInputGrid" label="Enter Student Name">
            <Form.Control type="text" placeholder="Enter student name" value={name} onChange={(e) => setName(e.target.value)} required  />
              
            </FloatingLabel>
          </Col>
          <Col md={4}>
          <Button type ="submit" variant="light">ADD</Button>{' '}
          </Col>
          
        </Row>
        </Form>
      </Container>

    {/* student details table */}

      <Container fluid className='div_aca_yr divAddStudentTable'>
        <Row className='TableRoWUp'>

          <Col md={3}>
            <p className='pAddStudent'>Total Students</p>
          </Col>
          <Col md={9}>
            <form action="">
              <input type="text"
              value={listOfStudents.length} readOnly />
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
      
        </tr>
      </thead>
      <tbody>
        {
          listOfStudents.map((index, student) =>{
            return <tr key={student}>
              <td>{index.index_number}</td>
              <td>{index.index_number}</td>
              <td>{index.student_name}</td>
            </tr>
          })
        }
   
       
      </tbody>
    </Table>
           
        </Row>
      </Container>

      
    </div>
  )
}

export default ManageStudentDetails;
