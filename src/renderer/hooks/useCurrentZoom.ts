import { useEffect, useState } from 'react';

import actions from '../actions/actions';

const UPDATE_TIME = 800;

const useCurrentZoom = () => {
    const [zoom, setZoom] = useState(100);
    useEffect(() => {
        const getZoom = async () => {
            const current = await actions.readCurrentZoom();
            setZoom(current);
            setTimeout(getZoom, UPDATE_TIME);
        };
        getZoom();
    }, []);
    return zoom;
};

export default useCurrentZoom;
