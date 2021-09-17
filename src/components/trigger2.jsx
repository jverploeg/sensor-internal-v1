import React from 'react';


const Trigger2 = ({ buttonRef, showModal }) => {
  return (
    <button
      className="btn btn-lg btn-danger center modal-button"
      ref={buttonRef}
      onClick={showModal}
    >
      Create New
    </button>
  );
};

export default Trigger2;