import { Result } from '.';

interface Imagen {
    id: IdImagen;
}

type IdImagen = string & { readonly __tag: unique symbol };
type ImageBuffer = string & { readonly __tag: unique symbol };

type UploadImageResult = Result<IdImagen>;

type LoadImageReturnType = ImageBuffer | null;

interface ImageWithBuffer {
    idImage: IdImagen;
    buffer: ImageBuffer;
}

export type {
    IdImagen,
    Imagen,
    UploadImageResult,
    ImageBuffer,
    ImageWithBuffer,
    LoadImageReturnType,
};
