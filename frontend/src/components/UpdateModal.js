import React from "react";
import "./Modal.css";

function Modal({ setOpenModal }) {
  return (
    <div className="workout-details">
      <div className="titleCloseBtn">
        <button
          onClick={() => {
            setOpenModal(false);
          }}
        >
          X
        </button>
      </div>
      <div className="title">
        <h4>Edit Grade</h4>
      </div>
      <div className="body">
        <p>The next page looks amazing. Hope you want to go there!</p>
      </div>
      <div className="footer">
        <button
          onClick={() => {
            setOpenModal(false);
          }}
          id="cancelBtn"
        >
          Cancel
        </button>
        <button>Continue</button>
      </div>
    </div>
  );
}

export default Modal;
