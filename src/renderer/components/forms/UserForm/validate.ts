import { createErr, createOk, Result, Usuario } from '../../../../model';
import {
    MISSING_USER_NAME,
    MISSING_USER_SURNAME,
    USER_ALREADY_EXISTS,
} from './errorMessages';
import { cleanString, nameAndSurnameAlreadyExist } from './utils';

const getValidatedUser = (
    usuario: Usuario,
    existingUsers: Usuario[]
): Result<Usuario> => {
    const nuevo = {
        nombre: cleanString(usuario.nombre),
        apellidos: cleanString(usuario.apellidos),
        id: usuario.id,
    };
    if (!nuevo.nombre) {
        return createErr({ readableMsg: MISSING_USER_NAME });
    }
    if (!nuevo.apellidos) {
        return createErr({ readableMsg: MISSING_USER_SURNAME });
    }
    if (nameAndSurnameAlreadyExist(existingUsers, nuevo)) {
        return createErr({ readableMsg: USER_ALREADY_EXISTS });
    }
    return createOk(nuevo);
};

export { getValidatedUser };
