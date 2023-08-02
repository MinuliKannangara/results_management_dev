import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../NavBar/NavBar";
import "./OLResults.css";
import DivisionWiseTable from "../Charts/DivWiseTable";
import DivWiseBarChart from "../Charts/BarChartDivWise";
import { useReactToPrint } from "react-to-print";
import "../OtherComponents/DownloadButton.css";

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

  const [divulapitiyaPassedYear1, setDivulapitiyaPassedYear1] = useState(0);
  const [divulapitiyaPassedYear2, setDivulapitiyaPassedYear2] = useState(0);
  const [divulapitiyaPassedYear3, setDivulapitiyaPassedYear3] = useState(0);
  const [divulapitiyaPassedYear4, setDivulapitiyaPassedYear4] = useState(0);
  const [divulapitiyaPassedYear5, setDivulapitiyaPassedYear5] = useState(0);

  const [minuwangodaPassedYear1, setMinuwangodaPassedYear1] = useState(0);
  const [minuwangodaPassedYear2, setMinuwangodaPassedYear2] = useState(0);
  const [minuwangodaPassedYear3, setMinuwangodaPassedYear3] = useState(0);
  const [minuwangodaPassedYear4, setMinuwangodaPassedYear4] = useState(0);
  const [minuwangodaPassedYear5, setMinuwangodaPassedYear5] = useState(0);

  useEffect(() => {
    fetchDataForYear(
      currentYear,
      setMeerigamaCountYear1,
      setDivulapitiyaCountYear1,
      setMinuwangodaCountYear1,
      setMeerigamaPassedYear1,
      setDivulapitiyaPassedYear1,
      setMinuwangodaPassedYear1,
      "scholarship"
    );
    fetchDataForYear(
      currentYear - 1,
      setMeerigamaCountYear2,
      setDivulapitiyaCountYear2,
      setMinuwangodaCountYear2,
      setMeerigamaPassedYear2,
      setDivulapitiyaPassedYear2,
      setMinuwangodaPassedYear2,
      "scholarship"
    );
    fetchDataForYear(
      currentYear - 2,
      setMeerigamaCountYear3,
      setDivulapitiyaCountYear3,
      setMinuwangodaCountYear3,
      setMeerigamaPassedYear3,
      setDivulapitiyaPassedYear3,
      setMinuwangodaPassedYear3,
      "scholarship"
    );
    fetchDataForYear(
      currentYear - 3,
      setMeerigamaCountYear4,
      setDivulapitiyaCountYear4,
      setMinuwangodaCountYear4,
      setMeerigamaPassedYear4,
      setDivulapitiyaPassedYear4,
      setMinuwangodaPassedYear4,
      "scholarship"
    );
    fetchDataForYear(
      currentYear - 4,
      setMeerigamaCountYear5,
      setDivulapitiyaCountYear5,
      setMinuwangodaCountYear5,
      setMeerigamaPassedYear5,
      setDivulapitiyaPassedYear5,
      setMinuwangodaPassedYear5,
      "scholarship"
    );
  }, []);

  const fetchDataForYear = (
    year,
    setDataMeerigama,
    setDataDivulapitiya,
    setDataMinuangoda,
    setDataMeerigamaPass,
    setDataDivulapitiyaPass,
    setDataMinuwangodaPass,
    exam
  ) => {
    fetch(
      `http://localhost:3001/NationalExaminationDetails/NationalExaminationResults/${year}/${exam}`
    )
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

  const setData = (year) => {
    const calculatePercentage = (numerator, denominator) => {
      if (denominator === 0) {
        return "0"; // Return '0%' if denominator is 0 to avoid displaying NaN in the chart
      }
      const percentage = Math.floor((numerator / denominator) * 100);
      return percentage;
    };

    let data = []; // Array to store data for the bar chart
    if (year === currentYear) {
      data = [
        {
          name: "Meerigama",
          value: calculatePercentage(meerigamaPassedYear1, meerigamaCountYear1),
        },
        {
          name: "Divulapitiya",
          value: calculatePercentage(
            divulapitiyaPassedYear1,
            divulapitiyaCountYear1
          ),
        },
        {
          name: "Minuwangoda",
          value: calculatePercentage(
            minuwangodaPassedYear1,
            minuwangodaCountYear1
          ),
        },
      ];
    } else if (year === currentYear - 1) {
      data = [
        {
          name: "Meerigama",
          value: calculatePercentage(meerigamaPassedYear2, meerigamaCountYear2),
        },
        {
          name: "Divulapitiya",
          value: calculatePercentage(
            divulapitiyaPassedYear2,
            divulapitiyaCountYear2
          ),
        },
        {
          name: "Minuwangoda",
          value: calculatePercentage(
            minuwangodaPassedYear2,
            minuwangodaCountYear2
          ),
        },
      ];
    } else if (year === currentYear - 2) {
      data = [
        {
          name: "Meerigama",
          value: calculatePercentage(meerigamaPassedYear3, meerigamaCountYear3),
        },
        {
          name: "Divulapitiya",
          value: calculatePercentage(
            divulapitiyaPassedYear3,
            divulapitiyaCountYear3
          ),
        },
        {
          name: "Minuwangoda",
          value: calculatePercentage(
            minuwangodaPassedYear3,
            minuwangodaCountYear3
          ),
        },
      ];
    } else if (year === currentYear - 3) {
      data = [
        {
          name: "Meerigama",
          value: calculatePercentage(meerigamaPassedYear4, meerigamaCountYear4),
        },
        {
          name: "Divulapitiya",
          value: calculatePercentage(
            divulapitiyaPassedYear4,
            divulapitiyaCountYear4
          ),
        },
        {
          name: "Minuwangoda",
          value: calculatePercentage(
            minuwangodaPassedYear4,
            minuwangodaCountYear4
          ),
        },
      ];
    } else if (year === currentYear - 4) {
      data = [
        {
          name: "Meerigama",
          value: calculatePercentage(meerigamaPassedYear5, meerigamaCountYear5),
        },
        {
          name: "Divulapitiya",
          value: calculatePercentage(
            divulapitiyaPassedYear5,
            divulapitiyaCountYear5
          ),
        },
        {
          name: "Minuwangoda",
          value: calculatePercentage(
            minuwangodaPassedYear5,
            minuwangodaCountYear5
          ),
        },
      ];
    }

    // Filter out data with '0%' values to avoid showing bars for data not available
    const filteredData = data.filter((entry) => entry.value !== "0");

    return filteredData;
  };

  const customStyles = `
  body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    padding: 20px;
    font-size: 14px;
  }
  .pdf-container {
    width: 100%; /* Set the width to 100% of the PDF page */
    margin: 20px; /* Add your desired margins here */
  }
  /* Add any other custom styles for the PDF here */
`;
  const componentPDF = useRef();

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "A/L Results- Division Wise Analysis",
    pageStyle: customStyles,
  });

  return (
    <div>
    
      <NavBar
        PageName="Scholarship Results Analysis"
        Tab1="Division Wise Analysis"
        Tab2="Summary"
        Tab1Link="/Scholarship Results Analysis"
        Tab2Link="/ScholarshipData"
        showButtons={true}
      />


      <div ref={componentPDF}>
        <Container fluid>
          <Row>
            <h3 className="topicsP">Division Wise Analysis</h3>
          </Row>
        </Container>

        <Container fluid>
          <Row>
            <Col lg={6} md={8} sm={6} className="divColumns">
              <div style={{ marginLeft: "70px" }}>
                <h4 className="tableTopicH3">{currentYear}</h4>
                <DivisionWiseTable
                  minuwangoda={minuwangodaCountYear1}
                  meerigama={meerigamaCountYear1}
                  divulapitiya={divulapitiyaCountYear1}
                  meerigamaPassCount={meerigamaPassedYear1}
                  minuangodaPassCount={minuwangodaPassedYear1}
                  divulapitiyaPassCount={divulapitiyaPassedYear1}
                />
              </div>
            </Col>
            <Col
              lg={6}
              md={8}
              sm={6}
              className="divColumns"
              style={{ paddingLeft: "120px", paddingTop: "30px" }}
            >
              <DivWiseBarChart data={setData(currentYear)} />
            </Col>
          </Row>

          <Row>
            <Col lg={6} md={8} sm={6} className="divColumns">
              <div style={{ marginLeft: "70px" }}>
                <h4 className="tableTopicH3">{currentYear - 1}</h4>
                <DivisionWiseTable
                  minuwangoda={minuwangodaCountYear2}
                  meerigama={meerigamaCountYear2}
                  divulapitiya={divulapitiyaCountYear2}
                  meerigamaPassCount={meerigamaPassedYear2}
                  minuangodaPassCount={minuwangodaPassedYear2}
                  divulapitiyaPassCount={divulapitiyaPassedYear2}
                />
              </div>
            </Col>
            <Col
              lg={6}
              md={8}
              sm={6}
              className="divColumns"
              style={{ paddingLeft: "120px", paddingTop: "30px" }}
            >
              <DivWiseBarChart data={setData(currentYear - 1)} />
            </Col>
          </Row>

          <Row>
            <Col lg={6} md={8} sm={6} className="divColumns">
              <div style={{ marginLeft: "70px" }}>
                <h4 className="tableTopicH3">{currentYear - 2}</h4>
                <DivisionWiseTable
                  minuwangoda={minuwangodaCountYear3}
                  meerigama={meerigamaCountYear3}
                  divulapitiya={divulapitiyaCountYear3}
                  meerigamaPassCount={meerigamaPassedYear3}
                  minuangodaPassCount={minuwangodaPassedYear3}
                  divulapitiyaPassCount={divulapitiyaPassedYear3}
                />
              </div>
            </Col>
            <Col
              lg={6}
              md={8}
              sm={6}
              className="divColumns"
              style={{ paddingLeft: "120px", paddingTop: "30px" }}
            >
              <DivWiseBarChart data={setData(currentYear - 2)} />
            </Col>
          </Row>

          <Row>
            <Col lg={6} md={8} sm={6} className="divColumns">
              <div style={{ marginLeft: "70px" }}>
                <h4 className="tableTopicH3">{currentYear - 3}</h4>
                <DivisionWiseTable
                  minuwangoda={minuwangodaCountYear4}
                  meerigama={meerigamaCountYear4}
                  divulapitiya={divulapitiyaCountYear4}
                  meerigamaPassCount={meerigamaPassedYear4}
                  minuangodaPassCount={minuwangodaPassedYear4}
                  divulapitiyaPassCount={divulapitiyaPassedYear4}
                />
              </div>
            </Col>
            <Col
              lg={6}
              md={8}
              sm={6}
              className="divColumns"
              style={{ paddingLeft: "120px", paddingTop: "30px" }}
            >
              <DivWiseBarChart data={setData(currentYear - 3)} />
            </Col>
          </Row>

          <Row>
            <Col lg={6} md={8} sm={6} className="divColumns">
              <div style={{ marginLeft: "70px" }}>
                <h4 className="tableTopicH3">{currentYear - 4}</h4>
                <DivisionWiseTable
                  minuwangoda={minuwangodaCountYear5}
                  meerigama={meerigamaCountYear5}
                  divulapitiya={divulapitiyaCountYear5}
                  meerigamaPassCount={meerigamaPassedYear5}
                  minuangodaPassCount={minuwangodaPassedYear5}
                  divulapitiyaPassCount={divulapitiyaPassedYear5}
                />
              </div>
            </Col>
            <Col
              lg={6}
              md={8}
              sm={6}
              className="divColumns"
              style={{ paddingLeft: "120px", paddingTop: "30px" }}
            >
              <DivWiseBarChart data={setData(currentYear - 4)} />
            </Col>
          </Row>
        </Container>
      </div>
      <Row>
        <button
          onClick={generatePDF}
          className="buttonDownload"
          style={{ width: "140px", marginLeft: "1330px", height: "40px" }}
        >
          Generate PDF
        </button>
      </Row>
    </div>
  );
};

export default ScholarshipResults;
