import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import './GreadHead.css';
import { Button } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { current } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';

function UploadScholarshipResults() {
  const currentYear = new Date().getFullYear();
  const { authState } = useContext(AuthContext);
  const schoolID = authState.schoolID;

  const [selectedYear, setSelectedYear] = useState(currentYear);
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

  const handleMarksChange = (type, value) => {
    setMarks((prevMarks) => ({ ...prevMarks, [type]: value }));
  };

  const uploadMarks = () => {
    console.log("Data to be uploaded:", marks);

    axios.post('http://localhost:3001/ScholarshipResults', {
      year: selectedYear,
      schoolID: schoolID,
      results: [marks], // Wrap marks in an array as it represents a single entry
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
                <th>0-5</th>
                <th>6-24</th>
                <th>25-49</th>
                <th>50-69</th>
                <th>100-124</th>
                <th>125-150</th>
                <th>151-175</th>
                <th>175-200</th>
                <th>Maximum Mark</th>
                <th>Minimum Mark</th>
                <th>Absent</th>
                <th>Number Of Sat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('Count0_5', parseInt(event.target.textContent))}></td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('Count6_24', parseInt(event.target.textContent))}></td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('Count25_49', parseInt(event.target.textContent))}></td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('Count50_69', parseInt(event.target.textContent))}></td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('Count70_99', parseInt(event.target.textContent))}></td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('Count100_124', parseInt(event.target.textContent))}></td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('Count125_150', parseInt(event.target.textContent))}></td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('Count175_200', parseInt(event.target.textContent))}></td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('MaximumMark', parseInt(event.target.textContent))}></td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('MinimumMark', parseInt(event.target.textContent))}></td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('Absent', parseInt(event.target.textContent))}></td>
                <td contentEditable="true" onBlur={(event) => handleMarksChange('sat', parseInt(event.target.textContent))}></td>
              </tr>
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

export default UploadScholarshipResults;
