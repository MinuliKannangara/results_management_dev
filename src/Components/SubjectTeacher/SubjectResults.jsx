import React, { useState, useEffect,useContext } from 'react';
import { Container, Row, Col, Button, FormLabel } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Table from 'react-bootstrap/Table';
import './SubjectTeacher.css';
import NavBar from '../NavBar/NavBar';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';

const ManageSubjectResults = () => {

  const {authState} = useContext(AuthContext);
  const username = authState.username; 

  const CurrentYear = new Date().getFullYear();

  const [StudentList, setStudentList] = useState([]);
  const [classNameList, setClassNameList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [Marks, setMarks] = useState([]);

  const [selectedYear, setSelectedYear] = useState(CurrentYear);
  const [selectedSubject, setSelectedSubject] = useState('History');
  const [selectedTerm, setSelectedTerm] = useState('1st Term');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubjectID, setselectedSubjectID] = useState(0);

  const [showAlert, setShowAlert] = useState(false);


  const [rangeValues, setRangeValues] = useState(null);

  //function to find the range analysis
  const findRangeValues =(markArray) =>{

    const marksArray = Object.values(markArray);
    let greaterThanEighty = 0;
    let between60and79 = 0;
    let between40and59 = 0;
    let between20and39 = 0;
    let lessthan19 = 0;
    let rangeAnalysis = {}; 
    let absent = 0;
    for(const mark of marksArray){
      if(mark>=80){
        greaterThanEighty = greaterThanEighty +1;
      }
      else if (mark<=79 && mark>=60){
        between60and79 =between60and79+1;
      }
      else if (mark<=59 && mark>=40){
        between40and59 =between40and59+1;
      }
      else if (mark<=39 && mark>=20){
        between20and39 =between20and39+1;
      }
      else if (mark<=19 && mark>=0){
        lessthan19 =lessthan19+1;
      } else{
        absent = absent+1;
      }
      
    }
    rangeAnalysis={
      greaterThanEighty:greaterThanEighty,
      between60and79:between60and79,
      between40and59:between40and59,
      between20and39:between20and39,
      lessthan19:lessthan19,
      absent:absent,
    }
    return rangeAnalysis;
  }


  const handleCalculateValues = (marks) => {
    const calculatedRangeValues = findRangeValues(marks);
    setRangeValues(calculatedRangeValues);
  };



  //when the teacher add new mark or change the mark in the table rows
  const handleMarksChange = (studentID, index, event) => {
    const { textContent } = event.target;
    let parsedMarks;

    
    if (textContent === "ab") {
      parsedMarks = -1;
    } else {
      parsedMarks = parseInt(textContent);
      // Check if the parsed marks value is not NaN (not a number)
      if (isNaN(parsedMarks)) {
        setShowAlert(true);
        return;
      }
      // Check if the parsed marks value is within the range of 0 to 100
      if (parsedMarks < 0 || parsedMarks > 100) {
        console.log("Invalid mark: Out of range (0 to 100)");
        setShowAlert(true);
        return;
      }
    }
  
   // Checks if the parsed marks value is not NaN (not a number). ((validation ensures that only valid numeric values are handled.)
    // if (!isNaN(parsedMarks)) {

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
//       if (Marks.hasOwnProperty(studentID) && Marks[studentID][index]) {
// console.log("Update mark");
//         axios
//           .put("http://localhost:3001/subject/SubjectResults", data)
//           .then((response) => {
//             console.log("updated");
//             console.log(response.data);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       } else {
//         console.log("New mark");
//         axios
//           .post("http://localhost:3001/subject/SubjectResults", data)
//           .then((response) => {
//             console.log("giya");
//             console.log(response.data);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       }
console.log(data);
          axios
          .post("http://localhost:3001/subject/SubjectResults", data)
          .then((response) => {
            console.log(response.data);
            console.log("giya");
          })
          .catch((error) => {
            console.log(error);
          });
      setTimeout(() => {
        setShowAlert(false);
      }, 60);
  };
  
  
  useEffect(() => {
    axios.get(`http://localhost:3001/classDetails/getClasses/${username}`).then((response) => {
      setClassNameList(response.data);
    });

    axios
      .get(`http://localhost:3001/subject/SubjectDetails/${selectedYear}/${selectedClass}/${username}/${selectedSubject}/${selectedTerm}`)
      .then((response) => {
        setStudentList(response.data.studentNames);
        // setClassNameList(response.data.classes);
        setSubjectList(response.data.subjectNames);
        setMarks(response.data.subjectResults);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedYear, selectedClass, username, selectedSubject, selectedTerm ]);

  return (
    <div>
      <NavBar PageName="Manage Subject Results" 
      showButtons={false}/>

      <Container fluid className="topDiv">
        <p className="pTopDiv">Subject Results</p>
      </Container>

      <Container className="DropdownDiv2">

        <Row>
          <Col lg={1} sm={12} >
            <FormLabel htmlFor="class1" className="labelForm">
              Class Name
            </FormLabel>
          </Col>

          <Col lg={5} sm={12}>
          <DropdownButton
  className="customDropdownButton"
  id="dropdown-button-dark-example1"
  variant="outline-success"
  title={`${selectedClass}`}
  bg="light"
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
              variant="outline-success"
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
          <DropdownButton className='customDropdownButton' id="dropdown-basic-button" title={`${selectedYear}`} variant="outline-success" >
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
            <DropdownButton className="customDropdownButton" id="dropdown-basic-button" title={`${selectedTerm}`} variant="outline-success">
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
            <p className="pAddStudent" style={{fontSize:"15px", marginLeft:"-4px"}}>Total Students: <b>{StudentList.length}</b></p>
          </Col>
          <Col md={9} sm={6}>
      
    
          </Col>
        </Row>
        <Row className="TableRoWDown">
        {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          Invalid mark! Please enter a valid numeric value between 0 and 100.
        </Alert>
      )}
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
{/* 
      <Container fluid className="subTopicsDiv">
        <p className="subTopicsP">Range Analysis</p>
      </Container> */}

      <Container fluid className="allTables">
        <Row>
        <p className="subTopicsP" style={{marginBottom:"0px"}}>Range Analysis</p>
        </Row>
        <Row className="TableRoWUp">
          <Col lg={10} sm={12}></Col>
          <Col lg={2} sm={12}>
            <Button variant="success" className="btnViewResults" onClick={() => handleCalculateValues(Marks)}>
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
                <td>0-19</td>
                <td>{rangeValues && rangeValues.lessthan19}</td>
                <td>{rangeValues && `${Math.round((rangeValues.between20and39 / StudentList.length) * 100)}%`}</td>
              </tr>
            <tr>
                <td>20-39</td>
                <td>{rangeValues && rangeValues.between20and39}</td>
                <td>{rangeValues && `${Math.round((rangeValues.between20and39 / StudentList.length) * 100)}%`}</td>
              </tr>
              <tr>
                <td>40-59</td>
                <td>{rangeValues && rangeValues.between40and59}</td>
                <td>{rangeValues && `${Math.round((rangeValues.between40and59 / StudentList.length) * 100)}%`}</td>
              </tr>
              <tr>
                <td>60-79</td>
                <td>{rangeValues && rangeValues.between60and79}</td>
                <td>{rangeValues && `${Math.round((rangeValues.between60and79 / StudentList.length) * 100)}%`}</td>
              </tr>
              <tr>
                <td>More than 80</td>
                <td>{rangeValues && rangeValues.greaterThanEighty}</td>
                <td>{rangeValues && `${Math.round((rangeValues.greaterThanEighty / StudentList.length) * 100)}%`}</td>
              </tr>
              <tr>
                <td>Absent</td>
                <td>{rangeValues && rangeValues.absent}</td>
                <td>{rangeValues && `${Math.round((rangeValues.absent / StudentList.length) * 100)}%`}</td>
              </tr>

          </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );
};

export default ManageSubjectResults;
