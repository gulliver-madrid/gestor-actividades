import { truthy } from '../../helpers';
import { userToString, Filters, ProjectName } from '../../model';
import { naturalList } from './naturalList';

/**
 * Create a msg describing the filter status of the activity list
 */
const crearMsgFiltros = (filters: Filters): string => {
    const {
        projects: projectFilters,
        user: userFilter,
        status: statusFilter,
    } = filters;
    const lengthProjectFilters = projectFilters.length;
    const lengthStatusFilter = statusFilter.length;

    if (!anyFilterActive(filters)) {
        return 'No hay filtros activos';
    }

    let userStr = '' || (userFilter && userToString(userFilter));

    if (!(lengthProjectFilters || lengthStatusFilter || filters.byName))
        return `Filtrando actividades en las que participa ${userStr}`;

    const proyectosStr = getProjectsStr(projectFilters);
    const statusStr =
        '' ||
        (lengthStatusFilter && `status ${naturalList(statusFilter, 'o')}`);
    userStr = userStr && 'usuario ' + userStr;
    const searchText = filters.byName && `texto "${filters.byName}"`;
    const strings = [proyectosStr, statusStr, userStr, searchText].filter(
        truthy
    );

    return `Filtrando por ${naturalList(strings)}`;
};

function getProjectsStr(projectFilters: ProjectName[]) {
    const projectFilterNames = projectFilters.map((name) => `"${name}"`);
    switch (projectFilters.length) {
        case 0:
            return '';
        case 1:
            return `proyecto ${projectFilterNames}`;
        default:
            return `proyectos ${naturalList(projectFilterNames, 'o')}`;
    }
}

/**
 * Create a msg stating that there is not activities to display
 */
function createNoActivityMsg(filters: Filters) {
    const filterStr = anyFilterActive(filters)
        ? ' con los filtros actuales'
        : '';
    return `No hay ninguna actividad registrada${filterStr}.`;
}

const anyFilterActive = (filters: Filters) =>
    filters.projects.length ||
    filters.user ||
    filters.status.length ||
    filters.byName;

export { crearMsgFiltros, createNoActivityMsg };
