import { Actividad, AllActivities, IdActividad } from '../../../../model';
import { findById } from '../../../../helpers';

const obtenerEstadoInicialActividad = (
    activities: AllActivities,
    idActividad: IdActividad
) => {
    const activity = findById(activities.values, idActividad);
    return activity;
};

const validateIdActividad = (
    modificada: Actividad,
    idActividad: IdActividad
) => {
    if (modificada.id !== idActividad) {
        throw new Error(
            `Id de actividad erróneo: ${modificada.id} !== ${idActividad}`
        );
    }
};

export { obtenerEstadoInicialActividad, validateIdActividad };
