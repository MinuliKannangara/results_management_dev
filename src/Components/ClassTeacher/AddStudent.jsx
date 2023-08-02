import React, { useEffect, useState, useContext } from 'react';
import './ManageStudentDetails.css';
import { Container, Row, Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../NavBar/NavBar';
import { AuthContext } from '../../helpers/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddStudents = () => {
  const { authState } = useContext(AuthContext);
  const CurrentYear = new Date().getFullYear();
  const username = authState.username;
  const Teacherclassname = authState.className;
  let navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        const indexNumber = document.getElementById('indexNumber').value;
        console.log(indexNumber)
    axios
        .get(`http://localhost:3001/studentDetails/suggestName/${indexNumber}/${username}`)
        .then((response) => {
            if (response.data && response.data) {
                setSuggestedName(response.data);
                console.log(response.data)
                document.getElementById('studentName').value = response.data;
            } else {
                setSuggestedName('');
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
}



  // For the GET method
  const [listOfStudents, setListOfStudents] = useState([]);

  // For the form values
  const [indexNumber, setIndexNumber] = useState('');
  const [name, setName] = useState('');

  // For the dropdowns
  const [selectedYear, setSelectedYear] = useState(CurrentYear);

  // For the suggested name
  const [suggestedName, setSuggestedName] = useState('');

  useEffect(() => {
    // Fetch the list of students on page load or when the selectedYear changes
    axios
      .get(`http://localhost:3001/studentDetails/${username}/${selectedYear}`)
      .then((response) => {
        if (response.data && response.data.StudentList) {
          setListOfStudents(response.data.StudentList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedYear, username]);

  // Function to fetch the suggested name based on the index number
//   const fetchSuggestedName = () => {
//     if (!indexNumber) {
//       setSuggestedName('');
//       return;
//     }

//     axios
//       .get(`http://localhost:3001/studentDetails/suggestName/${indexNumber}/${username}`)
//       .then((response) => {
//         if (response.data && response.data) {
//           setSuggestedName(response.data);
//           console.log(response.data)
//           document.getElementById('studentName').value = response.data;
//         } else {
//           setSuggestedName('');
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   // Call fetchSuggestedName whenever indexNumber changes
//   useEffect(() => {
//     fetchSuggestedName();
//   }, [indexNumber]);


  console.log(suggestedName)
  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

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
        // alert("Invalid student name. Student name cannot be empty.");
        
      axios
      .get(`http://localhost:3001/studentDetails/suggestName/${indexNumber}/${username}`)
      .then((response) => {
        if (response.data && response.data) {
          setSuggestedName(response.data);
          console.log(response.data)
          document.getElementById('studentName').value = response.data;
        } else {
          setSuggestedName('');
        }
      })
      .catch((error) => {
        console.log(error);
      });
        return;
      }

      axios
      .get(`http://localhost:3001/studentDetails/suggestName/${indexNumber}/${username}`)
      .then((response) => {
        if (response.data && response.data) {
          setSuggestedName(response.data);
          console.log(response.data)
          document.getElementById('studentName').value = response.data;
        } else {
          setSuggestedName('');
        }
      })
      .catch((error) => {
        console.log(error);
      });
      const data = {
        index_number: parseInt(indexNumber),
        student_name: name,
        year: CurrentYear,
       school_ID: authState.schoolID,
        class_name: Teacherclassname,
      };


    //   axios
    //   .get(`http://localhost:3001/studentDetails/suggestName/${indexNumber}/${username}`)
    //   .then((response) => {
    //     if (response.data && response.data) {
    //       setSuggestedName(response.data);
    //       console.log(response.data)
    //       document.getElementById('studentName').value = response.data;
    //     } else {
    //       setSuggestedName('');
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
      
    
    
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

 

  // Function to handle deleting a student
  const deleteStudent = (studentID) => {
    axios
      .delete(`http://localhost:3001/studentDetails/${studentID}`)
      .then((response) => {
        // Fetch the updated list of students
        axios
          .get(`http://localhost:3001/studentDetails/${username}/${selectedYear}`)
          .then((response) => {
            setListOfStudents(response.data.StudentList);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };

  return (
    <div>
      <NavBar PageName="Manage Student Details" classesName={Teacherclassname} showButtons={false} />

      <Container fluid className='divAllDropdown'>
        <Row>
          <p className='pAddStudent' style={{ fontSize: '27px', marginLeft: '550px' }}>
            Add Students
          </p>
        </Row>
      </Container>

      <Container fluid className='divAddStudent'>
        <Form >
          <Row>
            <Col md={4}>
              <FloatingLabel controlId='floatingInputGrid' label='Enter Index Number'>
                <Form.Control
                  type='text'
                  id='indexNumber'
                  placeholder='Enter index number'
                  value={indexNumber}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setIndexNumber(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Col>
            <Col md={4}>
              <FloatingLabel controlId='floatingInputGrid' label='Enter Student Name'>
                <Form.Control
                  type='text'
                  placeholder='Enter student name'
                  value={name}
                  id='studentName'
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {/* Display the suggested name */}
                {suggestedName && <p>Suggested Name: {suggestedName.name}</p>}
              </FloatingLabel>
            </Col>
            <Col md={4}>
              <Button type='submit' variant='light' onClick={handleSubmit} >
                ADD
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <Container fluid className='divAllDropdown divAddStudentTable'>
        <Row className='TableRoWUp'>
          <Col md={3}>
            <p className='pAddStudent'>Total Students</p>
          </Col>
          <Col md={9}>
            <input
              type='text'
              style={{
                width: '10%',
                alignItems: 'left',
                border: 'none',
                backgroundColor: 'transparent',
                color: '#000000',
                fontSize: '20px',
                fontWeight: 'bold',
              }}
              value={listOfStudents.length}
              readOnly
            />
          </Col>
        </Row>
        <Row className='TableRoWDown'>
          <Table variant='light'>
            <thead>
              <tr>
                <th style={{ width: '10px' }}>#</th>
                <th>Index Number</th>
                <th>Name</th>
                <th>Action</th>
                <th>Report Card</th>
              </tr>
            </thead>
            <tbody>
              {listOfStudents.map((student, index) => {
                return (
                  <tr key={student.student_ID}>
                    <td>{index + 1}</td>
                    <td>{student.index_number}</td>
                    <td>{student.student_name}</td>
                    <td>
                      <Button
                        variant='outline-primary'
                        style={{ fontSize: '15px', marginLeft: '2px', marginRight: '2px' }}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </Button>
                      <Button
                        variant='outline-primary'
                        style={{ fontSize: '15px', marginLeft: '2px', marginRight: '2px' }}
                        onClick={() => deleteStudent(student.student_ID)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant='outline-primary'
                        style={{ fontSize: '15px', marginLeft: '2px', marginRight: '2px' }}
                        onClick={() => {
                          navigate(`/Report Cards/${student.index_number}/${student.student_name}`);
                        }}>
                        <FontAwesomeIcon icon={faNewspaper} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );
};

export default AddStudents;
