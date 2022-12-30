import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { findById } from '../../../helpers';
import {
    assertEsUsuarioConId,
    Usuario,
    UsuarioConId,
} from '../../../model/index';
import useNotifications from '../../hooks/useNotifications';
import actions from '../../actions/actions';
import {
    BotonesInferiores,
    BotonHome,
    NormalButton,
} from '../../components/buttons';
import FormularioUsuario from '../../components/forms/UserForm';
import { PATH_NAMES } from '../../components/Nav';
import Notifications from '../../components/Notifications';
import PageTitle from '../../components/PageTitle';
import FormPage from '../FormPage';
import Page from '../Page';

interface Props {
    users: UsuarioConId[];
    setUsers: (users: UsuarioConId[]) => void;
}

const ModificarUsuarioPage = ({ users, setUsers }: Props) => {
    const [cambiosGuardados, setCambiosGuardados] = useState<boolean>(false);
    const [changed, setChanged] = useState<boolean>(false);
    // console.log('Renderizando ModificarUsuarioPage');
    const notifications = useNotifications();
    const params = useParams();
    if (!params.idUsuario) return null;
    const { idUsuario } = params;
    const usuarioEnProceso = findById(users, idUsuario);
    const modificarUsuario = (modificado: Usuario) => {
        assertEsUsuarioConId(modificado);
        if (modificado.id !== idUsuario) {
            throw new Error(
                `Id de usuario erróneo: ${modificado.id} !== ${idUsuario}`
            );
        }

        const actualizados = users.map((user: UsuarioConId) =>
            user.id === modificado.id ? modificado : user
        );

        setUsers(actualizados);
        actions.guardarUsuarios(actualizados);
        notifications.setSuccessMsg('Se modificó el usuario con éxito');
        setCambiosGuardados(true);
    };

    const renderContentWithForm = () => (
        <>
            <FormularioUsuario
                usuarioDefault={usuarioEnProceso}
                sendUser={modificarUsuario}
                notifications={notifications}
                changed={changed}
                setChanged={setChanged}
                existingUsers={users.filter(
                    (user) => user.id !== usuarioEnProceso.id
                )}
            />
            <Notifications notifications={notifications} />
            {changed ? (
                <BotonesInferiores>
                    <BotonHome text="Descartar" is_red />
                    <NormalButton
                        className="green"
                        form="user-form"
                        type="submit"
                    >
                        Guardar cambios
                    </NormalButton>
                </BotonesInferiores>
            ) : (
                <BotonesInferiores>
                    <BotonHome />
                </BotonesInferiores>
            )}
        </>
    );
    return (
        <Page breadcrumb={[PATH_NAMES.HOME, PATH_NAMES.MODIFY_USER]}>
            <FormPage>
                <PageTitle>Modificar usuario</PageTitle>
                {cambiosGuardados ? (
                    <>
                        <Notifications notifications={notifications} />
                        <BotonesInferiores>
                            <BotonHome />
                        </BotonesInferiores>
                    </>
                ) : (
                    renderContentWithForm()
                )}
            </FormPage>
        </Page>
    );
};

export default ModificarUsuarioPage;
