import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import './OLResults.css';
import axios from 'axios';
import DivisionWiseTable from '../Charts/DivWiseTable';
import { Formik, Field, Form } from 'formik';



const ScholarshipResults = () => {
  const currentYear = new Date().getFullYear();

  const [meerigamaCountYear1, setMeerigamaCountYear1] = useState(0);
  const [meerigamaCountYear2, setMeerigamaCountYear2] = useState(0);
  const [meerigamaCountYear3, setMeerigamaCountYear3] = useState(0);
  const [meerigamaCountYear4, setMeerigamaCountYear4] = useState(0);
  const [meerigamaCountYear5, setMeerigamaCountYear5] = useState(0);

  const [minuwangodaCountYear1, setMinuwangodaCountYear1] = useState(0);
  const [minuwangodaCountYear2, setMinuwangodaCountYear2] = useState(0);
  const [minuwangodaCountYear3, setMinuwangodaCountYear3] = useState(0);
  const [minuwangodaCountYear4, setMinuwangodaCountYear4] = useState(0);
  const [minuwangodaCountYear5, setMinuwangodaCountYear5] = useState(0);

 

  const [divulapitiyaCountYear1, setDivulapitiyaCountYear1] = useState(0);
  const [divulapitiyaCountYear2, setDivulapitiyaCountYear2] = useState(0);
  const [divulapitiyaCountYear3, setDivulapitiyaCountYear3] = useState(0);
  const [divulapitiyaCountYear4, setDivulapitiyaCountYear4] = useState(0);
  const [divulapitiyaCountYear5, setDivulapitiyaCountYear5] = useState(0);
 
  const [meerigamaPassedYear1, setMeerigamaPassedYear1] = useState(0);
  const [meerigamaPassedYear2, setMeerigamaPassedYear2] = useState(0);
  const [meerigamaPassedYear3, setMeerigamaPassedYear3] = useState(0);
  const [meerigamaPassedYear4, setMeerigamaPassedYear4] = useState(0);
  const [meerigamaPassedYear5, setMeerigamaPassedYear5] = useState(0);

  const[divulapitiyaPassedYear1, setDivulapitiyaPassedYear1] = useState(0);
  const[divulapitiyaPassedYear2, setDivulapitiyaPassedYear2] = useState(0);
  const[divulapitiyaPassedYear3, setDivulapitiyaPassedYear3] = useState(0);
  const[divulapitiyaPassedYear4, setDivulapitiyaPassedYear4] = useState(0);
  const[divulapitiyaPassedYear5, setDivulapitiyaPassedYear5] = useState(0);

  const[minuwangodaPassedYear1, setMinuwangodaPassedYear1] = useState(0);
  const[minuwangodaPassedYear2, setMinuwangodaPassedYear2] = useState(0);
  const[minuwangodaPassedYear3, setMinuwangodaPassedYear3] = useState(0);
  const[minuwangodaPassedYear4, setMinuwangodaPassedYear4] = useState(0);
  const[minuwangodaPassedYear5, setMinuwangodaPassedYear5] = useState(0);

  
useEffect(() => {
  fetchDataForYear(currentYear, setMeerigamaCountYear1,  setDivulapitiyaCountYear1, setMinuwangodaCountYear1,setMeerigamaPassedYear1, setDivulapitiyaPassedYear1, setMinuwangodaPassedYear1,'scholarship');
  fetchDataForYear(currentYear-1, setMeerigamaCountYear2,  setDivulapitiyaCountYear2, setMinuwangodaCountYear2,setMeerigamaPassedYear2, setDivulapitiyaPassedYear2, setMinuwangodaPassedYear2,'scholarship');
  fetchDataForYear(currentYear-2, setMeerigamaCountYear3,  setDivulapitiyaCountYear3, setMinuwangodaCountYear3,setMeerigamaPassedYear3, setDivulapitiyaPassedYear3, setMinuwangodaPassedYear3,'scholarship');
  fetchDataForYear(currentYear-3, setMeerigamaCountYear4,  setDivulapitiyaCountYear4, setMinuwangodaCountYear4,setMeerigamaPassedYear4, setDivulapitiyaPassedYear4, setMinuwangodaPassedYear4,'scholarship');
  fetchDataForYear(currentYear-4, setMeerigamaCountYear5,  setDivulapitiyaCountYear5, setMinuwangodaCountYear5,setMeerigamaPassedYear5, setDivulapitiyaPassedYear5, setMinuwangodaPassedYear5,'scholarship');
 
}, []);
  

  const fetchDataForYear = (year, setDataMeerigama, setDataDivulapitiya, setDataMinuangoda, setDataMeerigamaPass, setDataDivulapitiyaPass, setDataMinuwangodaPass,exam) => {
    fetch(`http://localhost:3001/NationalExaminationDetails/NationalExaminationResults/${year}/${exam}`)
      .then((res) => res.json())
      .then((data) => {
        setDataMeerigama(data.meerigama);
        setDataDivulapitiya(data.divulapitiya);
        setDataMinuangoda(data.minuwangoda);
        setDataMeerigamaPass(data.meerigamaPassed);
        setDataDivulapitiyaPass(data.divulapitiyaPassed);
        setDataMinuwangodaPass(data.minuwangodaPassed);
        
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


return (
<div>

<NavBar
PageName="O/L Results Analysis" 
showButtons={false}
/>


      <Container fluid>
            <Row><h3 className='topicsP'>Division Wise Analysis</h3></Row>
      </Container>

      <Container fluid>
            <Row>
                  <Col lg={6} md={8} sm={6} className='divColumns'>
                    <h3 className='tableTopicH3'>{currentYear}</h3>
                    <DivisionWiseTable 
                    minuwangoda={minuwangodaCountYear1} 
                    meerigama={meerigamaCountYear1} 
                    divulapitiya = {divulapitiyaCountYear1} 
                    meerigamaPassCount={meerigamaPassedYear1}
                    minuangodaPassCount={minuwangodaPassedYear1}
                    divulapitiyaPassCount={divulapitiyaPassedYear1}
                    />

                  </Col>
                  <Col lg={6} md={8} sm={6} className='divColumns'>

              
              
                  </Col>
                 
            </Row>

            <Row>
                  <Col lg={6} md={8} sm={6} className='divColumns'>
                    <h3 className='tableTopicH3'>{currentYear-1}</h3>
                    <DivisionWiseTable 
                    minuwangoda={minuwangodaCountYear2} 
                    meerigama={meerigamaCountYear2} 
                    divulapitiya = {divulapitiyaCountYear2} 
                    meerigamaPassCount={meerigamaPassedYear2}
                    minuangodaPassCount={minuwangodaPassedYear2}
                    divulapitiyaPassCount={divulapitiyaPassedYear2}
                    />

                  </Col>
                  <Col lg={6} md={8} sm={6} className='divColumns'>

              
              
                  </Col>
                 
            </Row>

            <Row>
                  <Col lg={6} md={8} sm={6} className='divColumns'>
                    <h3 className='tableTopicH3'>{currentYear-2}</h3>
                    <DivisionWiseTable 
                    minuwangoda={minuwangodaCountYear3} 
                    meerigama={meerigamaCountYear3} 
                    divulapitiya = {divulapitiyaCountYear3} 
                    meerigamaPassCount={meerigamaPassedYear3}
                    minuangodaPassCount={minuwangodaPassedYear3}
                    divulapitiyaPassCount={divulapitiyaPassedYear3}
                    />

                  </Col>
                  <Col lg={6} md={8} sm={6} className='divColumns'>

              
              
                  </Col>
                 
            </Row>

            <Row>
                  <Col lg={6} md={8} sm={6} className='divColumns'>
                    <h3 className='tableTopicH3'>{currentYear-4}</h3>
                    <DivisionWiseTable 
                    minuwangoda={minuwangodaCountYear4} 
                    meerigama={meerigamaCountYear4} 
                    divulapitiya = {divulapitiyaCountYear4} 
                    meerigamaPassCount={meerigamaPassedYear4}
                    minuangodaPassCount={minuwangodaPassedYear4}
                    divulapitiyaPassCount={divulapitiyaPassedYear4}
                    />

                  </Col>
                  <Col lg={6} md={8} sm={6} className='divColumns'>

              
              
                  </Col>
                 
            </Row>

            <Row>
                  <Col lg={6} md={8} sm={6} className='divColumns'>
                    <h3 className='tableTopicH3'>{currentYear-5}</h3>
                    <DivisionWiseTable 
                    minuwangoda={minuwangodaCountYear5} 
                    meerigama={meerigamaCountYear5} 
                    divulapitiya = {divulapitiyaCountYear5} 
                    meerigamaPassCount={meerigamaPassedYear5}
                    minuangodaPassCount={minuwangodaPassedYear5}
                    divulapitiyaPassCount={divulapitiyaPassedYear5}
                    />

                  </Col>
                  <Col lg={6} md={8} sm={6} className='divColumns'>

              
              
                  </Col>
                 
            </Row>
      </Container>

</div>
);
  // const [subjectCounts1, setSubjectCountsYear1] = useState({});
  // const [subjectCounts2, setSubjectCountsYear2] = useState({});
  // const [subjectCounts3, setSubjectCountsYear3] = useState({});
  // const [subjectCounts4, setSubjectCountsYear4] = useState({});
  // const [subjectCounts5, setSubjectCountsYear5] = useState({});
  // const [passMark, setPassMark] = useState(0);

  // useEffect(() => {
  //   fetchDataForYear(currentYear, setSubjectCountsYear1);
  //   fetchDataForYear(currentYear - 1, setSubjectCountsYear2);
  //   fetchDataForYear(currentYear - 2, setSubjectCountsYear3);
  //   fetchDataForYear(currentYear - 3, setSubjectCountsYear4);
  //   fetchDataForYear(currentYear - 4, setSubjectCountsYear5);
  // }, []);

  // const fetchDataForYear = (year, setSubjectCounts) => {
  //   fetch(`http://localhost:3001/NationalExaminationDetails/ScholarshipResults/${year}/${passMark}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setSubjectCounts(data);
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const handleFetchData = (passmarkFromForm) => {
  //   setPassMark(passmarkFromForm);
  //   fetchDataForYear(currentYear, setSubjectCountsYear1);
  //   fetchDataForYear(currentYear - 1, setSubjectCountsYear2);
  //   fetchDataForYear(currentYear - 2, setSubjectCountsYear3);
  //   fetchDataForYear(currentYear - 3, setSubjectCountsYear4);
  //   fetchDataForYear(currentYear - 4, setSubjectCountsYear5);
  // };

  // return (
  //   <div>
  //     <NavBar PageName="Grade 5 Scholarship Results Analysis" />
  //     <Container fluid>
  //       <Row>
  //         <h3 className="topicsP">Division Wise Analysis</h3>
  //       </Row>
  //     </Container>
  //     <Container fluid>
  //       <Row>
  //         <Formik
  //           initialValues={{ passMark: '' }}
  //           onSubmit={(values) => {
  //             handleFetchData(values.passMark);
  //           }}
  //         >
  //           <Form>
  //             <label htmlFor="passMark">Pass Mark</label>
  //             <Field name="passMark" type="text" as="input" /> <br />
  //             <button type="submit">Fetch Data</button>
  //           </Form>
  //         </Formik>
  //       </Row>

  //       <Row>
  //         <Col lg={6} md={8} sm={6} className="divColumns">
  //           <h3 className="tableTopicH3">{currentYear}</h3>
  //           <DivisionWiseTable
  //             minuwangoda={subjectCounts1?.Minuwangoda?.satCount || 0}
  //             minuangodaPassCount={subjectCounts1?.Minuwangoda?.passCount || 0}
  //             meerigama={subjectCounts1?.Meerigama?.satCount || 0}
  //             meerigamaPassCount={subjectCounts1?.Meerigama?.passCount || 0}
  //             divulapitiya={subjectCounts1?.Divulapitiya?.satCount || 0}
  //             divulapitiyaPassCount={subjectCounts1?.Divulapitiya?.passCount || 0}
  //           />
  //         </Col>
  //         <Col lg={6} md={8} sm={6} className="divColumns"></Col>
  //       </Row>
  //       <Row>
  //         <Col lg={6} md={8} sm={6} className="divColumns">
  //           <h3 className="tableTopicH3">{currentYear - 1}</h3>
  //           <DivisionWiseTable
  //             minuwangoda={subjectCounts2?.Minuwangoda?.satCount || 0}
  //             minuangodaPassCount={subjectCounts2?.Minuwangoda?.passCount || 0}
  //             meerigama={subjectCounts2?.Meerigama?.satCount || 0}
  //             meerigamaPassCount={subjectCounts2?.Meerigama?.passCount || 0}
  //             divulapitiya={subjectCounts2?.Divulapitiya?.satCount || 0}
  //             divulapitiyaPassCount={subjectCounts2?.Divulapitiya?.passCount || 0}
  //           />
  //         </Col>
  //         <Col lg={6} md={8} sm={6} className="divColumns"></Col>
  //       </Row>
  //       <Row>
  //         <Col lg={6} md={8} sm={6} className="divColumns">
  //           <h3 className="tableTopicH3">{currentYear - 2}</h3>
  //           <DivisionWiseTable
  //             minuwangoda={subjectCounts3?.Minuwangoda?.satCount || 0}
  //             minuangodaPassCount={subjectCounts3?.Minuwangoda?.passCount || 0}
  //             meerigama={subjectCounts3?.Meerigama?.satCount || 0}
  //             meerigamaPassCount={subjectCounts3?.Meerigama?.passCount || 0}
  //             divulapitiya={subjectCounts3?.Divulapitiya?.satCount || 0}
  //             divulapitiyaPassCount={subjectCounts3?.Divulapitiya?.passCount || 0}
  //           />
  //         </Col>
  //         <Col lg={6} md={8} sm={6} className="divColumns"></Col>
  //       </Row>
  //       <Row>
  //         <Col lg={6} md={8} sm={6} className="divColumns">
  //           <h3 className="tableTopicH3">{currentYear - 3}</h3>
  //           <DivisionWiseTable
  //             minuwangoda={subjectCounts4?.Minuwangoda?.satCount || 0}
  //             minuangodaPassCount={subjectCounts4?.Minuwangoda?.passCount || 0}
  //             meerigama={subjectCounts4?.Meerigama?.satCount || 0}
  //             meerigamaPassCount={subjectCounts4?.Meerigama?.passCount || 0}
  //             divulapitiya={subjectCounts4?.Divulapitiya?.satCount || 0}
  //             divulapitiyaPassCount={subjectCounts4?.Divulapitiya?.passCount || 0}
  //           />
  //         </Col>
  //         <Col lg={6} md={8} sm={6} className="divColumns"></Col>
  //       </Row>
  //       <Row>
  //         <Col lg={6} md={8} sm={6} className="divColumns">
  //           <h3 className="tableTopicH3">{currentYear - 4}</h3>
  //           <DivisionWiseTable
  //             minuwangoda={subjectCounts5?.Minuwangoda?.satCount || 0}
  //             minuangodaPassCount={subjectCounts5?.Minuwangoda?.passCount || 0}
  //             meerigama={subjectCounts5?.Meerigama?.satCount || 0}
  //             meerigamaPassCount={subjectCounts5?.Meerigama?.passCount || 0}
  //             divulapitiya={subjectCounts5?.Divulapitiya?.satCount || 0}
  //             divulapitiyaPassCount={subjectCounts5?.Divulapitiya?.passCount || 0}
  //           />
  //         </Col>
  //         <Col lg={6} md={8} sm={6} className="divColumns"></Col>
  //       </Row>
  //     </Container>
  //   </div>
  // );
};

export default ScholarshipResults;
