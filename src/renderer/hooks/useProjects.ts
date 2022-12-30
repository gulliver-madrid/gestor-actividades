import { useEffect, useReducer, useState } from 'react';
import { checkIsArray } from '../../helpers';
import { AllProjects, Project, ProjectId } from '../../model';
import actions from '../actions/actions';
import projectsReducer, {
    ProjectsActionKind,
    ProjectsControl,
} from '../reducers/projectsReducer';

const useProjects = (): ReturnType => {
    const [readyForSave, setReadyForSave] = useState(false);
    const [projects, dispatch] = useReducer(projectsReducer, {
        values: [],
        nextId: null,
    });

    useEffect(() => {
        const loadProjects = async () => {
            const result = await actions.leerProyectos();
            if (result.ok) {
                const proyectosLeidos = result.value;
                checkIsArray(proyectosLeidos.values);
                updateProjects(proyectosLeidos);
            }
        };
        loadProjects();
    }, []);

    useEffect(() => {
        // Don't save projects if they are just loaded by first time
        if (readyForSave) {
            actions.guardarProyectos(projects);
            return;
        }
        if (projects.values.length) setReadyForSave(true);
    }, [projects]);

    const updateProjects = (loadedProjects: AllProjects) => {
        dispatch({
            type: ProjectsActionKind.SET_INITIAL_PROJECTS,
            loadedProjects,
        });
    };

    const addProject = (projectName: string) => {
        dispatch({
            type: ProjectsActionKind.ADD_PROJECT,
            projectName,
        });
    };

    const removeProject = (projectToRemove: ProjectId) => {
        dispatch({
            type: ProjectsActionKind.REMOVE_PROJECT,
            projectToRemove,
        });
    };

    const renameProject = (id: ProjectId, newName: string) => {
        dispatch({
            type: ProjectsActionKind.RENAME_PROJECT,
            id,
            newName,
        });
    };

    const projectsControl: ProjectsControl = {
        addProject,
        removeProject,
        renameProject,
    };
    return { projects: projects.values, projectsControl };
};

interface ReturnType {
    projects: Project[];
    projectsControl: ProjectsControl;
}

export default useProjects;
