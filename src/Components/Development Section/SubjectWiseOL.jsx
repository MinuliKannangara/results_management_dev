import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './OLResults.css';
import SubjectWiseTable from '../Charts/SubjectWiseTable';
import NavBar from '../NavBar/NavBar';
import Button from 'react-bootstrap/Button';




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

  // State variables to track category visibility
  const [showCategory2, setShowCategory2] = useState(false);
  const [showCategory3, setShowCategory3] = useState(false);
  const [showCategory4, setShowCategory4] = useState(false);

return (
  <div>
      <NavBar
        PageName="O/L Results Analysis"
        Tab1="Division Wise Analysis"
        Tab2="Subject Wise Analysis"
        Tab3="Subject Wise Data"
        Tab1Link="/O/L Results Analysis"
        Tab2Link="/SubjectWiseAnalysisOL"
        Tab3Link="/OLResultsData"
        showButtons={true}
      />

      {/* subject wise analysis */}
      <Container fluid>
        <Row><h3 className='topicsP'>Subject Wise Analysis</h3></Row>
      </Container>

        <Container fluid>
          <Row><h3 className='topicsP'>Main Subjects</h3></Row>
        </Container>
     

      {/* Category 1 Table */}
 
        <Container fluid>
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
          </Row>
        </Container>

       
     
      {/* <button >Toggle Category 2</button> */}
      
      
        <Container fluid style={{marginTop:"30px"}}>
        <div className="d-grid gap-2">
        <Button variant="outline-success" size="lg" onClick={() => setShowCategory2(!showCategory2)}>
        1 <sup>st</sup> Category
      </Button>
    </div>
        
         
        </Container>
     

      {/* Category 2 Table */}
      {showCategory2 && (
        <Container fluid>
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
              {/* Additional content */}
            </Col>
          </Row>
        </Container>
      )}

      
<Container fluid style={{marginTop:"30px"}}>
        <div className="d-grid gap-2">
        <Button variant="outline-success" size="lg"onClick={() => setShowCategory3(!showCategory3)}>
        2 <sup>nd</sup> Category
      </Button>
    </div>
        
         
        </Container>
  
      {showCategory3 && (
        <Container fluid>
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

        
      )}


     <Container fluid style={{marginTop:"30px"}}>
        <div className="d-grid gap-2">
        <Button variant="outline-success" size="lg" onClick={() => setShowCategory4(!showCategory4)}>
        3 <sup>rd</sup>  Category
      </Button>
    </div>
        
         
        </Container>


{showCategory4 && (
         <Container fluid>

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
      )}

    </div>
);
};

export default SubjectWiseAnalysisOL;