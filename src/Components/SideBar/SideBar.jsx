import React from "react";
import "./SideBar.css";
import Logo from "./logoForLogin2.png";

const SideBar = (props) => {
    return(
        <div className="SideBar">
            <div className="topDiv">
                <div className="Logo">
                    <img src={Logo} alt="logo"/>

                </div>
            </div>

        </div>
    ); 
};

export default SideBar;