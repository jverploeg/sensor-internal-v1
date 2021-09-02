// FUNCTIONAL DEPENDENCIES
import React, { useState, useEffect, useCallback } from 'react';

//SUBCOMPONENTS?DEPENDENCIES
import Modal2 from './modal2';
import Trigger2 from './Trigger2';

const FreshSensor = (props) => {
    //destructure props
    //console.log(props)

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
        Trigger2.focus();
        toggleScrollLock();
    }

    //functions
    const toggleScrollLock = () => {
        document.querySelector('html').classList.toggle('scroll-lock');
    }


    return (
        <div>
        <Trigger2
            showModal={showModal}
            //buttonRef={(n) => (Trigger = n)}
        />
        {!!shown ? (
            <Modal2
            onSubmit={props.onSubmit}
            data={props.data}
            //modalRef={(n) => (modal = n)}
            //buttonRef={(n) => (closeButton = n)}
            closeModal={closeModal}
            />
        ) : null}
        </div>
    )
}
export default FreshSensor;