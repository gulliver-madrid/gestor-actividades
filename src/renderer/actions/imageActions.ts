import { IdImagen, ImageWithBuffer } from '../../model';
import actions from './actions';

/**
 * Load an array of ImageWithBuffer objects from an IdImage array
 * @param images array of IdImagen
 * @returns array of ImageWithBuffer
 *
 * Uses actions.
 */
const buildImagesWithBuffers = async (
    images: IdImagen[]
): Promise<ImageWithBuffer[]> => {
    const imagesBuffersPromises = images.map(
        async (idImage): Promise<ImageWithBuffer> => {
            const buffer = await actions.loadImage(idImage);
            return { idImage, buffer };
        }
    );
    return Promise.all(imagesBuffersPromises);
};

export { buildImagesWithBuffers };
