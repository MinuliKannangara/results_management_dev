import React, { useEffect, useState,useContext} from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import './GreadHead.css';
import { Button } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';

function UploadExaminationResults() {
  const currentYear = new Date().getFullYear();
  const {authState} = useContext(AuthContext);
  const schoolID = authState.schoolID;

  //to get data from the database
  const [subjects, setSubjects] = useState([]);
  const [storedResults, setStoredResults] = useState([]);

  //to store the marks filled by the user
  const [marks, setMarks] = useState([]);

  const initialValues = {
    satCount:0,
    passCount:0,
    school_ID:schoolID,
    examination_name:"O/L",
  }
  const [FormVlaues, setFormValues] = useState(initialValues);

  useEffect(() => {
    axios.get(`http://localhost:3001/OLResults/${schoolID}/${currentYear}`).then((response) => {
      setSubjects(response.data.subjectList);
      setStoredResults(response.data.results);
    });
  }, []);


  useEffect(() => {
    setMarks(subjects.map((subject) => ({ subject_ID: subject.subject_ID, A: 0, B: 0, C: 0, S: 0, W: 0, Absent: 0,sat: 0 , pass: 0})));
  }, [subjects,currentYear]);

  const handleMarksChange = (subjectID, type, value) => {
    setMarks((prevMarks) => {
      const updatedMarks = prevMarks.map((mark) =>
        mark.subject_ID === subjectID ? { ...mark, [type]: value } : mark
      );
      return updatedMarks;
    });
  };

  const uploadMarks = () => {
 
// Validation
for (const mark of marks) {
  if (
    isNaN(mark.A) || mark.A < 0 ||
    isNaN(mark.B) || mark.B < 0 ||
    isNaN(mark.C) || mark.C < 0 ||
    isNaN(mark.S) || mark.S < 0 ||
    isNaN(mark.W) || mark.W < 0 ||
    isNaN(mark.Absent) || mark.Absent < 0 ||
    isNaN(mark.sat) || mark.sat < 0 ||
    isNaN(mark.pass) || mark.pass < 0
  ) {
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
}
    const results = subjects.map((subject) => ({
      subjectID: subject.subject_ID,
      ...marks.find((mark) => mark.subject_ID === subject.subject_ID),
    }));

    console.log("Data to be uploaded:", results);

    axios.post('http://localhost:3001/OLResults', {
      year: currentYear,
      schoolID: schoolID,
      results: results,
    }).then((response) => {
      if (!response.data.error) {
     
        document.getElementById("btn").classList.remove("btn-outline-primary");
        document.getElementById("btn").classList.add("btn-outline-success");
        document.getElementById("btn").innerHTML = "Submitted";
        setTimeout(() => {
          document.getElementById("btn").classList.remove("btn-outline-success");
          document.getElementById("btn").classList.add("btn-outline-primary");
          document.getElementById("btn").innerHTML = "Submit";
        }, 3000);
         } else {
           document.getElementById("btn").classList.remove("btn-outline-primary");
       document.getElementById("btn").classList.add("btn-outline-danger");
       document.getElementById("btn").innerHTML = "Check data and Retry";
       setTimeout(() => {
        document.getElementById("btn").classList.remove("btn-outline-success");
        document.getElementById("btn").classList.add("btn-outline-primary");
        document.getElementById("btn").innerHTML = "Submit";
      }, 3000);
         }
       })
       .catch((error) => {
        console.error("Error:", error);
      });
  };

  //for the form
  const handleChange = (e) =>{

    const { name, value } = e.target;
    setFormValues({ ...FormVlaues, [name]: parseInt(value) });
  }

  const submitCounts = (e) => {
    e.preventDefault();
      // validation
      if (FormVlaues.satCount <= 0 || FormVlaues.passCount <= 0) {
      
        document.getElementById("btn2").classList.remove("btn-outline-primary");
        document.getElementById("btn2").classList.add("btn-outline-danger");
        document.getElementById("btn2").innerHTML = "Please enter valid values for Sat Count and Pass Count";
        setTimeout(() => {
          document.getElementById("btn2").classList.remove("btn-outline-danger");
          document.getElementById("btn2").classList.add("btn-outline-primary");
          document.getElementById("btn2").innerHTML = "Submit";
        }, 3000);
        return;
      } else if(FormVlaues.satCount<FormVlaues.passCount){
        document.getElementById("btn2").classList.remove("btn-outline-primary");
        document.getElementById("btn2").classList.add("btn-outline-danger");
        document.getElementById("btn2").innerHTML = "Invalid Inputs";
        setTimeout(() => {
          document.getElementById("btn2").classList.remove("btn-outline-danger");
          document.getElementById("btn2").classList.add("btn-outline-primary");
          document.getElementById("btn2").innerHTML = "Submit";
        }, 3000);
      }

    axios
      .post('http://localhost:3001/NationalExaminationDetails/NExamCounts',{
        counts: FormVlaues,
        year:currentYear,
        examName: "O/L",
      })
      .then((response) => {
        console.log("Response from server:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
       <NavBar
        PageName="Upload National Examination Results"
        Tab1="O/L Examination Results"
        Tab2="A/L Examination Results"
        Tab3="Grade 5 Scholarship Results"
        Tab1Link="/Upload National Examination Results"
        Tab2Link="/Upload AL Examination Results"
        Tab3Link="/Upload Scholarship Results"
        showButtons={true}
      />

      <Container fluid className="div_aca_yr divAddStudentTable">
        <Row>
        <p className='pTopDiv' style={{marginLeft:"500px"}}>O/L Examination Results</p>
        </Row>
        <Row className="TableRoWUp">
          <Col md={2} sm={6}></Col>
        </Row>
        <Row className="TableRoWDown">
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>#</th>
                <th>Subject </th>
                <th>A passes</th>
                <th>B passes</th>
                <th>C passes</th>
                <th>S passes</th>
                <th>W passes</th>
                <th>Absent</th> 
                <th> Number Of Sat</th>
                <th>Number Of Pass</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{subject.subject}</td>
                  <td
                    contentEditable="true"
                    onBlur={(event) => handleMarksChange(subject.subject_ID, 'A', parseInt(event.target.textContent))}
                  >
                    
                      {
                        storedResults.map((result) => {
                          if (result.subject_ID === subject.subject_ID) {
                            return result.A_Passes;
                          } else {
                            return null; // or any other fallback value
                          }
                        })
                      }
                     
                  </td>
                  <td
                    contentEditable="true"
                    onBlur={(event) => handleMarksChange(subject.subject_ID, 'B', parseInt(event.target.textContent))}
                  >
                    {storedResults.map((result) =>{
                      if (result.subject_ID === subject.subject_ID){
                        return result.B_Passes                     }
                    })}
                  </td>
                  <td
                    contentEditable="true"
                    onBlur={(event) => handleMarksChange(subject.subject_ID, 'C', parseInt(event.target.textContent))}
                  >
                    {storedResults.map((result) =>{
                      if(result.subject_ID === subject.subject_ID){
                        return result.C_Passes
                      }
                    })}
                  </td>
                  <td
                    contentEditable="true"
                    onBlur={(event) => handleMarksChange(subject.subject_ID, 'S', parseInt(event.target.textContent))}
                  >
                     {storedResults.map((result) =>{
                      if(result.subject_ID === subject.subject_ID){
                        return result.S_Passes
                      }
                    })}
                  </td>
                  <td
                    contentEditable="true"
                    onBlur={(event) => handleMarksChange(subject.subject_ID, 'W', parseInt(event.target.textContent))}
                  >
                      {storedResults.map((result) =>{
                      if(result.subject_ID === subject.subject_ID){
                        return result.W_Passes
                      }
                    })}
                  </td>
                  <td
                    contentEditable="true"
                    onBlur={(event) => handleMarksChange(subject.subject_ID, 'Absent', parseInt(event.target.textContent))}
                  >
                      {storedResults.map((result) =>{
                      if(result.subject_ID === subject.subject_ID){
                        return result.absent
                      }
                    })}
                  </td>
                  <td
                  contentEditable="true"
                  onBlur={(event) => handleMarksChange(subject.subject_ID, 'sat', parseInt(event.target.textContent))}
                  >
                      {storedResults.map((result) =>{
                      if(result.subject_ID === subject.subject_ID){
                        return result.NumOfSat
                      }
                    })}
                  </td>
                  <td
                  contentEditable="true"
                  onBlur={(event) => handleMarksChange(subject.subject_ID, 'pass', parseInt(event.target.textContent))}
                  >
                      {storedResults.map((result) =>{
                      if(result.subject_ID === subject.subject_ID){
                        return result.NumOfPass
                      }
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
         
          <Button variant="outline-primary" size="lg" id='btn'  onClick={uploadMarks}>
            Upload
          </Button>
        </Row>

        <Row style={{border:"3px solid black", margin:"13px 4px 13px 4px", padding:"10px"}}>
          <Form onSubmit={submitCounts}>
      <Form.Label htmlFor="inputPassword5">Total Sat Count</Form.Label>

      <Form.Control type="number" placeholder="Enter sat count here.."  name="satCount" onChange={handleChange} />
      {FormVlaues.satCount <= 0 && <p className="error-message">Sat Count must be greater than 0.</p>}
      <br />
      <Form.Label htmlFor="inputPassword5">Total Pass Count</Form.Label>
    
      <Form.Control type="number" placeholder="Enter pass count here.." name="passCount" onChange={handleChange} />
      {FormVlaues.passCount <= 0 && <p className="error-message">Pass Count must be greater than 0.</p>}
     <br />
     <Button type="submit" variant="outline-primary" id='btn2'>Submit</Button>
     
    </Form>
          </Row>
      </Container>
    </div>
  );
}

export default UploadExaminationResults;
