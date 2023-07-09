import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, FormLabel } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Table from 'react-bootstrap/Table';
import './SubjectTeacher.css';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';

const ManageSubjectResults = () => {
  const username = 'laksika';
  //const selectedClassw = '7-A';

  const CurrentYear = new Date().getFullYear();

  const [StudentList, setStudentList] = useState([]);
  const [classNameList, setClassNameList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [Marks, setMarks] = useState([]);

  const [selectedYear, setSelectedYear] = useState(CurrentYear);
  const [selectedSubject, setSelectedSubject] = useState('History');
  const [selectedTerm, setSelectedTerm] = useState('1st Term');
  const [selectedClass, setSelectedClass] = useState('7-A');
  const [selectedSubjectID, setselectedSubjectID] = useState(0);


  //when the teacher add new mark or change the mark in the table rows
  const handleMarksChange = (studentID, index, event) => {
    const { textContent } = event.target;
    const parsedMarks = parseInt(textContent);
  
    if (!isNaN(parsedMarks)) {
      setMarks((prevMarks) => {
        const updatedMarks = { ...prevMarks };
  
        if (updatedMarks.hasOwnProperty(studentID)) {
          updatedMarks[studentID][index] = parsedMarks;
        } else {
          updatedMarks[studentID] = [parsedMarks];
        }
  
        return updatedMarks;
      });
  
      const data = {
        year: selectedYear,
        term: selectedTerm,
        marks: parsedMarks,
        student_ID: studentID,
        subject_ID: selectedSubjectID,
      };
  
      // Check if the mark already exists for the student
      if (Marks.hasOwnProperty(studentID) && Marks[studentID][index]) {
        // Use axios.put for updating the existing mark
        axios
          .put("http://localhost:3001/subject/SubjectResults", data)
          .then((response) => {
            // Handle the response if needed
            console.log(response.data);
          })
          .catch((error) => {
            // Handle the error if needed
            console.log(error);
          });
      } else {
        // Use axios.post for adding a new mark
        axios
          .post("http://localhost:3001/subject/SubjectResults", data)
          .then((response) => {
            // Handle the response if needed
            console.log(response.data);
          })
          .catch((error) => {
            // Handle the error if needed
            console.log(error);
          });
      }
    }
  };
  
  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/subject/SubjectDetails/${selectedYear}/${selectedClass}/${username}/${selectedSubject}/${selectedTerm}`)
      .then((response) => {
        setStudentList(response.data.studentNames);
        setClassNameList(response.data.classes);
        setSubjectList(response.data.subjectNames);
        setMarks(response.data.subjectResults);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedYear, selectedClass, username, selectedSubject, selectedTerm ]);

  return (
    <div>
      <NavBar PageName="Manage Subject Results" />

      <Container fluid className="topDiv">
        <p className="pTopDiv">Subject Results</p>
      </Container>

      <Container fluid className="subTopicsDiv">
        <p className="subTopicsP">Upload Marks</p>
      </Container>

      <Container className="DropdownDiv2">

        <Row>
          <Col lg={1} sm={12}>
            <FormLabel htmlFor="class1" className="labelForm">
              Class Name
            </FormLabel>
          </Col>

          <Col lg={5} sm={12}>
          <DropdownButton
  className="customDropdownButton"
  id="dropdown-basic-button"
  title={`${selectedClass}`}
>
  {/* use Set data structure to get the distinct values of the class names */}
  {[...new Set(classNameList.map((classes) => classes.class_name))].map((className) => (
    <Dropdown.Item
      key={className}
      className="customDropdown"
      onClick={() => setSelectedClass(className)}
    >
      {className}
    </Dropdown.Item>
  ))}
</DropdownButton>


            
          </Col>
          <Col lg={1} sm={12}>
            <FormLabel htmlFor="class1" className="labelForm">
              Subject
            </FormLabel>
          </Col>
          <Col lg={5} sm={12}>
            <DropdownButton
              className="customDropdownButton"
              id="dropdown-basic-button"
              title={`${selectedSubject}`}
            >
              {subjectList.map((index,subject) => (
                <Dropdown.Item
                  key={subject}
                  className="customDropdown"
                  onClick={() => {
                    setSelectedSubject(index.subject);
                    setselectedSubjectID(index.subject_ID);
                  }}
                >
                  {index.subject}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
     
        </Row>

        <Row>
          <Col lg={1} sm={12}>
            <FormLabel htmlFor="class1" className="labelForm">
              Year
            </FormLabel>
          </Col>
          <Col lg={5} sm={12}>
          <DropdownButton className='customDropdownButton' id="dropdown-basic-button" title={`${selectedYear}`} >
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear)}>{CurrentYear}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-1)}>{CurrentYear-1}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-2)}>{CurrentYear-2}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-3)}>{CurrentYear-3}</Dropdown.Item>
      <Dropdown.Item className='customDropdown'  onClick={() => setSelectedYear(CurrentYear-4)}>{CurrentYear-4}</Dropdown.Item>
      
    
    </DropdownButton>
          </Col>
          <Col lg={1} sm={12}>
            <FormLabel htmlFor="class1" className="labelForm">
              Term
            </FormLabel>
          </Col>
          <Col lg={5} sm={12}>
            <DropdownButton className="customDropdownButton" id="dropdown-basic-button" title={`${selectedTerm}`}>
            <Dropdown.Item className="customDropdown" onClick={() => setSelectedTerm("1st Term")}> 1st Term </Dropdown.Item>
            <Dropdown.Item className="customDropdown" onClick={() => setSelectedTerm("2nd Term")}> 2nd Term </Dropdown.Item>
            <Dropdown.Item className="customDropdown" onClick={() => setSelectedTerm("3rd Term")}> 3rd Term </Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col lg={2} sm={12}>
            
          </Col>
        </Row>
      </Container>

      <Container fluid className="allTables ">
        <Row className="TableRoWUp">
          <Col md={3} sm={6}>
            <p className="pAddStudent">Total Students</p>
          </Col>
          <Col md={9} sm={6}>
            <form action="">
              <input type="text" value={StudentList.length} readOnly />
            </form>
          </Col>
        </Row>
        <Row className="TableRoWDown">
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
              {/* Render the student list */}
              {StudentList.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.index_number}</td>
                  <td>{student.student_name}</td>
                  <td
        contentEditable="true"
        onBlur={(event) =>
          handleMarksChange(student.student_ID, 0, event)
        }
      >
        {Marks[student.student_ID] ? Marks[student.student_ID][0] : ''}
      </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>

      <Container fluid className="subTopicsDiv">
        <p className="subTopicsP">Range Analysis</p>
      </Container>

      <Container fluid className="allTables">
        <Row className="TableRoWUp">
          <Col lg={10} sm={12}></Col>
          <Col lg={2} sm={12}>
            <Button className="btnViewResults" type="submit">
              Calculate Values
            </Button>
          </Col>
        </Row>
        <Row className="TableRoWDown">
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Range</th>
                <th>Number Of Students</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>xx</td>
                <td>xx</td>
                <td>xx</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );
};

export default ManageSubjectResults;
