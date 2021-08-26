// FUNCTIONAL DEPENDENCIES
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

//SUBCOMPONENTS?DEPENDENCIES
import Modal from './modal';
import Trigger from './trigger';

// CUSTOM HOOKS
import useToggle from './toggle';

const host = `http://192.168.1.118:3000`;

const NewSensor = (props) => {
    //destructure props
    console.log(props)

    //define state
    const [shown, setShow] = useState(false);

    //useEffects(needed?)

    //eventHandlers
    const showModal = () => {
        setShow(true, () => {
            closeButton.focus();
        });
        toggleScrollLock();
    }
    const closeModal = () => {
        setShow(false);
        Trigger.focus();
        toggleScrollLock();
    }

    //functions
    const toggleScrollLock = () => {
        document.querySelector('html').classList.toggle('scroll-lock');
    }


    return (
        <div>
        <Trigger
            showModal={showModal}
            //buttonRef={(n) => (Trigger = n)}
        />
        {!!shown ? (
            <Modal
            onSubmit={props.onSubmit}
            data={props.data}
            //modalRef={(n) => (modal = n)}
            //buttonRef={(n) => (closeButton = n)}
            closeModal={closeModal}
            />
        ) : null}
        </div>
    )

    // return (
    //     <div className="modal">
    //         <button onClick={showModal}>
    //             Create Similar
    //         </button>
    //         {!!show ? (
    //             <Modal 
    //                 onSubmit={props.onSubmit}
    //                 //buttonRef={(n) => (closeButton = n)}
    //                 closeModal={closeModal}
    //             />
    //         )
    //             :null
    //         }
    //     </div>

    // )
}
export default NewSensor;
