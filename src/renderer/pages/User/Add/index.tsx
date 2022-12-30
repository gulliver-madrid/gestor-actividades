import { useState } from 'react';

import { UsuarioConId } from '../../../../model';
import useNotifications from '../../../hooks/useNotifications';
import { BotonHome, BotonesInferiores } from '../../../components/buttons';
import { PATH_NAMES } from '../../../components/Nav';
import Notifications from '../../../components/Notifications';
import PageTitle from '../../../components/PageTitle';
import FormPage from '../../FormPage';
import Page from '../../Page';
import AddUserContent from './Content';

interface Props {
    users: UsuarioConId[];
    setUsers: (users: UsuarioConId[]) => void;
}

const AddUserPage = ({ users, setUsers }: Props) => {
    const notifications = useNotifications();

    const [creado, setCreado] = useState<boolean>(false);

    return (
        <Page breadcrumb={[PATH_NAMES.HOME, PATH_NAMES.ADD_USER]}>
            <FormPage>
                <PageTitle>Nuevo usuario</PageTitle>
                {creado ? (
                    <>
                        <Notifications notifications={notifications} />{' '}
                        <BotonesInferiores>
                            <BotonHome />
                        </BotonesInferiores>
                    </>
                ) : (
                    <AddUserContent
                        users={users}
                        setUsers={setUsers}
                        setCreado={setCreado}
                        notifications={notifications}
                    />
                )}
            </FormPage>
        </Page>
    );
};

export default AddUserPage;
