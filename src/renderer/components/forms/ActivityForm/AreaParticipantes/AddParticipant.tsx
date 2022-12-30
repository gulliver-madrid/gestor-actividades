/* eslint-disable no-console */
import { Center } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';

import {
    getUserGetterById,
    getUsuariosDisponibles,
    IdUsuario,
    UsuarioConId,
    userToString,
} from '../../../../../model';
import { parseInteger, repr } from '../../../../../helpers';
import actions from '../../../../actions/actions';

const firstOptionDropdown = '--- Añadir participantes ---';

interface Props {
    users: UsuarioConId[];
    participantes: IdUsuario[];
    updateParticipantes: (users: IdUsuario[]) => void;
}

interface CustomTarget {
    name: string;
    value: string;
}

const AddUserToActivityForm = ({
    users,
    participantes,
    updateParticipantes,
}: Props) => {
    const getUserById = getUserGetterById(users);
    const usuariosDisponibles = getUsuariosDisponibles(users, participantes);
    const [usuarioId, setUsuarioId] = useState<IdUsuario | null>(null);

    useEffect(() => {
        setUsuarioId(null);
    }, [participantes]);

    const anadirParticipante = (userId: IdUsuario) => {
        const userToAdd = getUserById(userId);
        if (!userToAdd) {
            console.error(`No existe un usuario con el id ${userId}`);
            return;
        }
        logAnadiendoParticipante(userToAdd);
        updateParticipantes([...participantes, userToAdd.id]);
    };

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const { target } = event;
        debugHandleChange(target);
        const index = parseInteger(target.value) - 1;
        const nuevoValor = index === -1 ? null : usuariosDisponibles[index].id;
        if (nuevoValor) {
            anadirParticipante(nuevoValor);
        }
        setUsuarioId(nuevoValor);
    };

    const selectOptions = [
        firstOptionDropdown,
        ...usuariosDisponibles.map((user: UsuarioConId) => userToString(user)),
    ];
    const currentValue =
        usuarioId === null
            ? 0
            : usuariosDisponibles.findIndex(
                  (user: UsuarioConId) => user.id === usuarioId
              ) + 1;

    return (
        <Center>
            <select
                className="color-black"
                name="usuarioAAnadir"
                value={currentValue}
                onChange={handleChange}
            >
                {selectOptions.map((optionText: string, index: number) => (
                    <option key={optionText} value={index}>
                        {optionText}
                    </option>
                ))}
            </select>
        </Center>
    );
};
const logAnadiendoParticipante = (user: UsuarioConId) => {
    const debug = false;
    if (debug) {
        actions.logMsg(`Añadiendo participante ${userToString(user)}`, 'debug');
    }
};

const debugHandleChange = (target: EventTarget & CustomTarget) => {
    const debug = false;
    if (debug) {
        actions.logMsg('En handleChange:', 'debug');
        actions.logMsg(repr({ name: target.name }), 'debug');
        actions.logMsg(repr({ value: target.value }), 'debug');
    }
};

export default AddUserToActivityForm;
