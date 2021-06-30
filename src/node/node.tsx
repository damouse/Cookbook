import React from "react";
import logo from "../assets/logo.svg";
import "./node.scss";

interface Props {
  text: string;
  isExpanded: boolean;
}

const RIGHT_ARROW = "&#9654;";
const DOWN_ARROW = "&#9660;";
const DOT = "&#9679;";

function Node(props: Props) {
  function toggleCompleted() {
    // return produce(this, draft => {
    // draft.isCompleted = !draft.isCompleted;
    // });
  }

  function expand() {
    // return produce(this, draft => {
    // draft.isExpanded = true;
    // });
  }

  function toggleExpanded() {
    // return produce(this, draft => {
    // draft.isExpanded = !draft.isExpanded;
    // });
  }

  function addTag() {
    // return produce(this, draft => {
    // draft.tags.push(tag);
    // });
  }

  function setTags() {
    // return produce(this, draft => {
    // draft.tags = tags;
    // });
  }

  function arrowDiv() {
    // if (props.children.length > 0) {
    //   return <div className="node-arrow noselect">${nodeArrow()}</div>;
    // } else {
    //   return `<div class="no-node-arrow noselect"></div>`;
    // }
    return <div className="no-node-arrow noselect"></div>;
  }

  function nodeArrow() {
    return props.isExpanded ? DOWN_ARROW : RIGHT_ARROW;
  }

  return (
    <div className="node-row">
      {/* {arrowDiv()} */}
      <div className="no-node-arrow noselect"></div>
      <a href="/#/${node.id}" className="node-bullet noselect">
        &#9679;
      </a>
      <div className="node-text" contentEditable="true" tabIndex={-1}>
        {props.text}
      </div>
    </div>
  );
}

export default Node;
