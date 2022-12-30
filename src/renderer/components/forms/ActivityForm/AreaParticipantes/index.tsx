import { Box, Flex, Text } from '@chakra-ui/react';
import { SyntheticEvent, useState } from 'react';
import actions, { logErrUserIdNotFound } from '../../../../actions/actions';

import {
    UsuarioConId,
    IdUsuario,
    userToString,
    getUserGetterById,
} from '../../../../../model';
import AddParticipant from './AddParticipant';

interface Props {
    users: UsuarioConId[];
    participantes: IdUsuario[];
    updateParticipantes: (users: IdUsuario[]) => void;
}

const AreaParticipantes = ({
    participantes,
    users,
    updateParticipantes,
}: Props) => {
    const [hovered, setHovered] = useState<number | null>(null);
    const getUserById = getUserGetterById(users);
    const getParticipanteStr = (idUsuario: IdUsuario) => {
        const user = getUserById(idUsuario);
        if (!user) {
            logErrUserIdNotFound(idUsuario);
            return '<not found>';
        }
        return userToString(user);
    };

    const eliminarParticipante = (userIdToDelete: IdUsuario) => {
        const userToDelete = getUserById(userIdToDelete) || null;
        if (!userToDelete) {
            logErrUserIdNotFound(userIdToDelete);
            return;
        }
        logEliminandoParticipante(userToDelete);
        updateParticipantes(
            participantes.filter((userId) => userId !== userIdToDelete)
        );
    };
    const onClickEliminar = (userId: IdUsuario) => (event: SyntheticEvent) => {
        event.preventDefault();
        eliminarParticipante(userId);
    };
    return (
        <Box pt="20px">
            <Text fontSize="24px">
                <strong>Participantes:</strong>{' '}
            </Text>
            {participantes.length ? (
                <Box m="20px" mt="4px" ml="0" bg="#eee" color="black">
                    <Text bg="black" p="5px" color="white" textAlign="center">
                        Actuales
                    </Text>
                    <ul className="lista-participantes no-bullet">
                        {participantes.map((userId, index) => (
                            <li
                                key={userId}
                                onMouseEnter={() => setHovered(index)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <Flex
                                    p="5px"
                                    justify="space-between"
                                    _hover={{ bg: '#ddd' }}
                                >
                                    {getParticipanteStr(userId)}{' '}
                                    {hovered === index && (
                                        <button
                                            onClick={onClickEliminar(userId)}
                                            type="button"
                                        >
                                            ❌
                                        </button>
                                    )}{' '}
                                </Flex>
                            </li>
                        ))}
                    </ul>
                </Box>
            ) : (
                <Text pt="4px" pb="20px">
                    Esta actividad aún no tiene participantes
                </Text>
            )}

            {participantes.length === users.length ? (
                'No hay más usuarios disponibles'
            ) : (
                <AddParticipant
                    users={users}
                    participantes={participantes}
                    updateParticipantes={updateParticipantes}
                />
            )}
        </Box>
    );
};

const logEliminandoParticipante = (user: UsuarioConId) =>
    actions.logMsg(`Eliminando participante ${userToString(user)}`, 'info');

export default AreaParticipantes;
