import React, { useEffect, useState, useContext } from 'react';
import './ManageStudentDetails.css';
import { Container, Row, Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash,faNewspaper} from '@fortawesome/free-solid-svg-icons'
import NavBar from '../NavBar/NavBar';
import { AuthContext } from '../../helpers/AuthContext';
import {useNavigate} from 'react-router-dom';


import axios, { Axios } from 'axios';

const ManageStudentDetails = () => {

const {authState} = useContext(AuthContext);
  const CurrentYear = new Date().getFullYear();
  const username = authState.username;
  const Teacherclassname = authState.className;
  let navigate = useNavigate();


 
//for the get method
const [listOfStudents, setListOfStudents] = useState([]);

//for the form values
const [indexNumber, setIndexNumber] = useState('');
const [name, setName] = useState('');
//for the dropdowns
const [selectedYear, setSelectedYear] = useState(CurrentYear);
// const [selectedClass, setSelectedClass] = useState("");

useEffect(() => {
  axios.get(`http://localhost:3001/studentDetails/${username}/${selectedYear}`)
    .then((response) => {
      if (response.data && response.data.StudentList) {
        setListOfStudents(response.data.StudentList);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}, [selectedYear]);



// for the ADD button
const submitStudentDetails = (e) => {
  e.preventDefault();
   // Validate inputs before submitting
   if (isNaN(parseInt(indexNumber)) || parseInt(indexNumber) <= 0) {
    alert("Invalid index number. Index number must be a positive number.");
    document.getElementById("btn").classList.remove("btn-outline-primary");
    document.getElementById("btn").classList.add("btn-outline-danger");
    document.getElementById("btn").innerHTML = "Invalid Input ";
    setTimeout(() => {
      document.getElementById("btn").classList.remove("btn-outline-danger");
      document.getElementById("btn").classList.add("btn-outline-primary");
      document.getElementById("btn").innerHTML = "Submit";
    }, 2000);
    return;
  }

  if (name.trim() === "") {
    alert("Invalid student name. Student name cannot be empty.");
    return;
  }
  const data = {
    index_number: parseInt(indexNumber),
    student_name: name,
    year: selectedYear,
   school_ID: authState.schoolID,
    class_name: Teacherclassname,
  };
  


  axios.post('http://localhost:3001/studentDetails', data,)
     .then((response) => {
      if(response.data.error) {
        console.log(response.data.error);
      }
     // Clear the input fields
     setIndexNumber("");
     setName("");
      //Fetch the updated list of students
      axios.get(`http://localhost:3001/studentDetails/${username}/${selectedYear}`)
      .then((response) => {
        if (response.data && response.data.StudentList) {
          setListOfStudents(response.data.StudentList);
          //setSelectedClass(response.data.userClass);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    
    })
    .catch((error) => {
      console.log('Error creating student:', error);
    });
};

//for the delete button
const deleteStudent = (studentID) => {

  axios.delete(`http://localhost:3001/studentDetails/${studentID}`)
  .then((response) => {
    //Fetch the updated list of students
    axios.get(`http://localhost:3001/studentDetails/${username}/${selectedYear}`)
    .then((response) => {
      setListOfStudents(response.data.StudentList);
      //setSelectedClass(response.data.userClass);
    })
    .catch((error) => {
      console.log(error);
    });
  });
};


    
  return (
    <div>
      {/* <ButtonAppBar PageName="Manage Student Details" classesName="7-A" /> */}

      <NavBar PageName="Manage Student Details" classesName = {Teacherclassname}
      showButtons={false} />

      <Container fluid className='divAllDropdown '>
        <Row>
        <p className='pAddStudent' style={{fontSize:"27px", marginLeft:"550px"}}>Register New Students</p>
         
        </Row>
      </Container>

      
      <Container fluid className=' divAddStudent'>
      <Row>
          <Col md={3} sm={6}>
            <p className='pLables' style={{marginLeft:"10px"}}>Year</p>
          </Col>
          <Col md={3} sm={6} style={{marginLeft:"-300px"}}>
          <DropdownButton className='customDropdownButton' variant="outline-success" id="dropdown-basic-button" title={`${selectedYear}`} >
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear)}>{CurrentYear}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-1)}>{CurrentYear-1}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-2)}>{CurrentYear-2}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-3)}>{CurrentYear-3}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-4)}>{CurrentYear-4}</Dropdown.Item>
      
    
    </DropdownButton>
          </Col>
         
         
        </Row>
        <Form  onSubmit={submitStudentDetails}>
        <Row>
      
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
          <input type="text" 
              style={{width:'10%', alignItems:'left', border:'none', 
              backgroundColor:'transparent', color:'#000000', fontSize:'20px', fontWeight:'bold'}}
              value={listOfStudents.length}readOnly 
               />
         
          </Col>

        </Row>
        <Row className='TableRoWDown'>
        
            <Table variant="light">
      <thead>
        <tr>
          <th style={{width:"10px"}}>#</th>
          <th>Index Number</th>
          <th>Name</th>
          <th>Action</th>
          <th>Report Card</th>
      
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
              <td> 
              <Button variant="outline-primary" style={{ fontSize: "15px", marginLeft: "2px", marginRight:"2px" }}
               onClick={() =>{ navigate(`/Report Cards/${index.index_number}/${index.student_name}`)}}>
              <FontAwesomeIcon icon={faNewspaper} />
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
          
            
          </Col>
        </Row>

      </Container>

      
    </div>
  )
}

export default ManageStudentDetails;
