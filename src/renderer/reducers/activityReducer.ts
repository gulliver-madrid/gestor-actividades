import {
    Actividad,
    ActividadConId,
    AllActivities,
    IdActividad,
    IdUsuario,
    toAllActivites,
} from '../../model';
import actions from '../actions/actions';

enum ActionKind {
    REMOVE = 'remove',
    SET = 'set',
    ADD = 'add',
    MODIFY = 'modify',
    REMOVE_USER = 'remove_user',
}

type ActivitiesAction =
    | { type: ActionKind.REMOVE; idToRemove: IdActividad }
    | { type: ActionKind.SET; newActivities: AllActivities }
    | { type: ActionKind.ADD; activity: ActividadConId }
    | { type: ActionKind.MODIFY; modificada: ActividadConId }
    | { type: ActionKind.REMOVE_USER; idUsuario: IdUsuario };

const activityReducer = (
    activities: AllActivities,
    action: ActivitiesAction
): AllActivities => {
    switch (action.type) {
        case ActionKind.REMOVE:
            logRemoveActivity(action.idToRemove);
            return toAllActivites(
                activities.values.filter(
                    (act: Actividad) => act.id !== action.idToRemove
                )
            );
        case ActionKind.SET:
            return toAllActivites([...action.newActivities.values]);
        case ActionKind.ADD:
            return toAllActivites([...activities.values, action.activity]);
        case ActionKind.MODIFY:
            return toAllActivites(
                activities.values.map((act: ActividadConId) =>
                    act.id === action.modificada.id ? action.modificada : act
                )
            );
        case ActionKind.REMOVE_USER:
            return toAllActivites(
                activities.values.map((activity: ActividadConId) =>
                    activity.participantes.includes(action.idUsuario)
                        ? {
                              ...activity,
                              participantes: activity.participantes.filter(
                                  (idParticipante) =>
                                      idParticipante !== action.idUsuario
                              ),
                          }
                        : activity
                )
            );

        default:
            throw Error('Unknown action: ' + (action as ActivitiesAction).type);
    }
};

function logRemoveActivity(idActivity: IdActividad) {
    actions.logMsg(
        `Se solicitó eliminar la actividad con id ${idActivity}`,
        'info'
    );
}
export type { ActivitiesAction };
export { ActionKind as ActivitiesActionKind };
export default activityReducer;
