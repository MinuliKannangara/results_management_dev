import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const DivisionWiseTable = (props) => {
  const calculatePercentage = (numerator, denominator) => {
    if (denominator === 0) {
      return '0';
    }
    return `${Math.floor((numerator / denominator) * 100)}%`;
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Division</th>
                <th>Number of Sat</th>
                <th>Number of Passed</th>
                <th>Passed Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Minuwangoda</td>
                <td>{props.minuwangoda}</td>
                <td>{props.minuangodaPassCount}</td>
                <td>{calculatePercentage(props.minuangodaPassCount, props.minuwangoda)}</td>
              </tr>

              <tr>
                <td>Meerigama</td>
                <td>{props.meerigama}</td>
                <td>{props.meerigamaPassCount}</td>
                <td>{calculatePercentage(props.meerigamaPassCount, props.meerigama)}</td>
              </tr>

              <tr>
                <td>Divulapitiya</td>
                <td>{props.divulapitiya}</td>
                <td>{props.divulapitiyaPassCount}</td>
                <td>{calculatePercentage(props.divulapitiyaPassCount, props.divulapitiya)}</td>
              </tr>

              <tr>
                <td>Total</td>
                <td>{props.meerigama + props.minuwangoda + props.divulapitiya}</td>
                <td>{props.minuangodaPassCount+props.meerigamaPassCount+props.divulapitiyaPassCount}</td>
                <td>{calculatePercentage(props.minuangodaPassCount+props.meerigamaPassCount+props.divulapitiyaPassCount, props.meerigama + props.minuwangoda + props.divulapitiya)}</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );
};

export default DivisionWiseTable;
