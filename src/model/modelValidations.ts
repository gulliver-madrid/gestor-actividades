import { ActividadConId } from './actividad';
import { isString } from './validations';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isActividadWithId(obj: any): obj is ActividadConId {
    if (typeof obj !== 'object') {
        return false;
    }
    if (
        !(
            Array.isArray(obj.participantes) &&
            Boolean(obj.status) &&
            Boolean(obj.fechaCreacion) &&
            isString(obj.descripcion)
        ) // La descripcion puede estar vacia
    )
        return false;

    return (
        Boolean(obj.titulo) &&
        Array.isArray(obj.imagenes) &&
        (obj.project === undefined || typeof obj.project === 'number') &&
        Boolean(obj.id)
    );
}
// eslint-disable-next-line import/prefer-default-export
export { isActividadWithId };
