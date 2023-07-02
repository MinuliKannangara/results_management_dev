import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';


const DivisionWiseTable = (props) => {

  
  
  return (
  <div>
        <Container fluid>
              <Row>
                    <Table striped bordered hover size="sm">
                          <thead>
                            <tr>
                              <th>Division</th>
                              <th>Number of Sat</th>
                              <th>Number of passed</th>
                              <th>Passed percentage</th>
                            </tr>
                          </thead>
                          <tbody>
                           
                            <tr>
                              <td>Minuwangoda</td>
                              <td>{props.minuwangoda}</td>
                              <td>{props.minuangodaPassCount}</td>
                              <td>{(props.minuangodaPassCount / props.minuwangoda) * 100}%</td>
                            </tr>

                            <tr>
                              <td>Meerigama</td>
                              <td>{props.meerigama}</td>
                              <td>{props.meerigamaPassCount}</td>
                              <td>{(props.meerigamaPassCount/props.meerigama)*100}%</td>
                            </tr>

                          
                            <tr>
                              <td>Divulapitiya</td>
                              <td>{props.divulapitiya}</td>
                              <td>{props.divulapitiyaPassCount}</td>
                              <td>{(props.divulapitiyaPassCount/props.divulapitiya)*100}%</td>
                            </tr>
                           
                          </tbody>
                  </Table>
  
              </Row>
        </Container>
  
  </div>
  );
  };
  
  export default DivisionWiseTable;