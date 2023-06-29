import React, { useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Container } from "react-bootstrap";
import {Chart as ChartJS} from 'chart.js/auto';

const BarChart = ({chartData}) => {

    // const [chartData, setChartData] = useState("");

    // const fetchData = () =>{
    //     Axios.get("http://localhost:3001/api/get").then((response) => {
    //         console.log(response);
    //         setChartData({
    //             labels: response.data.map((data) => data.name),
    //             datasets: [],
    //     });
    // }
    

    // to holds the data formatted for the bar chart
    const [data, setData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],   
        datasets: []
    });
    return (
        <Container>
            <Bar data={chartData}/>
        </Container>
    );
}
export default BarChart;
