import {
    ActividadConId,
    ActividadNumerada,
    NumberOfActivity,
} from '../../../model';
import { createemptyFilters, filtrarActividades } from './filters';

const numerarActividades = (
    activities: ActividadConId[]
): ActividadNumerada[] =>
    activities.map((activity: ActividadConId, index: number) => ({
        numberOfActivity: (index + 1) as NumberOfActivity,
        activity,
    }));

export { filtrarActividades, numerarActividades, createemptyFilters };
