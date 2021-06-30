import React from "react";
import logo from "../assets/logo.svg";
// import "./Editor2.scss";

function Menu() {
  return (
    <div id="listContainer">
      <div id="currentFilters"></div>
      <div id="list">
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default Menu;
