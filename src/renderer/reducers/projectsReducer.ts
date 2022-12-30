import { Reducer } from 'react';
import { castToProjectId } from '../../model/projects';
import {
    AllProjects,
    getProjectById,
    ProjectId,
    ProjectName,
} from '../../model';

enum ProjectsActionKind {
    ADD_PROJECT = 'ADD_PROJECT',
    REMOVE_PROJECT = 'REMOVE_PROJECT',
    RENAME_PROJECT = 'RENAME_PROJECT',
    SET_INITIAL_PROJECTS = 'SET_INITIAL_PROJECTS',
}

type ProjectsAction =
    | { type: ProjectsActionKind.ADD_PROJECT; projectName: string }
    | {
          type: ProjectsActionKind.REMOVE_PROJECT;
          projectToRemove: ProjectId;
      }
    | {
          type: ProjectsActionKind.RENAME_PROJECT;
          id: ProjectId;
          newName: string;
      }
    | {
          type: ProjectsActionKind.SET_INITIAL_PROJECTS;
          loadedProjects: AllProjects;
      };

const projectsReducer: Reducer<AllProjects, ProjectsAction> = (
    projects,
    action
) => {
    switch (action.type) {
        case ProjectsActionKind.ADD_PROJECT: {
            const nextId = projects.nextId;
            if (nextId === null) {
                throw new Error('NextId is null');
            }
            return {
                values: [
                    ...projects.values,
                    {
                        name: action.projectName as ProjectName,
                        id: castToProjectId(nextId),
                    },
                ],
                nextId: nextId + 1,
            };
        }

        case ProjectsActionKind.REMOVE_PROJECT: {
            const { projectToRemove } = action;
            if (!getProjectById(projects.values, projectToRemove)) {
                throw new Error(
                    `Project with id${projectToRemove} doesn't exist`
                );
            }
            return {
                ...projects,
                values: projects.values.filter((p) => p.id !== projectToRemove),
            };
        }

        case ProjectsActionKind.RENAME_PROJECT: {
            return {
                ...projects,
                values: projects.values.map((p) =>
                    p.id === action.id
                        ? { name: action.newName as ProjectName, id: p.id }
                        : p
                ),
            };
        }
        case ProjectsActionKind.SET_INITIAL_PROJECTS:
            return action.loadedProjects;

        default:
            throw Error('Unknown action: ' + (action as ProjectsAction).type);
    }
};

interface ProjectsControl {
    addProject: (projectName: string) => void;
    removeProject: (projectToRemove: ProjectId) => void;
    renameProject: (id: ProjectId, newName: string) => void;
}
export type { ProjectsControl, ProjectsAction };
export { ProjectsActionKind };
export default projectsReducer;
