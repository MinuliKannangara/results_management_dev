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

  const [selectedYear, setSelectedYear] = useState(currentYear);

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
  const [FormVlaues, setFormValues] = useState(initialValues)

  useEffect(() => {
    axios.get(`http://localhost:3001/OLResults/${schoolID}/${selectedYear}`).then((response) => {
      setSubjects(response.data.subjectList);
      setStoredResults(response.data.results);
    });
  }, [selectedYear]);

console.log("stored results",storedResults);

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
    const results = subjects.map((subject) => ({
      subjectID: subject.subject_ID,
      ...marks.find((mark) => mark.subject_ID === subject.subject_ID),
    }));

    console.log("Data to be uploaded:", results);

    axios.post('http://localhost:3001/OLResults', {
      year: selectedYear,
      schoolID: schoolID,
      results: results,
    }).then((response) => {
      console.log("Response from server:", response.data);
    });
  };

  //for the form
  const handleChange = (e) =>{

    const { name, value } = e.target;
    setFormValues({ ...FormVlaues, [name]: parseInt(value) });
  }

  const submitCounts = (e) => {
  
    axios
      .post('http://localhost:3001/NationalExaminationDetails/NExamCounts',{
        counts: FormVlaues,
        year:selectedYear,
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

      <Container className="DropdownDiv2">
        <Row>
        <p className='pTopDiv' style={{marginLeft:"500px"}}>O/L Examination Results</p>
          <Col lg={5} sm={12} className="divAllDropdown">
            <DropdownButton className="customDropdownButton" id="dropdown-basic-button" title={`${selectedYear}`}>
              <Dropdown.Item className="customDropdown" onClick={() => setSelectedYear(currentYear)}>
                {currentYear}
              </Dropdown.Item>
              <Dropdown.Item className="customDropdown" onClick={() => setSelectedYear(currentYear - 1)}>
                {currentYear - 1}
              </Dropdown.Item>
              <Dropdown.Item className="customDropdown" onClick={() => setSelectedYear(currentYear - 2)}>
                {currentYear - 2}
              </Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Container>

      <Container fluid className="div_aca_yr divAddStudentTable">
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
                     {/* {storedResults.length >0? storedResults}  */}
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
         
          <Button variant="outline-primary" size="lg"  onClick={uploadMarks}>
            Upload
          </Button>
        </Row>

        <Row style={{border:"3px solid black", margin:"13px 4px 13px 4px", padding:"10px"}}>
          <Form onSubmit={submitCounts}>
      <Form.Label htmlFor="inputPassword5">Total Sat Count</Form.Label>
    
      <Form.Control type="text" placeholder="Enter sat count here.."  name="satCount" onChange={handleChange} />
      <br />
      <Form.Label htmlFor="inputPassword5">Total Pass Count</Form.Label>
    
      <Form.Control type="text" placeholder="Enter pass count here.." name="passCount" onChange={handleChange} />
     <br />
     <Button type="submit" variant="outline-primary">Submit</Button>
     
    </Form>
          </Row>
      </Container>
    </div>
  );
}

export default UploadExaminationResults;
