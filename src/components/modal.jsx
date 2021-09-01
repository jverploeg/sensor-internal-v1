// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import Form from './form';
import FocusTrap from 'focus-trap-react';


const Modal = ({
  data,
  closeModal,
  onSubmit
}) => {
  return ReactDOM.createPortal(
    <FocusTrap>
      <aside
        tag="aside"
        role="dialog"
        tabIndex="-1"
        aria-modal="true"
        className="modal-cover"
        // onClick={onClickOutside}
        // onKeyDown={onKeyDown}
      >
        <div className="modal-area" /*ref={modalRef}*/>
          <button
            //ref={buttonRef}
            aria-label="Close Modal"
            aria-labelledby="close-modal"
            className="_modal-close"
            onClick={closeModal}
          >
            <span id="close-modal" className="_hide-visual">
              Close
            </span>
            <svg className="_modal-close-icon" viewBox="0 0 40 40">
              <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </button>
          <div className="modal-body">
            <Form
              data={data}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </aside>
    </FocusTrap>,
    document.body
  );
};
export default Modal;

/*
const Portal = (props) => {
    //logic...

    return ReactDOM.createPortal(
        <div>
            <h1>TESTING</h1>
        </div>,
        document.body
    )
}
export default Portal;
*/

//codesandbox.io/s/k22pk5qrm5?from-embed=&file=/src/Modal/index.js