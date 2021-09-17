import React from 'react';


const Trigger = ({ buttonRef, showModal }) => {
  return (
    <button
      className="btn btn-lg btn-danger center modal-button"
      ref={buttonRef}
      onClick={showModal}
    >
      Create Similar
    </button>
  );
};

export default Trigger;