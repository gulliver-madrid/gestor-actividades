import {
    UsuarioConId,
    ProjectName,
    Filters,
    ActividadConId,
    Status,
    Project,
    getProjectById,
} from '../../../model';

const createemptyFilters = (): Filters => ({
    byName: '',
    projects: [],
    status: [],
    version: 0,
});

const filtrarPorProyectos = (
    activities: ActividadConId[],
    projects: Project[],
    projectFilters: ProjectName[]
) =>
    projectFilters.length
        ? activities.filter((activity) =>
              activity.project === undefined
                  ? false
                  : activity.project &&
                    projectFilters.includes(
                        getProjectById(projects, activity.project).name
                    )
          )
        : activities;

const filtrarPorStatus = (
    activities: ActividadConId[],
    statusFilters: Status[]
) =>
    statusFilters.length
        ? activities.filter((activity) =>
              statusFilters.includes(activity.status)
          )
        : activities;

/**
/* Devuelve un array con las actividades filtradas por proyectos,
/* status y usuario
*/
function filtrarActividades(
    activities: ActividadConId[],
    projects: Project[],
    filters: Filters
): ActividadConId[] {
    const {
        byName,
        projects: projectFilter,
        user: userFilter,
        status: statusFilter,
    } = filters;
    let filtered = filtrarPorProyectos(activities, projects, projectFilter);
    filtered = filtrarPorStatus(filtered, statusFilter);
    filtered = filtrarPorUsuario(filtered, userFilter);
    filtered = filterByName(filtered, byName);
    return filtered;
}

const filtrarPorUsuario = (
    activities: ActividadConId[],
    userFilter?: UsuarioConId
) =>
    userFilter
        ? activities.filter((activity) =>
              activity.participantes.includes(userFilter.id)
          )
        : activities;

const filterByName = (activities: ActividadConId[], byName: string) =>
    byName
        ? activities.filter((activity) =>
              activity.titulo.toLowerCase().includes(byName.toLowerCase())
          )
        : activities;

export { filtrarActividades, createemptyFilters };
