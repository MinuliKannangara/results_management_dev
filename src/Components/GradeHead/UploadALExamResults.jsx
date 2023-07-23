import React, { useEffect, useState,useContext} from 'react';
import { Container, Row, Col, FormLabel } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import './GreadHead.css';
import { Button } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { current } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';

function UploadALExamResults() {
  const currentYear = new Date().getFullYear();
  const {authState} = useContext(AuthContext);
  const schoolID = authState.schoolID;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/ALResults').then((response) => {
      setSubjects(response.data);
    });
  }, []);

  useEffect(() => {
    setMarks(subjects.map((subject) => ({ subject_ID: subject.subject_ID, UniversityQualified: 0, A_ForAllSubjects: 0, FailedAllSubjects: 0, Absent: 0,sat: 0})));
  }, [subjects]);

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

    axios.post('http://localhost:3001/ALResults', {
      year: selectedYear,
      schoolID: schoolID,
      results: results,
    }).then((response) => {
      console.log("Response from server:", response.data);
    });
  };

  return (
    <div>
       <NavBar
        PageName="Upload National Examination Results"
        Tab1="O/L Examination Results"
        Tab2="A/L Examination Results"
        Tab3="Grade 5 Scholarship Results"
        Tab1Link="http://localhost:3000/Upload National Examination Results"
        Tab2Link="http://localhost:3000/Upload AL Examination Results"
        Tab3Link="http://localhost:3000/Upload Scholarship Results"
      />


      <Container className="DropdownDiv2">
        <Row>
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
                <th>Qualified for Universitie Entrance(Passed in 3 Subjects)</th>
                <th>Obtained 3 A's</th>
                <th>Failed in All subjects</th>
                <th>Absent</th> 
                <th>Number Of Sat</th>
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
                    onBlur={(event) => handleMarksChange(subject.subject_ID, ' UniversityQualified', parseInt(event.target.textContent))}
                  ></td>
                  <td
                    contentEditable="true"
                    onBlur={(event) => handleMarksChange(subject.subject_ID, 'A_ForAllSubjects', parseInt(event.target.textContent))}
                  ></td>
                  <td
                    contentEditable="true"
                    onBlur={(event) => handleMarksChange(subject.subject_ID, 'FailedAllSubjects', parseInt(event.target.textContent))}
                  ></td>
                  <td
                    contentEditable="true"
                    onBlur={(event) => handleMarksChange(subject.subject_ID, 'Absent', parseInt(event.target.textContent))}
                  ></td>
                  <td
                  contentEditable="true"
                  onBlur={(event) => handleMarksChange(subject.subject_ID, 'sat', parseInt(event.target.textContent))}
                  ></td>
                  <td
                  contentEditable="true"
                  onBlur={(event) => handleMarksChange(subject.subject_ID, 'pass', parseInt(event.target.textContent))}
                  ></td>
                </tr>
              ))}
            </tbody>
          </Table>
          <button className="btnAddStudent" onClick={uploadMarks}>
            Upload
          </button>
        </Row>
      </Container>
    </div>
  );
}

export default UploadALExamResults;
