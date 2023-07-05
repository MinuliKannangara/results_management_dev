import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import './OLResults.css';
import axios from 'axios';
import DivisionWiseTable from '../Charts/DivWiseTable';
import { Formik, Field, Form } from 'formik';

const currentYear = new Date().getFullYear();

const ScholarshipResults = () => {
  const [subjectCounts1, setSubjectCountsYear1] = useState({});
  const [subjectCounts2, setSubjectCountsYear2] = useState({});
  const [subjectCounts3, setSubjectCountsYear3] = useState({});
  const [subjectCounts4, setSubjectCountsYear4] = useState({});
  const [subjectCounts5, setSubjectCountsYear5] = useState({});
  const [passMark, setPassMark] = useState(0);

  useEffect(() => {
    fetchDataForYear(currentYear, setSubjectCountsYear1);
    fetchDataForYear(currentYear - 1, setSubjectCountsYear2);
    fetchDataForYear(currentYear - 2, setSubjectCountsYear3);
    fetchDataForYear(currentYear - 3, setSubjectCountsYear4);
    fetchDataForYear(currentYear - 4, setSubjectCountsYear5);
  }, []);

  const fetchDataForYear = (year, setSubjectCounts) => {
    fetch(`http://localhost:3001/NationalExaminationDetails/ScholarshipResults/${year}/${passMark}`)
      .then((res) => res.json())
      .then((data) => {
        setSubjectCounts(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFetchData = (passmarkFromForm) => {
    setPassMark(passmarkFromForm);
    fetchDataForYear(currentYear, setSubjectCountsYear1);
    fetchDataForYear(currentYear - 1, setSubjectCountsYear2);
    fetchDataForYear(currentYear - 2, setSubjectCountsYear3);
    fetchDataForYear(currentYear - 3, setSubjectCountsYear4);
    fetchDataForYear(currentYear - 4, setSubjectCountsYear5);
  };

  return (
    <div>
      <NavBar PageName="Grade 5 Scholarship Results Analysis" />
      <Container fluid>
        <Row>
          <h3 className="topicsP">Division Wise Analysis</h3>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Formik
            initialValues={{ passMark: '' }}
            onSubmit={(values) => {
              handleFetchData(values.passMark);
            }}
          >
            <Form>
              <label htmlFor="passMark">Pass Mark</label>
              <Field name="passMark" type="text" as="input" /> <br />
              <button type="submit">Fetch Data</button>
            </Form>
          </Formik>
        </Row>

        <Row>
          <Col lg={6} md={8} sm={6} className="divColumns">
            <h3 className="tableTopicH3">{currentYear}</h3>
            <DivisionWiseTable
              minuwangoda={subjectCounts1?.Minuwangoda?.satCount || 0}
              minuangodaPassCount={subjectCounts1?.Minuwangoda?.passCount || 0}
              meerigama={subjectCounts1?.Meerigama?.satCount || 0}
              meerigamaPassCount={subjectCounts1?.Meerigama?.passCount || 0}
              divulapitiya={subjectCounts1?.Divulapitiya?.satCount || 0}
              divulapitiyaPassCount={subjectCounts1?.Divulapitiya?.passCount || 0}
            />
          </Col>
          <Col lg={6} md={8} sm={6} className="divColumns"></Col>
        </Row>
        <Row>
          <Col lg={6} md={8} sm={6} className="divColumns">
            <h3 className="tableTopicH3">{currentYear - 1}</h3>
            <DivisionWiseTable
              minuwangoda={subjectCounts2?.Minuwangoda?.satCount || 0}
              minuangodaPassCount={subjectCounts2?.Minuwangoda?.passCount || 0}
              meerigama={subjectCounts2?.Meerigama?.satCount || 0}
              meerigamaPassCount={subjectCounts2?.Meerigama?.passCount || 0}
              divulapitiya={subjectCounts2?.Divulapitiya?.satCount || 0}
              divulapitiyaPassCount={subjectCounts2?.Divulapitiya?.passCount || 0}
            />
          </Col>
          <Col lg={6} md={8} sm={6} className="divColumns"></Col>
        </Row>
        <Row>
          <Col lg={6} md={8} sm={6} className="divColumns">
            <h3 className="tableTopicH3">{currentYear - 2}</h3>
            <DivisionWiseTable
              minuwangoda={subjectCounts3?.Minuwangoda?.satCount || 0}
              minuangodaPassCount={subjectCounts3?.Minuwangoda?.passCount || 0}
              meerigama={subjectCounts3?.Meerigama?.satCount || 0}
              meerigamaPassCount={subjectCounts3?.Meerigama?.passCount || 0}
              divulapitiya={subjectCounts3?.Divulapitiya?.satCount || 0}
              divulapitiyaPassCount={subjectCounts3?.Divulapitiya?.passCount || 0}
            />
          </Col>
          <Col lg={6} md={8} sm={6} className="divColumns"></Col>
        </Row>
        <Row>
          <Col lg={6} md={8} sm={6} className="divColumns">
            <h3 className="tableTopicH3">{currentYear - 3}</h3>
            <DivisionWiseTable
              minuwangoda={subjectCounts4?.Minuwangoda?.satCount || 0}
              minuangodaPassCount={subjectCounts4?.Minuwangoda?.passCount || 0}
              meerigama={subjectCounts4?.Meerigama?.satCount || 0}
              meerigamaPassCount={subjectCounts4?.Meerigama?.passCount || 0}
              divulapitiya={subjectCounts4?.Divulapitiya?.satCount || 0}
              divulapitiyaPassCount={subjectCounts4?.Divulapitiya?.passCount || 0}
            />
          </Col>
          <Col lg={6} md={8} sm={6} className="divColumns"></Col>
        </Row>
        <Row>
          <Col lg={6} md={8} sm={6} className="divColumns">
            <h3 className="tableTopicH3">{currentYear - 4}</h3>
            <DivisionWiseTable
              minuwangoda={subjectCounts5?.Minuwangoda?.satCount || 0}
              minuangodaPassCount={subjectCounts5?.Minuwangoda?.passCount || 0}
              meerigama={subjectCounts5?.Meerigama?.satCount || 0}
              meerigamaPassCount={subjectCounts5?.Meerigama?.passCount || 0}
              divulapitiya={subjectCounts5?.Divulapitiya?.satCount || 0}
              divulapitiyaPassCount={subjectCounts5?.Divulapitiya?.passCount || 0}
            />
          </Col>
          <Col lg={6} md={8} sm={6} className="divColumns"></Col>
        </Row>
      </Container>
    </div>
  );
};

export default ScholarshipResults;
