import { Actividad, IdImagen, Updater } from '../../../model';

/// Crea un actualizador de estado que elimina una imagen de la actividad
const createUpdaterToRemoveImage = (toRemove: IdImagen): Updater<Actividad> => {
    return (prev: Actividad) => ({
        ...prev,
        imagenes: prev.imagenes.filter((idImagen) => idImagen !== toRemove),
    });
};

/// Crea un actualizador de estado que anade una imagen a la actividad
const createUpdaterToAddImage =
    (idImagen: IdImagen): Updater<Actividad> =>
    (prev: Actividad) => ({
        ...prev,
        imagenes: [...prev.imagenes, idImagen],
    });

export { createUpdaterToRemoveImage, createUpdaterToAddImage };
