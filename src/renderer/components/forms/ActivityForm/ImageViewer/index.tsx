import { Text } from '@chakra-ui/react';

import { IdImagen } from '../../../../../model';
import useImagesWithBuffers from '../../../../hooks/useImagesWithBuffers';
import RemovableImageBoxes from './RemovableImageBoxes';

interface Props {
    imagesStage: IdImagen[];
    eliminarImagen: (imageToDelete: IdImagen) => void;
}

const ImageViewer = ({ imagesStage, eliminarImagen }: Props) => {
    // Muestra las imagenes del stage
    const imagesWithBuffers = useImagesWithBuffers(imagesStage);
    const numberOfImages = imagesWithBuffers.length;
    const numberOfImagesText = createNumberOfImagesText(numberOfImages);
    return (
        <div>
            {numberOfImages > 0 && (
                <RemovableImageBoxes
                    imagesWithBuffers={imagesWithBuffers}
                    deleteImageById={eliminarImagen}
                />
            )}
            <Text>{numberOfImagesText}</Text>
        </div>
    );
};

const createNumberOfImagesText = (numImagenes: number): string => {
    // Devuelve una string indicando el numero de imagenes subidas
    return numImagenes
        ? `Hay ${numImagenes} ${numImagenes === 1 ? 'imagen' : 'imágenes'}`
        : 'No se ha subido ninguna imagen todavía';
};

export default ImageViewer;
