import React from 'react';
import { saveAs } from 'file-saver';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button } from "@mui/material";
import './DownloadButton.css';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const generatePDF = (values) => {




  console.log(values.table);

  if (!values) {
    alert("Please fill the form first");
    return;
  }

  function getValues(data) {
    // Initialize an empty array to store the values
    const values = [];
  
    // Iterate over each property in the data object
    for (const school in data) {
      if (data.hasOwnProperty(school)) {
        // Extract the counts and absentCount properties from each school
        const { absentCount, count0To19, count20To39, count40To59, count60To79, count80To100 } = data[school];
  
        // Push the extracted values into the array
        values.push({
          school,
          absentCount,
          count0To19,
          count20To39,
          count40To59,
          count60To79,
          count80To100,
        });
      }
    }
  
    return values;
  }

  console.log(getValues(values.table));

  const docDefinition = {
    pageMargins: [30, 20, 30, 20],
    content: [
      {
        text: 'Zonal Subject Results Analysis - ' + values.year + '- ' + values.subject,
        style: 'header'
      },
      {
        text: 'Division : ' + values.division,
        style: 'title',
      },
      {
        text: 'Grade : ' + values.grade,
        style: 'title',
      },
      {
        text: 'Term : ' + values.term,
        style: 'title',
      },
      {
        table: {
          headerRows: 1,
          widths: ['*', 40, 40, 40, 40, 40, 40],
          body: [
            [
              'School',
              '0-19',
              '20-39',
              '40-59',
              '60-79',
              '80-100',
              'Absent',
            ],
            // ...tableBody,
           ...getValues(values.table).map((school, index) => [
              school?.school ,
              school?.count0To19  ,
              school?.count20To39 ,
              school?.count40To59 ,
              school?.count60To79 ,
              school?.count80To100 ,
              school?.absentCount ,
            ]),
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 15,
        bold: true,
        alignment: 'center',
        margin: [10, 0, 20, 30],
      },
      table: {
        margin: [0, 0, 0, 20],
      },
      title: {
        margin: [0, 0, 0, 20],
      },
    },
    defaultStyle: {
    //  font: 'sans-serif',
    },
  };

  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  pdfDocGenerator.getBlob((blob) => {
    saveAs(blob, `Subject_Wise_Analysis_${values.subject}_${values.year}.pdf`);
  });
};

const DownloadPDFButton = ({ values }) => {
  const handleClick = () => {
    generatePDF(values);
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <Button onClick={handleClick} className="buttonDownload" style={{backgroundColor:"#347715"}}>
        Download
      </Button>
    </div>
  );
};

export default DownloadPDFButton;
