import { truthy } from '../../../../helpers';
import { IdImagen, ImageBuffer } from '../../../../model';
import actions from '../../../actions/actions';

interface BufferPromise {
    idImage: IdImagen;
    promise: Promise<ImageBuffer>;
}

const getImageBuffers = async (
    idImages: IdImagen[]
): Promise<ImageBuffer[]> => {
    const bufferPromises: BufferPromise[] = idImages.map((idImage) => ({
        idImage,
        promise: actions.loadImage(idImage),
    }));

    const possibleBuffers = await Promise.all(
        bufferPromises.map(async (bufferPromise) => ({
            idImage: bufferPromise.idImage,
            buffer: await bufferPromise.promise,
        }))
    );
    const notFoundImages = possibleBuffers
        .filter((possibleBuffer) => !possibleBuffer.buffer)
        .map((possibleBuffer) => possibleBuffer.idImage);
    notFoundImages.forEach((idImage) => {
        actions.logMsg(`Imagen no encontrada: ${idImage}`, 'error');
    });
    return possibleBuffers
        .map((possibleBuffer) => possibleBuffer.buffer)
        .filter(truthy);
};

export default getImageBuffers;
