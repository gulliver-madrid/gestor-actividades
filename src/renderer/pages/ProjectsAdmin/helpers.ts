import {
    AllActivities,
    asReadable,
    createErr,
    createOk,
    getProjectIds,
    Project,
    ProjectId,
    projectNameAlreadyUsed,
    VoidResult,
} from '../../../model';
import { ProjectsControl } from '../../reducers/projectsReducer';

export const hasAssociatedActivities = (
    activities: AllActivities,
    project: ProjectId
) => activities.values.some((act) => act.project === project);

const PROJECT_NOT_FOUND = asReadable(
    'Error: no se encontró el proyecto indicado.'
);
const PROJECT_ALREADY_EXISTS = asReadable('El proyecto ya existe');
const PROJECT_NAME_ALREADY_IN_USE = asReadable(
    'El nombre indicado ya está en uso'
);

const tryRemove = (
    activities: AllActivities,
    projects: Project[],
    projectsControl: ProjectsControl,
    projectToRemove: ProjectId
): VoidResult => {
    if (hasAssociatedActivities(activities, projectToRemove)) {
        throw new Error(
            `Project with id ${projectToRemove} has associated activities!`
        );
    }
    if (getProjectIds(projects).includes(projectToRemove)) {
        projectsControl.removeProject(projectToRemove);
        return createOk();
    }
    return createErr({
        readableMsg: PROJECT_NOT_FOUND,
    });
};

const tryAddProject = (
    projects: Project[],
    projectsControl: ProjectsControl,
    projectToAdd: string
): VoidResult => {
    if (projectNameAlreadyUsed(projects, projectToAdd)) {
        return createErr({
            readableMsg: PROJECT_ALREADY_EXISTS,
        });
    }
    projectsControl.addProject(projectToAdd);
    return createOk();
};

const tryRename = (
    projects: Project[],
    projectsControl: ProjectsControl,
    id: ProjectId,
    newName: string
): VoidResult => {
    if (projectNameAlreadyUsed(projects, newName)) {
        return createErr({
            readableMsg: PROJECT_NAME_ALREADY_IN_USE,
        });
    }
    projectsControl.renameProject(id, newName);
    return createOk();
};

const sortProjectsByName = (projects: Project[]): Project[] =>
    [...projects].sort(function (a, b) {
        return a.name.localeCompare(b.name, undefined, { numeric: true });
    });

export { tryRemove, tryAddProject, tryRename, sortProjectsByName };
