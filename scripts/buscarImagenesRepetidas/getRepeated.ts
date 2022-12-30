import assert from 'assert';

import { IdImagen } from '../../src/model';
import { loadImage } from '../../src/main/persistence/imagesManagement';

interface Repeated {
    idImagen: IdImagen;
    original: IdImagen;
}

const getFirstOccurrence = (
    idToBuffer: Map<IdImagen, string>,
    buffer: string
): IdImagen | undefined =>
    Array.from(idToBuffer.keys()).find((id) => idToBuffer.get(id) === buffer);

const getRepeated = async (idImagenes: IdImagen[]): Promise<Repeated[]> => {
    const repeatedImages = [];
    const idToBuffer = new Map<IdImagen, string>();
    for (const idImagen of idImagenes) {
        const buffer = await loadImage(idImagen);
        const buffers = Array.from(idToBuffer.values());
        if (!buffer) {
            continue;
        }
        if (buffers.includes(buffer)) {
            const original = getFirstOccurrence(idToBuffer, buffer);
            assert(original);
            const repeated = { idImagen, original };
            repeatedImages.push(repeated);
        } else {
            idToBuffer.set(idImagen, buffer);
        }
    }
    return repeatedImages;
};

export { getRepeated };
