import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { dialog } from 'electron';

import { logger } from '../../logging';
import {
    createErr,
    createOk,
    IdImagen,
    ImageBuffer,
    VoidResult,
} from '../../model';
import { createNewIdImagen } from '../../model/idManagement';
import { datadir } from './shared';

const SAVE_IMAGES_WITH_EXTENSION = true;

const getImagesDir = () => {
    const imagesDir = path.join(datadir, 'images');
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir);
    }
    return imagesDir;
};

async function getUserSelectedPathToOpen(): Promise<string | null> {
    // opens a window to choose file
    const result = await dialog.showOpenDialog({ properties: ['openFile'] });

    // checks if window was closed without selection
    if (result.canceled) {
        // eslint-disable-next-line no-console
        logger.info('No file selected. The user closed the dialog.');
        return null;
    }

    // get first element in array which is path to file selected
    const originalFilePath = result.filePaths[0];
    return originalFilePath;
}

async function removeImageFile(idImagen: IdImagen): Promise<VoidResult> {
    const filename = idImagen;
    const imagesDir = getImagesDir();
    const imagePath = path.join(imagesDir, filename);
    try {
        await fsPromises.unlink(imagePath);
    } catch (err) {
        return createErr({ msg: `Error borrando archivos de imagen: ${err}` });
    }
    return createOk();
}

async function uploadImageFile(): Promise<IdImagen | null> {
    const userProvidedPath = await getUserSelectedPathToOpen();
    if (!userProvidedPath) {
        return null;
    }
    const originalFilePath = userProvidedPath;

    const filename: string = path.basename(originalFilePath);
    const imagesDir = getImagesDir();
    let idImagen = createNewIdImagen();
    if (SAVE_IMAGES_WITH_EXTENSION) {
        const fileInfo = path.parse(filename);
        idImagen = (idImagen + fileInfo.ext) as IdImagen;
    }
    const imgFolderPath = path.join(imagesDir, idImagen);

    // copy file from original location to app data folder
    // eslint-disable-next-line no-useless-catch
    try {
        await fsPromises.copyFile(originalFilePath, imgFolderPath);
    } catch (err: unknown) {
        throw err;
    }
    // eslint-disable-next-line no-console
    console.log(`Image ${filename} uploaded. Identified as ${idImagen}`);
    return idImagen || null;
}

const loadImage = async (idImage: IdImagen): Promise<ImageBuffer | null> => {
    // Returns null if can't load
    const filename = idImage;
    const imagesDir = getImagesDir();
    const imagePath = path.join(imagesDir, filename);
    return loadImageFromPath(imagePath);
};

const loadImageFromPath = async (path: string): Promise<ImageBuffer | null> => {
    let fileContent: string;
    try {
        fileContent = await fsPromises.readFile(path, 'base64');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        logger.error(
            `No se pudo cargar la imagen en ${path}. Error code: ${err.code}`
        );
        if (['ENOENT', 'EBUSY'].includes(err.code)) {
            return null;
        } else {
            throw err;
        }
    }
    return `data:image/jpg;base64,${fileContent}` as ImageBuffer;
};

export { uploadImageFile, loadImage, removeImageFile };
