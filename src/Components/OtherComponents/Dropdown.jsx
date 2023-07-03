import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './Dropdown.css';

function DropdownButtonForAll(Props) {
  return (
    <DropdownButton className='customDropdownButton' id="dropdown-basic-button" title="Dropdown button">
      <Dropdown.Item className='customDropdown' href="#/action-1">{Props.year1}</Dropdown.Item>
      <Dropdown.Item className='customDropdown' href="#/action-2">{Props.year2}</Dropdown.Item>
      <Dropdown.Item className='customDropdown' href="#/action-3">{Props.year3}</Dropdown.Item>
      <Dropdown.Item className='customDropdown' href="#/action-1">{Props.year4}</Dropdown.Item>
      <Dropdown.Item className='customDropdown' href="#/action-2">{Props.year5}</Dropdown.Item>
      <Dropdown.Item className='customDropdown' href="#/action-3">{Props.year6}</Dropdown.Item>
    </DropdownButton>
  );
}

export default DropdownButtonForAll;