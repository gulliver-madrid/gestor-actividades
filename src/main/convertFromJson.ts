import { isActividadWithId } from '../model/modelValidations';
import {
    IdUsuario,
    IdImagen,
    Status,
    statusDefault,
    posiblesStatus,
    ActividadConId,
    ActividadFromJson,
    IdActividad,
} from '../model';
import { castToProjectId } from '../model/projects';

const convertToActivity = (activity: ActividadFromJson): ActividadConId => {
    const nueva = {} as ActividadConId;
    const {
        participantes,
        status,
        fechaCreacion,
        descripcion,
        imagenes,
        titulo,
        project,
    } = activity;

    nueva.participantes = (participantes as IdUsuario[]) || [];
    nueva.status = posiblesStatus.includes(status as Status)
        ? (status as Status)
        : statusDefault;
    nueva.fechaCreacion = fechaCreacion ? new Date(fechaCreacion) : new Date();
    nueva.descripcion = descripcion;
    nueva.imagenes = (imagenes as IdImagen[]) || [];
    nueva.titulo = titulo;
    if (project) {
        nueva.project = castToProjectId(project);
    }

    nueva.id = activity.id as IdActividad;
    if (!isActividadWithId(nueva)) {
        // eslint-disable-next-line no-console
        console.error(`Actividad no valida: ${JSON.stringify(nueva)}`);
    }
    return nueva;
};

export { convertToActivity };
