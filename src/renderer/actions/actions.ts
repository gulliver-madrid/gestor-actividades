import '../../main/globals.ts';

import { repr } from '../../helpers';
import {
    IdImagen,
    Result,
    UploadImageResult,
    UsuarioConId,
    ImageBuffer,
    IdUsuario,
    AllActivities,
    createErr,
    AllProjects,
    ReadableMsgForUser,
    VoidResult,
    asReadable,
} from '../../model';
import { Api } from '../../preload';

// Acciones disponibles desde el renderer

// eslint-disable-next-line no-console
const showErrorAPInotAvailable = (text: string) =>
    console.error(`${text}: API no disponible`);

const checkWindowApi = (msg: string): boolean => {
    // returns a boolean indicating if the window api is available
    if (!window.api) {
        showErrorAPInotAvailable(msg);
        // const isATest = process.env.testing === "1";
        // if (!isATest) showError(msg);
        return false;
    }
    return true;
};

const guardarActividades = async (
    activities: AllActivities
): Promise<VoidResult> => {
    if (!checkWindowApi('No se pudieron guardar las actividades')) {
        return createErr();
    }
    return window.api.guardarActividades(activities);
};
const guardarProyectos = async (projects: AllProjects): Promise<VoidResult> => {
    if (!checkWindowApi('No se pudieron guardar los proyectos')) {
        return createErr();
    }
    return window.api.guardarProyectos(projects);
};
const guardarUsuarios = async (users: UsuarioConId[]): Promise<VoidResult> => {
    if (!checkWindowApi('No se pudieron guardar los usuarios')) {
        return createErr();
    }
    return window.api.guardarUsuarios(users);
};
const loadImage = async (idImage: IdImagen): Promise<ImageBuffer> => {
    let msg: string;
    if (!checkWindowApi((msg = 'No se pudo cargar la imagen'))) {
        throw new Error(msg);
    }
    const buffer = await window.api.loadImage(idImage);
    if (!buffer) {
        throw new Error(repr({ idImage, buffer }));
    }
    return buffer;
};
const removeImageFromDisk = async (idImage: IdImagen): Promise<VoidResult> => {
    let msg: string;
    if (!checkWindowApi((msg = 'No se pudo eliminar la imagen'))) {
        throw new Error(msg);
    }
    return await window.api.removeImageFromDisk(idImage);
};

const removeImagesFromDisk = async (images: IdImagen[]): Promise<void> => {
    await Promise.all(
        images.map((id) => {
            removeImageFromDisk(id);
        })
    );
};

const getVersion = async (): Promise<string> => {
    return await window.api.getVersion();
};

const leerActividades = async (): Promise<Result<AllActivities>> => {
    if (!checkWindowApi('No se pudieron leer las actividades')) {
        return createErr();
    }
    const activities = await window.api.leerActividades();
    return activities;
};

const leerUsuarios = async (): Promise<Result<UsuarioConId[]>> => {
    if (!checkWindowApi('No se pudieron leer los usuarios')) {
        return createErr();
    }
    return window.api.leerUsuarios();
};

const leerProyectos = async (): Promise<Result<AllProjects>> => {
    if (!checkWindowApi('No se pudieron leer los proyectos')) {
        return createErr();
    }
    return window.api.leerProyectos();
};

const readCurrentZoom = async (): Promise<number> => {
    if (!checkWindowApi('No se pudo leer el zoom actual')) {
        return Promise.resolve(0);
    }
    return await window.api.readCurrentZoom();
};
const uploadImage = async (): Promise<UploadImageResult> => {
    let errMsg: ReadableMsgForUser;
    if (!checkWindowApi((errMsg = asReadable('No se pudo leer la imagen')))) {
        return createErr({ readableMsg: errMsg });
    }
    return window.api.uploadImage();
};

const logMsg = async (msg: string, level: string) =>
    window.api.logMsg(msg, level);

const logErrUserIdNotFound = (idUser: IdUsuario) =>
    logMsg(`Usuario con id ${idUser} no encontrado`, 'error');

interface Actions extends Api {
    removeImagesFromDisk: (images: IdImagen[]) => Promise<void>;
    loadImage: (idImage: IdImagen) => Promise<ImageBuffer>;
}

const actions: Actions = {
    guardarActividades,
    guardarUsuarios,
    loadImage,
    removeImageFromDisk,
    removeImagesFromDisk,
    uploadImage,
    leerActividades,
    leerUsuarios,
    leerProyectos,
    getVersion,
    logMsg,
    readCurrentZoom,
    guardarProyectos,
};

export { logErrUserIdNotFound };
export default actions;
