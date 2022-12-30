import { useState, useEffect } from 'react';
import { checkIsArray } from '../../helpers';
import { UsuarioConId } from '../../model';
import actions from '../actions/actions';

const useUsers = () => {
    const [users, setUsers] = useState<UsuarioConId[]>([]);
    useEffect(() => {
        const loadUsers = async () => {
            const result = await actions.leerUsuarios();

            if (result.ok) {
                const usuariosLeidos = result.value;
                checkIsArray(usuariosLeidos);
                setUsers(usuariosLeidos);
            }
        };
        loadUsers();
    }, []);
    return { users, setUsers };
};
export default useUsers;
