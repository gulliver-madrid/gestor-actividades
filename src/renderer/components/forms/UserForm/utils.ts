import { Usuario } from '../../../../model';

const cleanString = (s: string | null) => s?.trim() || '';
const concatWithSpace = (s1: string, s2: string) => s1 + ' ' + s2;

/* Chequea que no se repite la combinación nombre + apellido para ningún usuario */
const nameAndSurnameAlreadyExist = (
    users: Usuario[],
    newUser: Usuario
): boolean => {
    const nameAndSurname = concatWithSpace(
        cleanString(newUser.nombre).toLowerCase(),
        cleanString(newUser.apellidos).toLowerCase()
    );
    for (const existingUser of users) {
        if (
            concatWithSpace(
                cleanString(existingUser.nombre).toLowerCase(),
                cleanString(existingUser.apellidos).toLowerCase()
            ) === nameAndSurname
        ) {
            return true;
        }
    }
    return false;
};

export { cleanString, nameAndSurnameAlreadyExist };
