import React, { SyntheticEvent, useEffect, useState } from 'react';

import { NotificationsSetterObject } from '../../../hooks/useNotifications';
import { ReadableMsgForUser, Usuario } from '../../../../model';
import TextInput from '../TextInput';
import { getValidatedUser } from './validate';
import { USER_NAME_SURNAME_VALIDATION_ERROR as USER_NAME_SURNAME_UNKNOWN_VALIDATION_ERROR } from './errorMessages';

type SendUsuarioIntroducido = (usuario: Usuario) => void;

interface FormularioProps {
    existingUsers: Usuario[];
    usuarioDefault: Usuario;
    sendUser: SendUsuarioIntroducido;
    notifications: NotificationsSetterObject;
    changed: boolean;
    setChanged: (hasChanged: boolean) => void;
}

const FormularioUsuario = ({
    existingUsers,
    usuarioDefault: initialState,
    sendUser,
    notifications,
    changed,
    setChanged,
}: FormularioProps) => {
    const [usuario, setUsuario] = useState<Usuario>(initialState);
    useEffect(() => setUsuario(initialState), [initialState]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { target } = event;
        const { name: fieldName, value: fieldValue } = target;
        notifications.clear();

        const nuevo = {
            ...usuario,
            [fieldName]: fieldValue,
        };
        setUsuario(nuevo);
        if (!changed) setChanged(true);
    };
    const setUserError = (msg: ReadableMsgForUser) => {
        notifications.setSuccessMsg(null);
        notifications.setAlertMsg(msg);
    };

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        const result = getValidatedUser(usuario, existingUsers);
        if (!result.ok) {
            setUserError(
                result.error?.readableMsg ||
                    USER_NAME_SURNAME_UNKNOWN_VALIDATION_ERROR
            );
            return;
        }
        sendUser(result.value);
    };
    return (
        <>
            <form id="user-form" onSubmit={handleSubmit}>
                <div className="padding-y-10px">
                    <label htmlFor="nombre">Nombre del usuario *</label>
                    <br />
                    <TextInput
                        name="nombre"
                        value={usuario.nombre}
                        onChange={handleChange}
                    />
                    <br />
                </div>
                <div className="padding-y-10px">
                    <label htmlFor="apellidos">Apellidos del usuario *</label>
                    <br />
                    <TextInput
                        name="apellidos"
                        value={usuario.apellidos || ''}
                        onChange={handleChange}
                    />
                    <br />
                </div>
            </form>
        </>
    );
};

export type { SendUsuarioIntroducido };
export default FormularioUsuario;
