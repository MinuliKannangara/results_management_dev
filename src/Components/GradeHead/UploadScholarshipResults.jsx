import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col,Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import './GreadHead.css';
import { Button } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';

function UploadScholarshipResults() {
  const currentYear = new Date().getFullYear();
  const { authState } = useContext(AuthContext);
  const schoolID = authState.schoolID;

  const [marks, setMarks] = useState({
    Count0_5: 0,
    Count6_24: 0,
    Count25_49: 0,
    Count50_69: 0,
    Count70_99: 0,
    Count100_124: 0,
    Count125_150: 0,
    Count151_175: 0,
    Count175_200: 0,
    MaximumMark: 0,
    MinimumMark: 0,
    Absent: 0,
    sat: 0,
    pass: 0,
  });

  const [storedResults, setStoredResults] = useState([]);

    const initialValues = {
    satCount:0,
    passCount:0,
    school_ID:schoolID,
    examination_name:"scholarship",
  }
  const [FormVlaues, setFormValues] = useState(initialValues);

  const handleMarksChange = (type, value) => {
    setMarks((prevMarks) => ({ ...prevMarks, [type]: value }));
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/ScholarshipResults/${schoolID}/${currentYear}`).then((response) => {
      setStoredResults(response.data);
    });
  }, []);


  const uploadMarks = async () => {

    for (const [key, value] of Object.entries(marks)) {
      if (value < 0) {
        alert("Invalid marks entered. Marks cannot be negative.");
        return;
      }

      if (key === "MaximumMark" || key === "MinimumMark") {
        if (value < 0 || value > 200) {
          alert(`Invalid ${key}. ${key} must be between 0 and 200.`);
          return;
        }
      }
    }

    
  
    console.log("Data to be uploaded:", marks);

   await axios.post('http://localhost:3001/ScholarshipResults', {
      year: currentYear,
      schoolID: schoolID,
      results: [marks], // Wrap marks in an array as it represents a single entry
    }).then((response) => {
      if (!response.data.error) {
         // Update button style and text for success
         document.getElementById("btn").classList.remove("btn-outline-primary");
         document.getElementById("btn").classList.add("btn-outline-success");
         document.getElementById("btn").innerHTML = "Submitted";
          } else {
            document.getElementById("btn").classList.remove("btn-outline-primary");
        document.getElementById("btn").classList.add("btn-outline-danger");
        document.getElementById("btn").innerHTML = "Check data and Retry";
          }
        })
   
 
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
    alert("Please enter valid values for Sat Count and Pass Count.");
    return;
  } else if(FormVlaues.satCount<FormVlaues.passCount){
    alert("Invalid Inputs")
  }

    axios
      .post('http://localhost:3001/NationalExaminationDetails/NExamCounts',{
        counts: FormVlaues,
        year:currentYear,
        examName: "scholarship",
      })
      .then((response) => {
        if (!response.data.error) {
          // Update button style and text for success
          document.getElementById("btn2").classList.remove("btn-outline-primary");
          document.getElementById("btn2").classList.add("btn-outline-success");
          document.getElementById("btn2").innerHTML = "Submitted";
           } else {
             document.getElementById("btn2").classList.remove("btn-outline-primary");
         document.getElementById("btn2").classList.add("btn-outline-danger");
         document.getElementById("btn2").innerHTML = "Check data and Retry";
           }
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
        <p className='pTopDiv' style={{marginLeft:"500px", marginTop:"25px"}}>Grade 5 Scholarship Results</p>
        </Row>
        <Row className="TableRoWUp">
          <Col md={2} sm={6}></Col>
        </Row>
        <Row className="TableRoWDown">
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>#</th>
                <th>0-5</th>
                <th>6-24</th>
                <th>25-49</th>
                <th>50-69</th>
                <th>70-99</th>
                <th>100-124</th>
                <th>125-150</th>
                <th>151-175</th>
                <th>176-200</th>
                <th>Maximum Mark</th>
                <th>Minimum Mark</th>
                <th>Absent</th>
                <th>Number Of Sat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('Count0_5', parseInt(event.target.textContent))}>
                  {storedResults.length > 0 && storedResults[0].Count0_5}
                </td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('Count6_24', parseInt(event.target.textContent))}>
                  {storedResults.length > 0 && storedResults[0].Count6_24}
                </td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('Count25_49', parseInt(event.target.textContent))}>
                  {storedResults.length > 0 && storedResults[0].Count25_49}
                </td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('Count50_69', parseInt(event.target.textContent))}>
                  {storedResults.length > 0 && storedResults[0].Count50_69}
                </td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('Count70_99', parseInt(event.target.textContent))}>
                  {storedResults.length > 0 && storedResults[0].Count70_99}
                </td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('Count100_124', parseInt(event.target.textContent))}>
                  {storedResults.length > 0 && storedResults[0].Count100_124}
                </td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('Count125_150', parseInt(event.target.textContent))}>
                  {storedResults.length > 0 && storedResults[0].Count125_150}
                </td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('Count151_175', parseInt(event.target.textContent))}>
                  {storedResults.length > 0 && storedResults[0].Count151_175}
                </td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('Count176_200', parseInt(event.target.textContent))}>
                  {storedResults.length > 0 && storedResults[0].Count176_200}
                </td>
                
                <td contentEditable="true" onBlur={(event) => handleMarksChange('MaximumMark', parseInt(event.target.textContent))}>
                  {storedResults.length > 0 && storedResults[0].MaximumMark}
                </td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('MinimumMark', parseInt(event.target.textContent))}>
                  {storedResults.length > 0 && storedResults[0].MinimumMark}
                </td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('Absent', parseInt(event.target.textContent))}>
                  {storedResults.length > 0 && storedResults[0].Absent}
                </td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('sat', parseInt(event.target.textContent))}>
                  {storedResults.length > 0 && storedResults[0].sat}
                </td>
              </tr>
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

export default UploadScholarshipResults;
