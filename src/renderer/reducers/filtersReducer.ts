import { Reducer } from 'react';
import { Status, ProjectName, Filters, UsuarioConId } from '../../model';
import { createemptyFilters } from '../transformers/activity';

export enum FiltersActionKind {
    CHANGE_SEARCH_BY_NAME = 'CHANGE_SEARCH_BY_NAME',
    ADD_PROJECT_FILTER = 'ADD_PROJECT_FILTER',
    REMOVE_PROJECT_FILTER = 'REMOVE_PROJECT_FILTER',
    ADD_STATUS_FILTER = 'ADD_STATUS_FILTER',
    REMOVE_STATUS_FILTER = 'REMOVE_STATUS_FILTER',
    CHANGE_PARTICIPANT_FILTER = 'CHANGE_PARTICIPANT_FILTER',
    RESET_FILTERS = 'RESET_FILTERS',
}

type FiltersAction =
    | {
          type: FiltersActionKind.RESET_FILTERS;
      }
    | { type: FiltersActionKind.CHANGE_SEARCH_BY_NAME; byName: string }
    | { type: FiltersActionKind.ADD_PROJECT_FILTER; project: ProjectName }
    | {
          type: FiltersActionKind.REMOVE_PROJECT_FILTER;
          project: ProjectName;
      }
    | { type: FiltersActionKind.ADD_STATUS_FILTER; status: Status }
    | {
          type: FiltersActionKind.REMOVE_STATUS_FILTER;
          status: Status;
      }
    | {
          type: FiltersActionKind.CHANGE_PARTICIPANT_FILTER;
          user: UsuarioConId | null;
      };

const addOne = (n: number) => n + 1;
const withVersion = (filters: Filters, version: number) => ({
    ...filters,
    version,
});

const filtersReducer: Reducer<Filters, FiltersAction> = (filters, action) => {
    const newVersion = addOne(filters.version);
    const withNewVersion = (filters: Filters) =>
        withVersion(filters, newVersion);
    switch (action.type) {
        case FiltersActionKind.RESET_FILTERS:
            return createemptyFilters();
        case FiltersActionKind.CHANGE_SEARCH_BY_NAME:
            return withNewVersion({
                ...filters,
                byName: action.byName,
            });
        case FiltersActionKind.ADD_PROJECT_FILTER:
            return withNewVersion({
                ...filters,
                projects: [...filters.projects, action.project],
            });

        case FiltersActionKind.REMOVE_PROJECT_FILTER:
            return withNewVersion({
                ...filters,
                projects: filters.projects.filter(
                    (item) => item !== action.project
                ),
            });
        case FiltersActionKind.ADD_STATUS_FILTER:
            return withNewVersion({
                ...filters,
                status: [...filters.status, action.status],
            });
        case FiltersActionKind.REMOVE_STATUS_FILTER:
            return withNewVersion({
                ...filters,
                status: filters.status.filter((item) => item !== action.status),
            });
        case FiltersActionKind.CHANGE_PARTICIPANT_FILTER:
            return withNewVersion({
                ...filters,
                user: action.user || undefined,
            });
        default:
            throw Error('Unknown action: ' + (action as FiltersAction).type);
    }
};

interface FiltersControl {
    addProject: (project: ProjectName) => void;
    removeProject: (project: ProjectName) => void;
    addStatus: (status: Status) => void;
    removeStatus: (status: Status) => void;
    updateParticipant: (user: UsuarioConId | null) => void;
    resetFilters: () => void;
    changeSearchText: (newText: string) => void;
}
export type { FiltersControl, FiltersAction };
export default filtersReducer;
