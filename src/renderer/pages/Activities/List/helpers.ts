import { check, truthy } from '../../../../helpers';
import {
    ActividadNumerada,
    UsuarioConId,
    getUserGetterById,
    ActivityDataForDetail,
    Project,
    getProjectById,
} from '../../../../model';

const getActivityDataForDetails = (
    actNum: ActividadNumerada,
    users: UsuarioConId[],
    projects: Project[]
): ActivityDataForDetail => {
    const getUserById = getUserGetterById(users);

    const act = actNum.activity;

    const idActividad = act.id;
    check(idActividad, 'El id de las actividades no puede ser undefined');
    const participantes = actNum.activity.participantes
        .map((idParticipante) => {
            const user = getUserById(idParticipante);
            return user;
        })
        .filter(truthy);
    const projectId = act.project;
    const projectName =
        projectId === undefined
            ? null
            : getProjectById(projects, projectId).name;
    return {
        ...actNum,
        usersParticipants: participantes,
        id: idActividad,
        projectName,
    };
};

export { getActivityDataForDetails };
