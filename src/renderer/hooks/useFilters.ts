import { useReducer } from 'react';

import { Status, ProjectName, UsuarioConId, Filters } from '../../model';
import { createemptyFilters } from '../transformers/activity';
import filtersReducer, {
    FiltersAction,
    FiltersActionKind,
    FiltersControl,
} from '../reducers/filtersReducer';

interface ReturnType {
    filters: Filters;
    filtersControl: FiltersControl;
}

const useFilters = (resetPage: () => void): ReturnType => {
    const [filters, _dispatch] = useReducer(
        filtersReducer,
        createemptyFilters()
    );

    const dispatch = (action: FiltersAction) => {
        _dispatch(action);
        resetPage();
    };

    const addProject = (project: ProjectName) =>
        dispatch({
            type: FiltersActionKind.ADD_PROJECT_FILTER,
            project,
        });

    const removeProject = (project: ProjectName) =>
        dispatch({
            type: FiltersActionKind.REMOVE_PROJECT_FILTER,
            project,
        });

    const addStatus = (status: Status) =>
        dispatch({
            type: FiltersActionKind.ADD_STATUS_FILTER,
            status,
        });

    const removeStatus = (status: Status) =>
        dispatch({
            type: FiltersActionKind.REMOVE_STATUS_FILTER,
            status,
        });

    const updateParticipant = (user: UsuarioConId | null) =>
        dispatch({
            type: FiltersActionKind.CHANGE_PARTICIPANT_FILTER,
            user,
        });

    const resetFilters = () =>
        dispatch({ type: FiltersActionKind.RESET_FILTERS });
    const changeSearchText = (byName: string) =>
        dispatch({ type: FiltersActionKind.CHANGE_SEARCH_BY_NAME, byName });

    return {
        filters,
        filtersControl: {
            addProject,
            removeProject,
            addStatus,
            removeStatus,
            updateParticipant,
            resetFilters,
            changeSearchText,
        },
    };
};

export default useFilters;
