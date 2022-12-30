import { Box } from '@chakra-ui/react';

import { UsuarioConId } from '../../../model';
import Column from '../../components/Column';
import { PATH_NAMES } from '../../components/Nav';
import PageTitle from '../../components/PageTitle';
import Page from '../Page';
import UserList, { EliminarUsuarioPorId } from './List';

interface Props {
    users: UsuarioConId[];
    eliminarUsuarioPorId: EliminarUsuarioPorId;
}

const UsersPage = ({ users, eliminarUsuarioPorId }: Props) => {
    const usuariosNumerados = [...users]
        .reverse()
        .map((usuario: UsuarioConId, index: number) => ({
            numUsuario: index + 1,
            usuario,
        }));
    return (
        <Page breadcrumb={[PATH_NAMES.HOME, PATH_NAMES.USERS]}>
            <Column h="100%">
                <PageTitle>Usuarios</PageTitle>
                <Box p="20px" flexGrow={1}>
                    {usuariosNumerados.length ? (
                        <UserList
                            usuariosNumerados={usuariosNumerados}
                            eliminarUsuarioPorId={eliminarUsuarioPorId}
                        />
                    ) : (
                        <p>Aún no hay ningun usuario registrado.</p>
                    )}
                </Box>
            </Column>
        </Page>
    );
};

export default UsersPage;
