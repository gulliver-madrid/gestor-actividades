import { useState } from 'react';

import { ActividadConId, Project, UsuarioConId } from '../../../../model';
import useNotifications from '../../../hooks/useNotifications';
import { BotonHome, BotonesInferiores } from '../../../components/buttons';
import Column from '../../../components/Column';
import { PATH_NAMES } from '../../../components/Nav';
import Notifications from '../../../components/Notifications';
import PageTitle from '../../../components/PageTitle';
import Page from '../../Page';
import AddActivityContent from './Content';

interface Props {
    users: UsuarioConId[];
    projects: Project[];
    activityTitles: string[];
    addActivity: (activity: ActividadConId) => void;
}

const AddActivityPage = ({
    users,
    projects,
    activityTitles,
    addActivity,
}: Props) => {
    const [creada, setCreada] = useState<boolean>(false);

    const notifications = useNotifications();

    return (
        <Page breadcrumb={[PATH_NAMES.HOME, PATH_NAMES.ADD_ACTIVITY]}>
            <Column grow={1}>
                <PageTitle>Añadir actividad</PageTitle>
                {!creada ? (
                    <AddActivityContent
                        users={users}
                        projects={projects}
                        activityTitles={activityTitles}
                        notifications={notifications}
                        setCreada={setCreada}
                        addActivity={addActivity}
                    />
                ) : (
                    <>
                        <Notifications notifications={notifications} />
                        <BotonesInferiores>
                            <BotonHome />
                        </BotonesInferiores>
                    </>
                )}
            </Column>
        </Page>
    );
};

export default AddActivityPage;
