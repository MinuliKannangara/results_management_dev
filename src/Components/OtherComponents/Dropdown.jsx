import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './Dropdown.css';

function DropdownButtonForAll(Props) {
  return (
    <DropdownButton className='customDropdownButton2' id="dropdown-basic-button" title={Props.dropdownTitle}>
      <Dropdown.Item className='customDropdown2' href="#/action-1">{Props.item1}</Dropdown.Item>
      <Dropdown.Item className='customDropdown' href="#/action-2">{Props.item2}</Dropdown.Item>
      <Dropdown.Item className='customDropdown' href="#/action-3">{Props.item3}</Dropdown.Item>
      <Dropdown.Item className='customDropdown' href="#/action-4">{Props.item4}</Dropdown.Item>
      <Dropdown.Item className='customDropdown' href="#/action-5">{Props.item5}</Dropdown.Item>
    
    </DropdownButton>
  );
}

export default DropdownButtonForAll;