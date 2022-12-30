import { Reducer, useEffect, useReducer, useState } from 'react';

import { deepEqual } from '../../helpers';
import { AllActivities, toAllActivites } from '../../model';
import actions from '../actions/actions';
import activityReducer, {
    ActivitiesAction,
    ActivitiesActionKind,
} from '../reducers/activityReducer';

const validateActivities = (activities: AllActivities) => {
    for (const activity of activities.values) {
        if (!activity) {
            actions.logMsg(`Actividad no valida: ${activity}`, 'error');
        }
    }
};

const useActivities = () => {
    const [activities, dispatch] = useReducer<
        Reducer<AllActivities, ActivitiesAction>
    >(activityReducer, toAllActivites([]));
    const [loadedActivities, setLoadedActivities] =
        useState<null | AllActivities>(null);
    const updateActivities = (newActivities: AllActivities): void => {
        dispatch({
            type: ActivitiesActionKind.SET,
            newActivities,
        });
    };

    useEffect(() => {
        const loadActivities = async () => {
            const result = await actions.leerActividades();

            if (result.ok) {
                const justLoadedActivities = result.value;
                validateActivities(justLoadedActivities);
                setLoadedActivities(justLoadedActivities);
                updateActivities(justLoadedActivities);
            }
        };
        loadActivities();
    }, []);
    useEffect(() => {
        // Don't save activities if they are the same of just loaded
        if (loadedActivities && !deepEqual(activities, loadedActivities)) {
            // console.log({ activities: repr(activities) });
            // console.log({ loadedActivities: repr(loadedActivities) });
            actions.guardarActividades(activities);
            setLoadedActivities(activities);
            return;
        }
    }, [activities]);

    return { activities, dispatch };
};

export default useActivities;
