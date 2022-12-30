import { isString, isStringNotEmpty } from './validations';

type IdUsuario = string & { readonly __tag: unique symbol };

interface UsuarioNumerado {
    numUsuario: number;
    usuario: UsuarioConId;
}

interface Usuario {
    nombre: string;
    apellidos: string | null;
    id?: IdUsuario;
}

interface UsuarioConId extends Usuario {
    id: IdUsuario;
}

function assertEsUsuarioConId(
    user: Usuario,
    message?: string
): asserts user is UsuarioConId {
    if (!isString(user.apellidos)) {
        throw Error(message || 'Usuario sin apellidos');
    }
    if (!isStringNotEmpty(user.nombre)) {
        throw Error(message || 'Usuario sin nombre');
    }
    if (!isStringNotEmpty(user.id)) {
        throw Error(message || 'Usuario sin id');
    }
}
const userToString = (user: Usuario) => `${user.nombre} ${user.apellidos}`;

function getUserByIdFromUsuarios(users: UsuarioConId[], userId: IdUsuario) {
    // Devuelve el usuario que tiene el id indicado
    const user = users.find((user: UsuarioConId) => user.id === userId);
    return user;
}
const getUserGetterById = (users: UsuarioConId[]) => {
    const getUserById = (userId: IdUsuario) =>
        getUserByIdFromUsuarios(users, userId);
    return getUserById;
};

const getUsuariosDisponibles = (
    users: UsuarioConId[],
    idsParticipantes: IdUsuario[]
) => users.filter((user: UsuarioConId) => !idsParticipantes.includes(user.id));

export {
    assertEsUsuarioConId,
    userToString,
    getUserByIdFromUsuarios,
    getUserGetterById,
    getUsuariosDisponibles,
};
export type { IdUsuario, Usuario, UsuarioConId, UsuarioNumerado };
