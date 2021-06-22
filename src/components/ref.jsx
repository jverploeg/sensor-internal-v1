import { useRef, useState } from 'react';

//useref
export default function useReferredState(initialValue) {
    const [state, setState] = useState(initialValue);
    const reference = useRef(state);

    const setReferredState = value => {
        reference.current = value;
        setState(value);
    };

    return [reference, setReferredState];
}