import assert from 'assert';
import { app, ipcMain } from 'electron';

import {
    UploadImageResult,
    UsuarioConId,
    IdImagen,
    AllActivities,
    createErr,
    createOk,
    AllProjects,
    Result,
    VoidResult,
} from '../model';
import {
    loadImage,
    uploadImageFile,
    removeImageFile,
} from './persistence/imagesManagement';
import persistence from './persistence';
import { logger } from '../logging';
import { allow } from '../helpers';
import { LoadImageReturnType } from '../model/imagenes';
import { getCurrentZoomPercent } from './zoom';

ipcMain.handle(
    'save-activities',
    async (_event, activities: AllActivities): Promise<VoidResult> => {
        return persistence.guardarActividades(activities);
    }
);

ipcMain.handle(
    'save-users',
    (_event, users: UsuarioConId[]): Promise<VoidResult> => {
        return persistence.saveUsers(users);
    }
);
ipcMain.handle(
    'save-projects',
    async (_event, projects: AllProjects): Promise<VoidResult> => {
        return persistence.guardarProyectos(projects);
    }
);

ipcMain.handle('read-activities', async (): Promise<Result<AllActivities>> => {
    return persistence.leerActividades();
});

ipcMain.handle('read-users', async (): Promise<UsuarioConId[]> => {
    const users = await persistence.readUsers();
    assert(
        users.every((usuario) => usuario.id),
        'Un usuario no tiene id'
    );
    return users;
});

ipcMain.handle('read-projects', async (): Promise<AllProjects> => {
    const proyectos = await persistence.readProjects();
    return proyectos;
});

ipcMain.handle('upload-image', async (): Promise<UploadImageResult> => {
    const idImagen = await uploadImageFile();
    if (idImagen === null) {
        return createErr();
    }
    return createOk(idImagen);
});

ipcMain.handle(
    'load-image',
    (_event, idImage: IdImagen): Promise<LoadImageReturnType> => {
        return loadImage(idImage);
    }
);
ipcMain.handle(
    'remove-image',
    (_event, idImage: IdImagen): Promise<VoidResult> => {
        return removeImageFile(idImage);
    }
);

ipcMain.handle('get-version', (): string => {
    return app.getVersion();
});

ipcMain.handle('log-msg', (_event, msg: string, level: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (logger as any)[level](msg);
});

ipcMain.handle('read-current-zoom', (): number => {
    return getCurrentZoomPercent();
});

const _debugReceived = (msg: string) =>
    console.log(`Recibido en main: mensaje '${msg}'`);

allow(_debugReceived);

export {};
