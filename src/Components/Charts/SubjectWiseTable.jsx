import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const SubjectWiseTable = (props) => {
  const currentYear = new Date().getFullYear();

  const calculatePercentage = (numerator, denominator) => {
    if (denominator === 0) {
      return '0%';
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
                <th>Year</th>
                <th colSpan={3}>Minuwangoda</th>
                <th colSpan={3}>Meerigama</th>
                <th colSpan={3}>Divulapitiya</th>
              </tr>
              <tr>
                <th></th>
                <th>sat</th>
                <th>pass</th>
                <th>%</th>
                <th>sat</th>
                <th>pass</th>
                <th>%</th>
                <th>sat</th>
                <th>pass</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{currentYear}</td>
                <td>{props.minuwangodaSatYear1}</td>
                <td>{props.minuwangodaPassYear1}</td>
                <td>{calculatePercentage(props.minuwangodaPassYear1, props.minuwangodaSatYear1)}</td>
                <td>{props.meerigamaSatYear1}</td>
                <td>{props.meerigamaPassYear1}</td>
                <td>{calculatePercentage(props.meerigamaPassYear1, props.meerigamaSatYear1)}</td>
                <td>{props.divulapitiyaSatYear1}</td>
                <td>{props.divulapitiyaPassYear1}</td>
                <td>{calculatePercentage(props.divulapitiyaPassYear1, props.divulapitiyaSatYear1)}</td>
              </tr>

              <tr>
                <td>{currentYear - 1}</td>
                <td>{props.minuwangodaSatYear2}</td>
                <td>{props.minuwangodaPassYear2}</td>
                <td>{calculatePercentage(props.minuwangodaPassYear2, props.minuwangodaSatYear2)}</td>
                <td>{props.meerigamaSatYear2}</td>
                <td>{props.meerigamaPassYear2}</td>
                <td>{calculatePercentage(props.meerigamaPassYear2, props.meerigamaSatYear2)}</td>
                <td>{props.divulapitiyaSatYear2}</td>
                <td>{props.divulapitiyaPassYear2}</td>
                <td>{calculatePercentage(props.divulapitiyaPassYear2, props.divulapitiyaSatYear2)}</td>
              </tr>

              <tr>
                <td>{currentYear - 2}</td>
                <td>{props.minuwangodaSatYear3}</td>
                <td>{props.minuwangodaPassYear3}</td>
                <td>{calculatePercentage(props.minuwangodaPassYear3, props.minuwangodaSatYear3)}</td>
                <td>{props.meerigamaSatYear3}</td>
                <td>{props.meerigamaPassYear3}</td>
                <td>{calculatePercentage(props.meerigamaPassYear3, props.meerigamaSatYear3)}</td>
                <td>{props.divulapitiyaSatYear3}</td>
                <td>{props.divulapitiyaPassYear3}</td>
                <td>{calculatePercentage(props.divulapitiyaPassYear3, props.divulapitiyaSatYear3)}</td>
              </tr>

              <tr>
                <td>{currentYear - 3}</td>
                <td>{props.minuwangodaSatYear4}</td>
                <td>{props.minuwangodaPassYear4}</td>
                <td>{calculatePercentage(props.minuwangodaPassYear4, props.minuwangodaSatYear4)}</td>
                <td>{props.meerigamaSatYear4}</td>
                <td>{props.meerigamaPassYear4}</td>
                <td>{calculatePercentage(props.meerigamaPassYear4, props.meerigamaSatYear4)}</td>
                <td>{props.divulapitiyaSatYear4}</td>
                <td>{props.divulapitiyaPassYear4}</td>
                <td>{calculatePercentage(props.divulapitiyaPassYear4, props.divulapitiyaSatYear4)}</td>
              </tr>

              <tr>
                <td>{currentYear - 4}</td>
                <td>{props.minuwangodaSatYear5}</td>
                <td>{props.minuwangodaPassYear5}</td>
                <td>{calculatePercentage(props.minuwangodaPassYear5, props.minuwangodaSatYear5)}</td>
                <td>{props.meerigamaSatYear5}</td>
                <td>{props.meerigamaPassYear5}</td>
                <td>{calculatePercentage(props.meerigamaPassYear5, props.meerigamaSatYear5)}</td>
                <td>{props.divulapitiyaSatYear5}</td>
                <td>{props.divulapitiyaPassYear5}</td>
                <td>{calculatePercentage(props.divulapitiyaPassYear5, props.divulapitiyaSatYear5)}</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );
};

export default SubjectWiseTable;
