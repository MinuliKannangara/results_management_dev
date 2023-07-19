import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const SchoolDashboardTable = (props) => {
  const { count0To19, count20To39, count40To59, count60To79, count80To100, absentCount } = props;

  const satCountTotal =
    (count0To19 || 0) +
    (count20To39 || 0) +
    (count40To59 || 0) +
    (count60To79 || 0) +
    (count80To100 || 0) +
    (absentCount || 0);

  return (
    <div>
      <Container fluid>
        <Row>
          <Table striped bordered hover size="sm" style={{ width: '600px' }}>
            <tbody>
              <tr>
                <td style={{ borderRight: 'none', justifyContent:'center' , alignItems:'center'}}>0 - 19</td>
                <td style={{ borderLeft: 'none' }}>{count0To19}</td>
              </tr>
              <tr>
                <td style={{ borderRight: 'none' }}>20 - 39</td>
                <td  style={{ borderLeft: 'none' }}>{count20To39}</td>
              </tr>
              <tr>
                <td style={{ borderRight: 'none' }}>40 - 59</td>
                <td  style={{ borderLeft: 'none' }}>{count40To59}</td>
              </tr>
              <tr>
                <td style={{ borderRight: 'none' }}>60 - 79</td>
                <td style={{ borderLeft: 'none' }}>{count60To79}</td>
              </tr>
              <tr>
                <td style={{ borderRight: 'none' }}>80 - 100</td>
                <td  style={{ borderLeft: 'none' }}>{count80To100}</td>
              </tr>
              <tr>
                <td style={{ borderRight: 'none' }}>Absent</td>
                <td style={{ borderLeft: 'none' }}>{absentCount}</td>
              </tr>
              <tr>
                <td style={{ borderRight: 'none', borderBottom: 'none' }}>Sat Count</td>
                <td style={{ borderLeft: 'none',borderBottom: 'none' }}>{satCountTotal}</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );
};

export default SchoolDashboardTable;
