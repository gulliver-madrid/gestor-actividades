import { asReadable } from '../../../../model';

const MISSING_USER_NAME = asReadable('Debe indicar un nombre para el usuario');
const MISSING_USER_SURNAME = asReadable(
    'Debe indicar los apellidos del usuario'
);
const USER_ALREADY_EXISTS = asReadable(
    'Ya existe un usuario con ese nombre y apellidos'
);
const USER_NAME_SURNAME_VALIDATION_ERROR = asReadable(
    'Error desconocido validando nombre o apellidos de usuario'
);
export {
    MISSING_USER_NAME,
    MISSING_USER_SURNAME,
    USER_ALREADY_EXISTS,
    USER_NAME_SURNAME_VALIDATION_ERROR,
};
