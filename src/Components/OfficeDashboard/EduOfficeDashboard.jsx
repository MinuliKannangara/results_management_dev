import React, { useEffect, useState, PureComponent } from 'react';
import { Container, Row, Col,FormLabel } from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';
import DashboardCards from '../OtherComponents/dashboardCards';
import { faUserGroup,faLandmark } from '@fortawesome/free-solid-svg-icons'
// import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import PieChartForSchool from '../Charts/PieChartForSchools';
import SchoolDashboardTable from '../Charts/TableSchoolDashboard';





const EduOfficeDashboard= () => {

  
return (
<div>
<NavBar PageName="Manage School Users" />

</div>
);
};

export default EduOfficeDashboard;