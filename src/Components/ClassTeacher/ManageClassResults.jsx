
import ButtonAppBar from '../NavBar/NavBar';
import './ManageStudentDetails.css';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Formik, Field, Form } from "formik";
import { Button } from 'react-bootstrap';

import axios, { Axios } from 'axios';


const ManageStudentDetails = () => {

   

return (
<div>
  
<ButtonAppBar PageName="Manage Class Results" />

<Container fluid className='topDiv '>
        
         <p className='pTopDiv'>Results Sheet</p>
      
      </Container>

<Container fluid className='div_aca_yr divAddStudentTable'>
        <Row className='TableRoWUp'>

          <Col md={2} sm={6}>
            <p className='pAddStudent'>Total Subjects</p>
          </Col>
          <Col md={3} sm={6}>
          <form action="">
              <input type="text"
              style={{width:'10%', alignItems:'left', border:'none', borderBottom:'2px solid #000000', backgroundColor:'transparent', color:'#000000', fontSize:'10px', fontWeight:'bold'}}
               />
            </form>
            
          </Col>
          <Col md={4} sm={6}>
           <p className='pAddStudent'> add a search bar</p>
            
          </Col>
          <Col md={3} sm={6}>
            
            <Formik>
            <Form>
            <Button className='btnUpdate' type='submit'>Update Table</Button>
            </Form>
          </Formik>
            
          </Col>

        </Row>
        <Row className='TableRoWDown'>
        
            <Table striped bordered hover variant="light">
      <thead>
        <tr>
          <th>#</th>
          <th>Index Number</th>
          <th>Name</th>
          <th>Subject 1</th>
          <th>Subject 2</th>
          <th>Subject 3</th>
          <th>Subject 4</th>
          <th>Subject 4</th>
          <th>Subject 4</th>
          <th>Subject 4</th>
          <th>Subject 4</th>
          <th>Total</th>
          <th>Average</th>
          <th>Rank</th>
      
        </tr>
      </thead>
      <tbody>

                <td>vd</td>
                <td>vd</td>
                <td>vd</td>
    
   
       
      </tbody>
    </Table>
           
        </Row>
      </Container>

</div>
);
};

export default ManageStudentDetails;