import fs from 'fs';

import { checkIsArray } from '../../helpers';
import { logger } from '../../logging';
import { UsuarioConId, VoidResult } from '../../model';
import { diskWorks } from './diskOps';
import { convertirAJSON, datadir, dataPathUsuarios } from './shared';

interface UsersObject {
    users: UsuarioConId[];
}

interface UsersObjectToSave extends UsersObject {
    saveDate: Date;
}

const saveUsers = (users: UsuarioConId[]): Promise<VoidResult> => {
    return saveUsersObject({ users, saveDate: new Date() });
};

const saveUsersObject = async (
    usersObject: UsersObjectToSave
): Promise<VoidResult> => {
    await diskWorks.makeDirIfDoesntExist(datadir);
    const dataJson = convertirAJSON(usersObject);
    return diskWorks.writeInDisk(dataJson, dataPathUsuarios);
};

const readUsers = async (): Promise<UsuarioConId[]> => {
    const usersObject = readUsersObject();
    const { users } = await usersObject;
    checkIsArray(users);
    return users;
};

const readUsersObject = async (): Promise<UsersObject> => {
    if (!fs.existsSync(datadir) || !fs.existsSync(dataPathUsuarios)) {
        return { users: [] };
    }
    const data = await diskWorks.readFile(dataPathUsuarios);
    let users: UsuarioConId[] | undefined;
    if (data.ok) {
        try {
            users = JSON.parse(data.value).users;
        } catch (e) {
            logger.error('No se pudieron parsear los usuarios.');
        }
    }
    if (!data.ok || !users)
        throw new Error(
            `No valid data for users (looking at ${dataPathUsuarios})`
        );
    return { users };
};

export { saveUsers, readUsers };
