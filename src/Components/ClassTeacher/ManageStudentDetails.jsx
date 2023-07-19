import React, { useEffect, useState } from 'react';
//import React from 'react';
import ButtonAppBar from '../NavBar/NavBarwrong';
import './ManageStudentDetails.css';
import { Container, Row, Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import NavBar from '../NavBar/NavBar';



import axios, { Axios } from 'axios';






const ManageStudentDetails = () => {


  const CurrentYear = new Date().getFullYear();
  const username = "laksika"
  // users school ID
  const schoolId = 1
  

    //const username = localStorage.getItem('user');

 
//for the get method
const [listOfStudents, setListOfStudents] = useState([]);

//for the form values
const [indexNumber, setIndexNumber] = useState([]);
const [name, setName] = useState([]);

//for the dropdowns
const [selectedYear, setSelectedYear] = useState(CurrentYear);
const [selectedClass, setSelectedClass] = useState("");

useEffect(() => {
  axios.get(`http://localhost:3001/studentDetails/${selectedYear}`)
  .then((response) => {
    setListOfStudents(response.data.StudentList);
    setSelectedClass(response.data.userClass);
  })
  .catch((error) => {
    console.log(error);
  });
}, [selectedYear]);


// for the ADD button
const submitStudentDetails = (e) => {
  e.preventDefault();
  const data = {
    index_number: parseInt(indexNumber),
    student_name: name,
    year: selectedYear,
    school_ID: schoolId,
    class_name: selectedClass,
  };
  


  axios.post('http://localhost:3001/studentDetails', data)
     .then((response) => {
     // Clear the input fields
     setIndexNumber("");
     setName("");
      //Fetch the updated list of students
      axios.get(`http://localhost:3001/studentDetails/${username}/${selectedYear}`)
      .then((response) => {
        setListOfStudents(response.data.StudentList);
        setSelectedClass(response.data.userClass);
      })
      .catch((error) => {
        console.log(error);
      });
    
    })
    .catch((error) => {
      console.log('Error creating student:', error);
    });
};

//fro the delete button
const deleteStudent = (studentID) => {

  axios.delete(`http://localhost:3001/studentDetails/${studentID}`)
  .then((response) => {
    //Fetch the updated list of students
    axios.get(`http://localhost:3001/studentDetails/${username}/${selectedYear}`)
    .then((response) => {
      setListOfStudents(response.data.StudentList);
      setSelectedClass(response.data.userClass);
    })
    .catch((error) => {
      console.log(error);
    });
  });
};


    
  return (
    <div>
      {/* <ButtonAppBar PageName="Manage Student Details" classesName="7-A" /> */}

      <NavBar PageName="Manage Student Details" classesName="7-A" />

      <Container fluid className='divAllDropdown '>
        <Row>
          <Col md={3} sm={6}>
            <p className='pLables'>Academic Year</p>
          </Col>
          <Col md={3} sm={6}>
          <DropdownButton className='customDropdownButton' id="dropdown-basic-button" title={`${selectedYear}`} >
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear)}>{CurrentYear}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-1)}>{CurrentYear-1}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-2)}>{CurrentYear-2}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-3)}>{CurrentYear-3}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-4)}>{CurrentYear-4}</Dropdown.Item>
      
    
    </DropdownButton>
          </Col>
         
         
        </Row>
      </Container>

      
      <Container fluid className=' divAddStudent'>
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
          <Button type ="submit" variant="light">ADD</Button>
          </Col>
          
        </Row>
        </Form>
      </Container>

    {/* student details table */}

      <Container fluid className='divAllDropdown divAddStudentTable'>
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
          <th style={{width:"10px"}}>#</th>
          <th>Index Number</th>
          <th>Name</th>
          <th>Action</th>
      
        </tr>
      </thead>
      <tbody>
        {
          listOfStudents.map((index, student) =>{
            return <tr key={student}>
              <td>{student + 1}</td>
              <td>{index.index_number}</td>
              <td>{index.student_name}</td>
            
              <td>  <Button
                    variant="outline-primary"
                    style={{ fontSize: "15px", marginLeft: "2px", marginRight: "2px" }}
                   
                    >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
              <Button variant="outline-primary" style={{ fontSize: "15px", marginLeft: "2px", marginRight:"2px" }}
               onClick={() => deleteStudent(index.student_ID)}>
              <FontAwesomeIcon  icon={faTrash} />
              </Button>
              
              </td>
              
            </tr>
          })
        }
   
       
      </tbody>
    </Table>
           
        </Row>
      </Container>

      
      <Container fluid >
        <Row>
          <Col lg={4} sm={12}>
         <Form>
             {/* <Button variant="primary" className='btnCrudGroup'>Save</Button>{' '} */}
         </Form>
          </Col>
          <Col lg={4} sm={12}>
          <Form>
          {/* <Button variant="primary"  className='btnCrudGroup'>Update</Button>{' '} */}
         </Form>
            
          </Col>
          <Col lg={4} sm={12}>
          <Form>
          <Button variant="primary"  className='btnCrudGroup'>Clear</Button>{' '}
          </Form>
            
          </Col>
        </Row>

      </Container>

      
    </div>
  )
}

export default ManageStudentDetails;
