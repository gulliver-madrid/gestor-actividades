import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent } from 'react';

import { parseInteger, repr } from '../../helpers';
import {
    Actividad,
    IdUsuario,
    IdImagen,
    ProjectName,
    posiblesStatus,
    Project,
    ProjectId,
    getProjectById,
    VoidResult,
    createErr,
    createOk,
    ReadableMsgForUser,
    asReadable,
} from '../../model';

import { NotificationsSetterObject } from './useNotifications';
import { createMetaUpdater } from '../transformers';
import { FormularioActividadData } from '../components/forms/ActivityForm/Data';
import useImagesManagement from '../components/forms/ActivityForm/useImagesManagement';

const MISSING_TITLE = asReadable('Debe indicar un título para la actividad');
const TITLE_ALREADY_IN_USE = asReadable(
    'Ya existe una actividad con ese título'
);
const MISSING_PROJECT_NAME = asReadable('Debe seleccionar un proyecto');

const PROJECT_NOT_SELECTED = '--- Selecciona uno ---' as const;

const PROJECT_FIELD = 'project';
const STATUS_FIELD = 'status';
const DESCRIPTION_FIELD = 'description';
const TITLE_FIELD = 'title';

type ProjectsSelectText = ProjectName | typeof PROJECT_NOT_SELECTED;
const INDEX_PROJECT_NOT_SELECTED = 0;

const createUpdater = createMetaUpdater<Actividad>();

interface ActivityFormArgs {
    data: FormularioActividadData;
    setActivity: Dispatch<SetStateAction<Actividad>>;
    sendActivity: (activity: Actividad) => void;
    notifications: NotificationsSetterObject;
}

const useActivityForm = ({
    data,
    setActivity,
    sendActivity,
    notifications,
}: ActivityFormArgs) => {
    const {
        activity,
        users,
        projects,
        existingTitles,
        initialStateOfActivity,
    } = data;
    const images = useImagesManagement();

    const projectsTextsForSelect = getProjectsTextsForSelect(projects);

    const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        const { target } = event;
        const { name: fieldName, value: fieldValue } = target;
        notifications.clear();
        if (fieldName !== DESCRIPTION_FIELD) {
            throw new Error(`Unknown fieldName: ${fieldName}`);
        }
        setActivity((prev: Actividad) => {
            const nueva = {
                ...prev,
                [fieldName]: fieldValue,
            };
            return nueva;
        });
    };
    const handleChangeSelect = (
        event: ChangeEvent<HTMLSelectElement>
    ): void => {
        handleChange(event);
    };
    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
        handleChange(event);
    };
    const handleChange = (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        event.preventDefault();
        const { target } = event;
        const { name: fieldName, value: fieldValue } = target;
        notifications.clear();
        switch (fieldName) {
            case PROJECT_FIELD: {
                updateProjectName(fieldValue);
                return;
            }
            case STATUS_FIELD: {
                const status = posiblesStatus[parseInteger(fieldValue)];
                setActivity(createUpdater('status', status));
                return;
            }
            case TITLE_FIELD: {
                const title = fieldValue;
                setActivity(createUpdater('titulo', title));
                return;
            }

            default: {
                throw new Error(`Unknown fieldName: ${fieldName}`);
            }
        }
    };
    function updateProjectName(fieldValue: string) {
        const getProjectId = (fieldValue: string) => {
            let project: Project | undefined;
            const index = parseInteger(fieldValue);
            if (index !== INDEX_PROJECT_NOT_SELECTED) {
                project = projects[index - 1];
            }
            return project?.id;
        };
        setActivity(createUpdater('project', getProjectId(fieldValue)));
    }

    const updateParticipantes = (participantes: IdUsuario[]) =>
        setActivity(createUpdater('participantes', participantes));

    const setUserError = (msg: ReadableMsgForUser) => {
        notifications.setSuccessMsg(null);
        notifications.setAlertMsg(msg);
    };

    /** Handles the confirmation of the changes */
    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        const res = validateChanges(activity, existingTitles);
        if (!res.ok) {
            if (!res.error || !res.error.readableMsg) {
                throw createUnknownValidationError(activity);
            }
            setUserError(res.error.readableMsg);
            return;
        }
        const imagesRemovedByTheUser = getImagesRemovedByTheUser(
            initialStateOfActivity,
            activity
        );
        images.onFormSubmitted(imagesRemovedByTheUser);
        sendActivity(activity);
    };

    /** Get current index of projects select widget */
    const getCurrentValueSelectProject = (projectId?: ProjectId): number => {
        if (!projectId) {
            return INDEX_PROJECT_NOT_SELECTED;
        }
        const projectSelected = getProjectById(projects, projectId);
        return projectsTextsForSelect.indexOf(projectSelected.name);
    };

    const currentValueProjectsSelect = getCurrentValueSelectProject(
        activity.project
    );

    const changeHandler = {
        handleChangeInput,
        handleTextareaChange,
        updateParticipantes,
        handleChangeSelect,
    };

    return {
        activity,
        users,
        projectsTextsForSelect,
        currentValueProjectsSelect,
        images,
        initialStateOfActivity,
        changeHandler,
        handleSubmit,
    };
};

const validateChanges = (
    activity: Actividad,
    existingTitles: string[]
): VoidResult => {
    if (!activity.titulo) {
        return createErr({ readableMsg: MISSING_TITLE });
    }
    if (existingTitles.includes(activity.titulo)) {
        return createErr({ readableMsg: TITLE_ALREADY_IN_USE });
    }
    if (activity.project === undefined) {
        return createErr({ readableMsg: MISSING_PROJECT_NAME });
    }
    return createOk();
};

const getImagesRemovedByTheUser = (
    initialStateOfActivity: Actividad,
    activity: Actividad
): IdImagen[] => {
    return initialStateOfActivity.imagenes.filter(
        (idImage) => !activity.imagenes.includes(idImage)
    );
};

const createUnknownValidationError = (activity: Actividad): Error => {
    return new Error(
        `Error desconocido de validación: activity=${repr(activity)}`
    );
};

const getProjectsTextsForSelect = (
    projects: Project[]
): ProjectsSelectText[] => {
    return [PROJECT_NOT_SELECTED, ...projects.map((p) => p.name)];
};

export { PROJECT_FIELD, STATUS_FIELD, DESCRIPTION_FIELD, TITLE_FIELD };
export type { ActivityFormArgs };
export default useActivityForm;
