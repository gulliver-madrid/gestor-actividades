import { Dispatch, SetStateAction, useState } from 'react';

import {
    Actividad,
    statusDefault,
    UsuarioConId,
    ActividadConId,
    Project,
} from '../../../../model';
import { copy } from '../../../../helpers';
import { FullNotificationsObject } from '../../../hooks/useNotifications';
import FormularioActividad from '../../../components/forms/ActivityForm';
import { BotonHome, BotonesInferiores } from '../../../components/buttons';
import Notifications from '../../../components/Notifications';
import FormPage from '../../FormPage';
import AddActivityButtons from './Buttons';
import { createNewIdActividad } from '../../../../model/idManagement';

const actividadVacia: Actividad = {
    titulo: '',
    descripcion: '',
    participantes: [],
    imagenes: [],
    status: statusDefault,
    fechaCreacion: new Date(),
};

interface Props {
    users: UsuarioConId[];
    projects: Project[];
    activityTitles: string[];
    notifications: FullNotificationsObject;
    setCreada: Dispatch<SetStateAction<boolean>>;
    addActivity: (activity: ActividadConId) => void;
}

const AddActivityContent = ({
    addActivity,
    users,
    projects,
    notifications,
    setCreada,
    activityTitles,
}: Props) => {
    const [actividadEnProceso, setActividadEnProceso] =
        useState<Actividad>(actividadVacia);
    const [activity, setActivity] = useState<Actividad>(actividadEnProceso);
    const changed =
        JSON.stringify(activity) !== JSON.stringify(actividadEnProceso);
    const anadirActividad = (act: Actividad) => {
        const nueva = { ...act, id: createNewIdActividad() };
        addActivity(nueva);
        notifications.setSuccessMsg('Se anotó la nueva actividad con éxito');
        setActividadEnProceso(copy(actividadVacia));
        setCreada(true);
    };
    return (
        // Formulario y botones de Volver/Descartar y Confirmar Cambios
        <>
            <FormPage>
                <FormularioActividad
                    data={{
                        activity,
                        users,
                        projects,
                        initialStateOfActivity: actividadVacia,
                        existingTitles: activityTitles,
                    }}
                    setActivity={setActivity}
                    sendActivity={anadirActividad}
                    notifications={notifications}
                />
                <Notifications notifications={notifications} />
            </FormPage>

            <BotonesInferiores>
                {changed ? (
                    <AddActivityButtons
                        actividadEnProceso={actividadEnProceso}
                        activity={activity}
                        changed={changed}
                    />
                ) : (
                    <BotonHome />
                )}
            </BotonesInferiores>
        </>
    );
};

export default AddActivityContent;
