import { useState } from 'react';

import { Actividad, ActividadConId } from '../../../../model';
import useNotifications from '../../../hooks/useNotifications';
import { BotonesInferiores, BotonHome } from '../../../components/buttons';
import Column from '../../../components/Column';
import FormularioActividad from '../../../components/forms/ActivityForm';
import { PATH_NAMES } from '../../../components/Nav';
import Notifications from '../../../components/Notifications';
import PageTitle from '../../../components/PageTitle';
import FormPage from '../../FormPage';
import Page from '../../Page';
import { obtenerEstadoInicialActividad, validateIdActividad } from './helpers';
import useIdActividadFromParams from './useIdActividadFromParams';
import DiscardConfirmButtons from './DiscardConfirmButtons';
import ConfirmedChangesButtons from './ConfirmedChangesButtons';
import useActivity from './useActivity';
import { ModificarActividadData } from './Data';

interface Props {
    data: ModificarActividadData;
    modifyActivity: (modificada: ActividadConId) => void;
}

const ModificarActividadPage = ({ data, modifyActivity }: Props) => {
    const { activities, users, projects } = data;
    const idActividad = useIdActividadFromParams();
    const initialState = obtenerEstadoInicialActividad(activities, idActividad);
    const { activity, setActivity, changed } = useActivity(initialState);
    const [cambiosConfirmados, setCambiosConfirmados] =
        useState<boolean>(false);
    const notifications = useNotifications();

    const modificarActividad = (modificada: ActividadConId) => {
        validateIdActividad(modificada, idActividad);
        modifyActivity(modificada);
        notifications.setSuccessMsg('Se modificó la actividad con éxito');
        setCambiosConfirmados(true);
    };

    const handleContinueModifying = () => {
        setCambiosConfirmados(false);
        notifications.setSuccessMsg(null);
    };

    const handleSendActivity = (actividadConId: Actividad) =>
        modificarActividad(actividadConId as ActividadConId);

    return (
        <Page breadcrumb={[PATH_NAMES.HOME, PATH_NAMES.MODIFY_ACTIVITY]}>
            <Column grow={1}>
                <PageTitle>Modificar actividad</PageTitle>
                <FormPage>
                    {!cambiosConfirmados && (
                        <FormularioActividad
                            data={{
                                activity,
                                users,
                                projects,
                                initialStateOfActivity: initialState,
                                existingTitles: activities.values
                                    .filter((act) => act.id !== idActividad)
                                    .map((act) => act.titulo),
                            }}
                            setActivity={setActivity}
                            sendActivity={handleSendActivity}
                            notifications={notifications}
                        />
                    )}
                    <Notifications notifications={notifications} />
                </FormPage>
                {cambiosConfirmados ? (
                    <ConfirmedChangesButtons
                        onContinueModifying={handleContinueModifying}
                    />
                ) : (
                    <BotonesInferiores>
                        {changed ? (
                            <DiscardConfirmButtons
                                activity={activity}
                                changed={changed}
                            />
                        ) : (
                            <BotonHome />
                        )}
                    </BotonesInferiores>
                )}
            </Column>
        </Page>
    );
};

export default ModificarActividadPage;
