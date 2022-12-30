import { useEffect } from 'react';

import { IdImagen } from '../../../../../model';
import actions from '../../../../actions/actions';
import useRefList from '../../../../hooks/useRefList';

interface ImagesManagement {
    onFormSubmitted: (imagesRemovedByTheUser: IdImagen[]) => void;
    registerImageAsTemp: (idImagen: IdImagen) => void;
    removeNotCommitedImage: (toRemove: IdImagen) => Promise<void>;
}

/** Manage the logic of the images changes in the ActivityForm */
const useImagesManagement = (): ImagesManagement => {
    // Temp images are those added but with changes not saved
    // Usa una una referencia mutable de las imagenes anadidas temporalmente
    // para eliminarlas de disco al desmontar el componente si no se han
    // confirmado.

    const tempImages = useRefList<IdImagen>();
    useEffect(() => {
        return () => {
            removeTempImages();
        };
    }, []);

    /** Remove from disk temporary images (should be called when
     * ActivityForm is unmounted)
     */
    const removeTempImages = async () => {
        await actions.removeImagesFromDisk(tempImages.extractAll());
    };

    /** Clean images when form changes are submited
     * This involves two steps:
     * 1) Remove from disk saved images deleted by the user
     * 2) Clear tempImages register in order to new added images
     *    not to be deleted when form is unmounted
     */
    const onFormSubmitted = (imagesRemovedByTheUser: IdImagen[]) => {
        actions.removeImagesFromDisk(imagesRemovedByTheUser);
        tempImages.clear();
    };

    /** Register the given image as not commited */
    const registerImageAsTemp = (idImagen: IdImagen): void => {
        tempImages.add(idImagen);
    };

    /** Removes a not commited image on user request */
    const removeNotCommitedImage = async (
        toRemove: IdImagen
    ): Promise<void> => {
        await actions.removeImageFromDisk(toRemove);
        tempImages.remove(toRemove);
    };

    return { onFormSubmitted, registerImageAsTemp, removeNotCommitedImage };
};

export type { ImagesManagement };
export default useImagesManagement;
