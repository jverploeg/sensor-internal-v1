// FUNCTIONAL DEPENDENCIES
import { useCallback, useState } from 'react';

///////////////////////////////////TOGGLES BOOLEAN VALUE//////////////////////////////////////////
const useToggle = (initialState = false) => {
    //////////////STATE DECLARATION////////////////////////////////////////////////////
    const [state, setState] = useState(initialState);
    //////////////////////////////////////////////////////////////////////////////////

    const toggle = useCallback(() => setState(state => !state), []);
    
    return [state, toggle]
}
export default useToggle;