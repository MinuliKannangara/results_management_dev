import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './DashboardCards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function DashboardCards(Props) {
  return (
    <div class="card" style={{ borderBottom: Props.borderColor }}>
    <p class="time-text"><span>{Props.studentCount}</span></p>
    <p class="text">{Props.DisplayText}</p>
    <FontAwesomeIcon icon={Props.IconName} className="icon-small"   />
    </div>
  );
}

export default DashboardCards;