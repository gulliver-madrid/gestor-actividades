import { InvalidState, truthy } from '../../../helpers';
import {
    ActivityDataForDetail,
    AllActivities,
    FilteredActivities,
    Filters,
    NumberOfActivity,
    Project,
    UsuarioConId,
} from '../../../model';
import {
    filtrarActividades,
    numerarActividades,
} from '../../transformers/activity';
import { getActivityDataForDetails } from './List/helpers';

const filterAndNumber = (
    activities: AllActivities,
    projects: Project[],
    users: UsuarioConId[],
    filters: Filters
): FilteredActivities => {
    const filtered = filtrarActividades(activities.values, projects, filters);
    const sorted = filtered
        .sort(
            (a, b) =>
                new Date(a.fechaCreacion).getTime() -
                new Date(b.fechaCreacion).getTime()
        )
        .reverse();

    const activitiesData = numerarActividades(sorted).map((act) =>
        getActivityDataForDetails(act, users, projects)
    );
    return toFilteredActivities(activitiesData);
};

const toFilteredActivities = (activities: ActivityDataForDetail[]) =>
    activities as FilteredActivities;

const getSelectedActivityData = (
    activities: FilteredActivities,
    users: UsuarioConId[],
    projects: Project[],
    selected: NumberOfActivity | null
): ActivityDataForDetail | undefined => {
    if (selected === null) return undefined;
    const selectedActivity = activities.find(
        (act) => act.numberOfActivity === selected
    );
    if (!truthy(selectedActivity)) {
        throw new InvalidState(
            `No se encontró ninguna actividad con el número ${selected}`
        );
    }
    return getActivityDataForDetails(selectedActivity, users, projects);
};

export { filterAndNumber, getSelectedActivityData };
