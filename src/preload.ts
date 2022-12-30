import { contextBridge, ipcRenderer } from 'electron';

import {
    AllActivities,
    IdImagen,
    UsuarioConId,
    Usuario,
    UploadImageResult,
    AllProjects,
    Result,
    VoidResult,
    createOk,
} from './model';
import { checkIsArray } from './helpers';
import { LoadImageReturnType } from './model/imagenes';

const api = {
    async guardarActividades(activities: AllActivities): Promise<VoidResult> {
        return ipcRenderer.invoke('save-activities', activities);
    },
    async guardarUsuarios(users: Usuario[]): Promise<VoidResult> {
        return ipcRenderer.invoke('save-users', users);
    },
    async guardarProyectos(projects: AllProjects): Promise<VoidResult> {
        return ipcRenderer.invoke('save-projects', projects);
    },
    async leerActividades(): Promise<Result<AllActivities>> {
        return ipcRenderer.invoke('read-activities');
    },
    async leerUsuarios(): Promise<Result<UsuarioConId[]>> {
        const users = await ipcRenderer.invoke('read-users');
        checkIsArray(users);
        return createOk(users);
    },
    async leerProyectos(): Promise<Result<AllProjects>> {
        const proyectos: AllProjects = await ipcRenderer.invoke(
            'read-projects'
        );
        checkIsArray(proyectos.values);
        return createOk(proyectos);
    },
    async readCurrentZoom(): Promise<number> {
        const currentZoom = await ipcRenderer.invoke('read-current-zoom');
        return currentZoom;
    },
    async uploadImage(): Promise<UploadImageResult> {
        return ipcRenderer.invoke('upload-image');
    },
    async loadImage(idImage: IdImagen): Promise<LoadImageReturnType> {
        return ipcRenderer.invoke('load-image', idImage);
    },
    async removeImageFromDisk(idImage: IdImagen): Promise<VoidResult> {
        return ipcRenderer.invoke('remove-image', idImage);
    },
    async getVersion(): Promise<string> {
        return ipcRenderer.invoke('get-version');
    },
    logMsg(msg: string, level: string): Promise<void> {
        return ipcRenderer.invoke('log-msg', msg, level);
    },
} as const;

type Api = typeof api;

contextBridge.exposeInMainWorld('api', api);

export type { Api };
