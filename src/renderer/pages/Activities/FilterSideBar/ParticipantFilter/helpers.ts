import { parseInteger } from '../../../../../helpers';
import { UsuarioConId } from '../../../../../model';

const getUserFromSelectValue = (
    fieldValue: string,
    users: UsuarioConId[]
): UsuarioConId | null => {
    const selectIndex = parseInteger(fieldValue);
    const user = selectIndex === 0 ? null : users[selectIndex - 1];
    return user;
};

const getCurrentIndexUserFilterSelect = (
    users: UsuarioConId[],
    userFilter?: UsuarioConId
): number =>
    userFilter ? users.findIndex((user) => userFilter.id === user.id) + 1 : 0;

export { getUserFromSelectValue, getCurrentIndexUserFilterSelect };
