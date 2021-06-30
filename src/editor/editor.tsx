import React from "react";
import logo from "../assets/logo.svg";
import Node from "../node/node";
import "./editor.scss";

function Editor() {
  return (
    <div id="listContainer">
      <div id="currentFilters"></div>
      <div id="list">
        {/* <div className="loader"></div> */}
        <Node text="This is my text" isExpanded={true}></Node>
      </div>
    </div>
  );
}

export default Editor;
