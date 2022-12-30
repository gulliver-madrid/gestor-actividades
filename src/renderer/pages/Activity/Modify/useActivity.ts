import { useState } from 'react';

import { Actividad, ActividadConId } from '../../../../model';
import { deepEqual } from '../../../../helpers';

const useActivity = (initialState: ActividadConId) => {
    const [activity, setActivity] = useState<Actividad>(initialState);
    const changed = !deepEqual(activity, initialState);
    return { activity, setActivity, changed };
};

export default useActivity;
