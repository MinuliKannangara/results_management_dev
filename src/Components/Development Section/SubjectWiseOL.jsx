import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import './OLResults.css';
import axios, { Axios } from 'axios';
import DropdownButtonForAll from '../OtherComponents/Dropdown';
import SubjectWiseTable from '../Charts/SubjectWiseTable';


  const subjects = [
    'Sinhala', 'Religion', 'History', 'Science',  'Mathematics',  'English' ,
    
  ];

const category1 =[
   'Business & Accounting Studies','Geography','civic Education','Enterpreneurship Studies',
   'Second Language (Sinhala)', 'Second Language (Tamil)', 'secondLanguageTamil',

];

const category2 =[
    'Eastern Music','Western Music',  'Art','Dancing', 'Drama',
    'English Literature',
    'Sinhala Literature',
];

const category3 =[
    'Information & Communication Technology',
     'Health & Physical Education',
    'Agriculture & Food Technology',
   'Design & Construction Technology',
    'Design & Mechanical Technology',
    'Design & Electrical & Electronic Technology', 
   'Arts and Crafts', 
   'Home Science',
   'Communication & Media Studies',

];

const SubjectWiseAnalysisOL = () => {
  const currentYear = new Date().getFullYear();
  
  const [subjectCounts1, setSubjectCountsyear1] = useState({});
  const [subjectCounts2, setSubjectCountsyear2] = useState({});
  const [subjectCounts3, setSubjectCountsyear3] = useState({});
  const [subjectCounts4, setSubjectCountsyear4] = useState({});
  const [subjectCounts5, setSubjectCountsyear5] = useState({});
  
  

  const fetchDataForSubjects = (year, setSubjectCounts) => {
    fetch(`http://localhost:3001/subjectWiseAnalysis/${year}`)
      .then((res) => res.json())
      .then((data) => {
        setSubjectCounts(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchDataForSubjects(currentYear, setSubjectCountsyear1);
    fetchDataForSubjects(currentYear-1, setSubjectCountsyear2);
    fetchDataForSubjects(currentYear-2, setSubjectCountsyear3);
    fetchDataForSubjects(currentYear-3, setSubjectCountsyear4);
    fetchDataForSubjects(currentYear-4, setSubjectCountsyear5);
  }, []);

 

return (
<div>

    {/* subject wise analysis */}
      <Container fluid>
            <Row><h3 className='topicsP'>Subject Wise Analysis</h3></Row>
      </Container>

      <Container fluid>
            <Row><h3 className='topicsP'>Main Subjects</h3></Row>
      </Container>

      <Container fluid>
        <button onClick={fetchDataForSubjects}>Fetch Data</button>
         <Row>
         {subjects.map((subject, index) => (
        <Col lg={6} md={8} sm={6} className='divColumns' key={index}>
          <h3 className='tableTopicH3'>{subject}</h3>
          <SubjectWiseTable
 
           minuwangodaSatYear1={subjectCounts1?.[`${subject}`]?.Minuwangoda?.satCount || 0}
           minuwangodaPassYear1={subjectCounts1?.[`${subject}`]?.Minuwangoda?.passCount || 0}
           meerigamaSatYear1 = {subjectCounts1?.[`${subject}`]?.Meerigama?.satCount || 0}
           meerigamaPassYear1 = {subjectCounts1?.[`${subject}`]?.Meerigama?.passCount || 0}
           divulapitiyaSatYear1={subjectCounts1?.[`${subject}`]?.Divulapitiya?.satCount || 0}
           divulapitiyaPassYear1={subjectCounts1?.[`${subject}`]?.Divulapitiya?.passCount || 0}

           minuwangodaSatYear2={subjectCounts2?.[`${subject}`]?.Minuwangoda?.satCount || 0}
           minuwangodaPassYear2={subjectCounts2?.[`${subject}`]?.Minuwangoda?.passCount || 0}
           meerigamaSatYear2 = {subjectCounts2?.[`${subject}`]?.Meerigama?.satCount || 0}
           meerigamaPassYear2 = {subjectCounts2?.[`${subject}`]?.Meerigama?.passCount || 0}
           divulapitiyaSatYear2={subjectCounts2?.[`${subject}`]?.Divulapitiya?.satCount || 0}
           divulapitiyaPassYear2={subjectCounts2?.[`${subject}`]?.Divulapitiya?.passCount || 0}

           minuwangodaSatYear3={subjectCounts3?.[`${subject}`]?.Minuwangoda?.satCount || 0}
           minuwangodaPassYear3={subjectCounts3?.[`${subject}`]?.Minuwangoda?.passCount || 0}
           meerigamaSatYear3 = {subjectCounts3?.[`${subject}`]?.Meerigama?.satCount || 0}
           meerigamaPassYear3 = {subjectCounts3?.[`${subject}`]?.Meerigama?.passCount || 0}
           divulapitiyaSatYear3={subjectCounts3?.[`${subject}`]?.Divulapitiya?.satCount || 0}
           divulapitiyaPassYear3={subjectCounts3?.[`${subject}`]?.Divulapitiya?.passCount || 0}

           minuwangodaSatYear4={subjectCounts4?.[`${subject}`]?.Minuwangoda?.satCount || 0}
           minuwangodaPassYear4={subjectCounts4?.[`${subject}`]?.Minuwangoda?.passCount || 0}
           meerigamaSatYear4 = {subjectCounts4?.[`${subject}`]?.Meerigama?.satCount || 0}
           meerigamaPassYear4 = {subjectCounts4?.[`${subject}`]?.Meerigama?.passCount || 0}
           divulapitiyaSatYear4={subjectCounts4?.[`${subject}`]?.Divulapitiya?.satCount || 0}
           divulapitiyaPassYear4={subjectCounts4?.[`${subject}`]?.Divulapitiya?.passCount || 0}

           minuwangodaSatYear5={subjectCounts5?.[`${subject}`]?.Minuwangoda?.satCount || 0}
           minuwangodaPassYear5={subjectCounts5?.[`${subject}`]?.Minuwangoda?.passCount || 0}
           meerigamaSatYear5 = {subjectCounts5?.[`${subject}`]?.Meerigama?.satCount || 0}
           meerigamaPassYear5 = {subjectCounts5?.[`${subject}`]?.Meerigama?.passCount || 0}
           divulapitiyaSatYear5={subjectCounts5?.[`${subject}`]?.Divulapitiya?.satCount || 0}
           divulapitiyaPassYear5={subjectCounts5?.[`${subject}`]?.Divulapitiya?.passCount || 0}

          />
        </Col>

        
      ))}

<Col lg={6} md={8} sm={6} className='divColumns'>

              
              
</Col>
         </Row>
      </Container>


      <Container fluid>
            <Row><h3 className='topicsP'>1 <sup>st</sup>  Category</h3></Row>
      </Container>

      <Container fluid>
        <button onClick={fetchDataForSubjects}>Fetch Data</button>
         <Row>
         {category1.map((subject, index) => (
        <Col lg={6} md={8} sm={6} className='divColumns' key={index}>
          <h3 className='tableTopicH3'>{subject}</h3>
          <SubjectWiseTable
           minuwangodaSatYear1={subjectCounts1?.[`${subject}`]?.Minuwangoda?.satCount || 0}
           minuwangodaPassYear1={subjectCounts1?.[`${subject}`]?.Minuwangoda?.passCount || 0}
           meerigamaSatYear1 = {subjectCounts1?.[`${subject}`]?.Meerigama?.satCount || 0}
           meerigamaPassYear1 = {subjectCounts1?.[`${subject}`]?.Meerigama?.passCount || 0}
           divulapitiyaSatYear1={subjectCounts1?.[`${subject}`]?.Divulapitiya?.satCount || 0}
           divulapitiyaPassYear1={subjectCounts1?.[`${subject}`]?.Divulapitiya?.passCount || 0}

           minuwangodaSatYear2={subjectCounts2?.[`${subject}`]?.Minuwangoda?.satCount || 0}
           minuwangodaPassYear2={subjectCounts2?.[`${subject}`]?.Minuwangoda?.passCount || 0}
           meerigamaSatYear2 = {subjectCounts2?.[`${subject}`]?.Meerigama?.satCount || 0}
           meerigamaPassYear2 = {subjectCounts2?.[`${subject}`]?.Meerigama?.passCount || 0}
           divulapitiyaSatYear2={subjectCounts2?.[`${subject}`]?.Divulapitiya?.satCount || 0}
           divulapitiyaPassYear2={subjectCounts2?.[`${subject}`]?.Divulapitiya?.passCount || 0}

           minuwangodaSatYear3={subjectCounts3?.[`${subject}`]?.Minuwangoda?.satCount || 0}
           minuwangodaPassYear3={subjectCounts3?.[`${subject}`]?.Minuwangoda?.passCount || 0}
           meerigamaSatYear3 = {subjectCounts3?.[`${subject}`]?.Meerigama?.satCount || 0}
           meerigamaPassYear3 = {subjectCounts3?.[`${subject}`]?.Meerigama?.passCount || 0}
           divulapitiyaSatYear3={subjectCounts3?.[`${subject}`]?.Divulapitiya?.satCount || 0}
           divulapitiyaPassYear3={subjectCounts3?.[`${subject}`]?.Divulapitiya?.passCount || 0}

           minuwangodaSatYear4={subjectCounts4?.[`${subject}`]?.Minuwangoda?.satCount || 0}
           minuwangodaPassYear4={subjectCounts4?.[`${subject}`]?.Minuwangoda?.passCount || 0}
           meerigamaSatYear4 = {subjectCounts4?.[`${subject}`]?.Meerigama?.satCount || 0}
           meerigamaPassYear4 = {subjectCounts4?.[`${subject}`]?.Meerigama?.passCount || 0}
           divulapitiyaSatYear4={subjectCounts4?.[`${subject}`]?.Divulapitiya?.satCount || 0}
           divulapitiyaPassYear4={subjectCounts4?.[`${subject}`]?.Divulapitiya?.passCount || 0}

           minuwangodaSatYear5={subjectCounts5?.[`${subject}`]?.Minuwangoda?.satCount || 0}
           minuwangodaPassYear5={subjectCounts5?.[`${subject}`]?.Minuwangoda?.passCount || 0}
           meerigamaSatYear5 = {subjectCounts5?.[`${subject}`]?.Meerigama?.satCount || 0}
           meerigamaPassYear5 = {subjectCounts5?.[`${subject}`]?.Meerigama?.passCount || 0}
           divulapitiyaSatYear5={subjectCounts5?.[`${subject}`]?.Divulapitiya?.satCount || 0}
           divulapitiyaPassYear5={subjectCounts5?.[`${subject}`]?.Divulapitiya?.passCount || 0}
            
          />
        </Col>

        
      ))}

<Col lg={6} md={8} sm={6} className='divColumns'>

              
              
</Col>
         </Row>
      </Container>

      <Container fluid>
            <Row><h3 className='topicsP'>2 <sup>nd</sup>  Category</h3></Row>
      </Container>

      <Container fluid>
        <button onClick={fetchDataForSubjects}>Fetch Data</button>
         <Row>
         {category2.map((subject, index) => (
        <Col lg={6} md={8} sm={6} className='divColumns' key={index}>
          <h3 className='tableTopicH3'>{subject}</h3>
          <SubjectWiseTable
          minuwangodaSatYear1={subjectCounts1?.[`${subject}`]?.Minuwangoda?.satCount || 0}
          minuwangodaPassYear1={subjectCounts1?.[`${subject}`]?.Minuwangoda?.passCount || 0}
          meerigamaSatYear1 = {subjectCounts1?.[`${subject}`]?.Meerigama?.satCount || 0}
          meerigamaPassYear1 = {subjectCounts1?.[`${subject}`]?.Meerigama?.passCount || 0}
          divulapitiyaSatYear1={subjectCounts1?.[`${subject}`]?.Divulapitiya?.satCount || 0}
          divulapitiyaPassYear1={subjectCounts1?.[`${subject}`]?.Divulapitiya?.passCount || 0}

          minuwangodaSatYear2={subjectCounts2?.[`${subject}`]?.Minuwangoda?.satCount || 0}
          minuwangodaPassYear2={subjectCounts2?.[`${subject}`]?.Minuwangoda?.passCount || 0}
          meerigamaSatYear2 = {subjectCounts2?.[`${subject}`]?.Meerigama?.satCount || 0}
          meerigamaPassYear2 = {subjectCounts2?.[`${subject}`]?.Meerigama?.passCount || 0}
          divulapitiyaSatYear2={subjectCounts2?.[`${subject}`]?.Divulapitiya?.satCount || 0}
          divulapitiyaPassYear2={subjectCounts2?.[`${subject}`]?.Divulapitiya?.passCount || 0}

          minuwangodaSatYear3={subjectCounts3?.[`${subject}`]?.Minuwangoda?.satCount || 0}
          minuwangodaPassYear3={subjectCounts3?.[`${subject}`]?.Minuwangoda?.passCount || 0}
          meerigamaSatYear3 = {subjectCounts3?.[`${subject}`]?.Meerigama?.satCount || 0}
          meerigamaPassYear3 = {subjectCounts3?.[`${subject}`]?.Meerigama?.passCount || 0}
          divulapitiyaSatYear3={subjectCounts3?.[`${subject}`]?.Divulapitiya?.satCount || 0}
          divulapitiyaPassYear3={subjectCounts3?.[`${subject}`]?.Divulapitiya?.passCount || 0}

          minuwangodaSatYear4={subjectCounts4?.[`${subject}`]?.Minuwangoda?.satCount || 0}
          minuwangodaPassYear4={subjectCounts4?.[`${subject}`]?.Minuwangoda?.passCount || 0}
          meerigamaSatYear4 = {subjectCounts4?.[`${subject}`]?.Meerigama?.satCount || 0}
          meerigamaPassYear4 = {subjectCounts4?.[`${subject}`]?.Meerigama?.passCount || 0}
          divulapitiyaSatYear4={subjectCounts4?.[`${subject}`]?.Divulapitiya?.satCount || 0}
          divulapitiyaPassYear4={subjectCounts4?.[`${subject}`]?.Divulapitiya?.passCount || 0}

          minuwangodaSatYear5={subjectCounts5?.[`${subject}`]?.Minuwangoda?.satCount || 0}
          minuwangodaPassYear5={subjectCounts5?.[`${subject}`]?.Minuwangoda?.passCount || 0}
          meerigamaSatYear5 = {subjectCounts5?.[`${subject}`]?.Meerigama?.satCount || 0}
          meerigamaPassYear5 = {subjectCounts5?.[`${subject}`]?.Meerigama?.passCount || 0}
          divulapitiyaSatYear5={subjectCounts5?.[`${subject}`]?.Divulapitiya?.satCount || 0}
          divulapitiyaPassYear5={subjectCounts5?.[`${subject}`]?.Divulapitiya?.passCount || 0}
          />
        </Col>

        
      ))}

<Col lg={6} md={8} sm={6} className='divColumns'>

              
              
</Col>
         </Row>
      </Container>

      <Container fluid>
            <Row><h3 className='topicsP'>3 <sup>rd</sup>  Category</h3></Row>
      </Container>

      <Container fluid>
        <button onClick={fetchDataForSubjects}>Fetch Data</button>
         <Row>
         {category3.map((subject, index) => (
        <Col lg={6} md={8} sm={6} className='divColumns' key={index}>
          <h3 className='tableTopicH3'>{subject}</h3>
          <SubjectWiseTable
           minuwangodaSatYear1={subjectCounts1?.[`${subject}`]?.Minuwangoda?.satCount || 0}
           minuwangodaPassYear1={subjectCounts1?.[`${subject}`]?.Minuwangoda?.passCount || 0}
           meerigamaSatYear1 = {subjectCounts1?.[`${subject}`]?.Meerigama?.satCount || 0}
           meerigamaPassYear1 = {subjectCounts1?.[`${subject}`]?.Meerigama?.passCount || 0}
           divulapitiyaSatYear1={subjectCounts1?.[`${subject}`]?.Divulapitiya?.satCount || 0}
           divulapitiyaPassYear1={subjectCounts1?.[`${subject}`]?.Divulapitiya?.passCount || 0}

           minuwangodaSatYear2={subjectCounts2?.[`${subject}`]?.Minuwangoda?.satCount || 0}
           minuwangodaPassYear2={subjectCounts2?.[`${subject}`]?.Minuwangoda?.passCount || 0}
           meerigamaSatYear2 = {subjectCounts2?.[`${subject}`]?.Meerigama?.satCount || 0}
           meerigamaPassYear2 = {subjectCounts2?.[`${subject}`]?.Meerigama?.passCount || 0}
           divulapitiyaSatYear2={subjectCounts2?.[`${subject}`]?.Divulapitiya?.satCount || 0}
           divulapitiyaPassYear2={subjectCounts2?.[`${subject}`]?.Divulapitiya?.passCount || 0}

           minuwangodaSatYear3={subjectCounts3?.[`${subject}`]?.Minuwangoda?.satCount || 0}
           minuwangodaPassYear3={subjectCounts3?.[`${subject}`]?.Minuwangoda?.passCount || 0}
           meerigamaSatYear3 = {subjectCounts3?.[`${subject}`]?.Meerigama?.satCount || 0}
           meerigamaPassYear3 = {subjectCounts3?.[`${subject}`]?.Meerigama?.passCount || 0}
           divulapitiyaSatYear3={subjectCounts3?.[`${subject}`]?.Divulapitiya?.satCount || 0}
           divulapitiyaPassYear3={subjectCounts3?.[`${subject}`]?.Divulapitiya?.passCount || 0}

           minuwangodaSatYear4={subjectCounts4?.[`${subject}`]?.Minuwangoda?.satCount || 0}
           minuwangodaPassYear4={subjectCounts4?.[`${subject}`]?.Minuwangoda?.passCount || 0}
           meerigamaSatYear4 = {subjectCounts4?.[`${subject}`]?.Meerigama?.satCount || 0}
           meerigamaPassYear4 = {subjectCounts4?.[`${subject}`]?.Meerigama?.passCount || 0}
           divulapitiyaSatYear4={subjectCounts4?.[`${subject}`]?.Divulapitiya?.satCount || 0}
           divulapitiyaPassYear4={subjectCounts4?.[`${subject}`]?.Divulapitiya?.passCount || 0}

           minuwangodaSatYear5={subjectCounts5?.[`${subject}`]?.Minuwangoda?.satCount || 0}
           minuwangodaPassYear5={subjectCounts5?.[`${subject}`]?.Minuwangoda?.passCount || 0}
           meerigamaSatYear5 = {subjectCounts5?.[`${subject}`]?.Meerigama?.satCount || 0}
           meerigamaPassYear5 = {subjectCounts5?.[`${subject}`]?.Meerigama?.passCount || 0}
           divulapitiyaSatYear5={subjectCounts5?.[`${subject}`]?.Divulapitiya?.satCount || 0}
           divulapitiyaPassYear5={subjectCounts5?.[`${subject}`]?.Divulapitiya?.passCount || 0}
          />
        </Col>

        
      ))}

<Col lg={6} md={8} sm={6} className='divColumns'>

              
              
</Col>
         </Row>
      </Container>


</div>
);
};

export default SubjectWiseAnalysisOL;