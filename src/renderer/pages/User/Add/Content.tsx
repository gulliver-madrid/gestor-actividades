import { Dispatch, SetStateAction, useState } from 'react';
import { Box } from '@chakra-ui/react';

import { copy } from '../../../../helpers';
import { Usuario, UsuarioConId } from '../../../../model';
import actions from '../../../actions/actions';
import FormularioUsuario from '../../../components/forms/UserForm';
import {
    BotonHome,
    NormalButton,
    BotonesInferiores,
} from '../../../components/buttons';
import Notifications from '../../../components/Notifications';
import { FullNotificationsObject } from '../../../hooks/useNotifications';
import { createNewIdUsuario } from '../../../../model/idManagement';

const usuarioVacio = {
    nombre: '',
    apellidos: '',
};

interface Props {
    users: UsuarioConId[];
    setUsers: (users: UsuarioConId[]) => void;
    setCreado: Dispatch<SetStateAction<boolean>>;
    notifications: FullNotificationsObject;
}

const AddUserContent = ({
    users,
    setUsers,
    setCreado,
    notifications,
}: Props) => {
    const [usuarioEnProceso, setUsuarioEnProceso] =
        useState<Usuario>(usuarioVacio);
    const [changed, setChanged] = useState<boolean>(false);
    const anadirUsuario = (usuario: Usuario) => {
        const nuevo = { ...usuario, id: createNewIdUsuario() };
        const usuariosActualizados = [...users, nuevo];
        setUsers(usuariosActualizados);
        actions.guardarUsuarios(usuariosActualizados);
        notifications.setSuccessMsg('Se anotó el nuevo usuario con éxito');
        setUsuarioEnProceso(copy(usuarioVacio));
        setCreado(true);
    };
    return (
        <Box>
            <FormularioUsuario
                usuarioDefault={usuarioEnProceso}
                sendUser={anadirUsuario}
                notifications={notifications}
                changed={changed}
                setChanged={setChanged}
                existingUsers={users}
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
                        Guardar usuario
                    </NormalButton>
                </BotonesInferiores>
            ) : (
                <BotonesInferiores>
                    <BotonHome />
                </BotonesInferiores>
            )}
        </Box>
    );
};

export default AddUserContent;
