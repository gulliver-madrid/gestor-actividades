import { SyntheticEvent, useState } from 'react';
import { Pagination } from 'antd';
import { Box, Center } from '@chakra-ui/react';

import { IdUsuario, UsuarioConId, UsuarioNumerado } from '../../../../model';
import { Range } from '../../../../helpers';
import colors from '../../../colors';
import Column from '../../../components/Column';
import DeleteUserModal from '../../../components/modals/DeleteUserModal';
import useModalControls from '../../../hooks/useModalControls';
import DetailsUsuario from './Details';

type EliminarUsuarioPorId = (id: IdUsuario) => void;

interface Props {
    usuariosNumerados: UsuarioNumerado[];
    eliminarUsuarioPorId: EliminarUsuarioPorId;
}

const pageSize = 8;

const UserList = ({
    usuariosNumerados: sortedUsers,
    eliminarUsuarioPorId,
}: Props) => {
    const [selected, setSelected] = useState<number | null>(null);
    const [range, setRange] = useState<Range>({
        minValue: 0,
        maxValue: pageSize,
    });
    const deleteModal = useModalControls();

    const handlePaginationChange = (value: number) => {
        const minValue = (value - 1) * pageSize;
        const maxValue = minValue + pageSize;
        const nuevoRange = { minValue, maxValue };
        setRange(nuevoRange);
    };
    const onClickDetail = (numUsuario: number) => {
        const onClick = (event: SyntheticEvent) => {
            // Selecciona el numUsuario indicado, salvo que ya estuviera seleccionado,
            // en cuyo caso lo deselecciona
            event.preventDefault();
            setSelected((prev) => (prev === numUsuario ? null : numUsuario));
        };
        return onClick;
    };
    const getSelectedUser = (): UsuarioConId | undefined =>
        sortedUsers.find((user) => user.numUsuario === selected)?.usuario;
    const nameOfUserToRemove = getSelectedUser()?.nombre;
    const eliminarUsuarioDesdeModal = () => {
        const idToRemove = getSelectedUser()?.id || null;
        if (idToRemove !== null) eliminarUsuarioPorId(idToRemove);
    };
    return (
        <>
            <Column h="100%">
                <Box
                    id="div-usuarios"
                    m="0"
                    p="20px"
                    pt="0"
                    flexGrow={1}
                    bg={colors.bgSoft}
                    overflowY="scroll"
                >
                    {nameOfUserToRemove ? (
                        <DeleteUserModal
                            controls={deleteModal}
                            deleteUser={eliminarUsuarioDesdeModal}
                            nameOfUserToRemove={nameOfUserToRemove}
                        />
                    ) : null}

                    <ul className="no-bullet">
                        {sortedUsers.length > 0 &&
                            sortedUsers
                                .slice(range.minValue, range.maxValue)
                                .map((usuarioNum: UsuarioNumerado) => {
                                    const user = usuarioNum.usuario;
                                    const isOpen =
                                        usuarioNum.numUsuario === selected;

                                    return (
                                        <li key={user.id}>
                                            <DetailsUsuario
                                                usuarioNum={usuarioNum}
                                                isOpen={isOpen}
                                                onClickDetail={onClickDetail}
                                                modalDeleteOnOpen={
                                                    deleteModal.open
                                                }
                                            />
                                        </li>
                                    );
                                })}
                    </ul>
                </Box>
                <Center flexShrink={0}>
                    <Pagination
                        defaultCurrent={1}
                        defaultPageSize={pageSize}
                        onChange={handlePaginationChange}
                        total={sortedUsers.length}
                    />{' '}
                </Center>
            </Column>
        </>
    );
};

export default UserList;
export type { EliminarUsuarioPorId };
