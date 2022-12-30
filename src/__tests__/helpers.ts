import { asIdActividad } from '../model/actividad';
import { ActividadConId, ProjectName } from '../model';

const createActivityWithId = (activityNumber: number): ActividadConId => ({
    titulo: `Activity number ${activityNumber}`,
    id: asIdActividad(`mocked-id-for-activity-number-${activityNumber}`),
    participantes: [],
    fechaCreacion: new Date(),
    descripcion: '',
    status: 'Activa',
    imagenes: [],
});

const proyectosParaTests = [1, 2, 3, 4].map(
    (n) => `Project number ${n}`
) as ProjectName[];

export { createActivityWithId, proyectosParaTests };
