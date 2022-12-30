import { Box, BoxProps, Text } from '@chakra-ui/react';
import { SetStateAction } from 'react';

import { Actividad, IdImagen } from '../../../../model';
import actions from '../../../actions/actions';
import {
    createUpdaterToAddImage,
    createUpdaterToRemoveImage,
} from '../../../transformers/images';
import ImageUploader from './ImageUploader';
import ImageViewer from './ImageViewer';
import { ImagesManagement } from './useImagesManagement';

interface ImagesBoxProps extends BoxProps {
    images: ImagesManagement;
    setActivity: (value: SetStateAction<Actividad>) => void;
    activity: Actividad;
    initialStateOfActivity: Actividad;
}

const ImagesBox = ({
    images,
    setActivity,
    activity,
    initialStateOfActivity,
    ...rest
}: ImagesBoxProps) => {
    const addImage = (idImagen: IdImagen): void => {
        images.registerImageAsTemp(idImagen);
        setActivity(createUpdaterToAddImage(idImagen));
    };

    /** Removes an image from the form
     *  If it was not previously included in the activity, delete it from the disk
     */
    const eliminarImagen = async (toRemove: IdImagen): Promise<void> => {
        const existedPreviously =
            initialStateOfActivity.imagenes.includes(toRemove);
        if (!existedPreviously) {
            await images.removeNotCommitedImage(toRemove);
        }
        setActivity(createUpdaterToRemoveImage(toRemove));
    };
    return (
        <Box {...rest}>
            <Text fontSize="24px">
                <strong>Imágenes</strong>{' '}
            </Text>
            <ImageViewer
                imagesStage={activity.imagenes}
                eliminarImagen={eliminarImagen}
            />
            <ImageUploader
                addImage={addImage}
                uploadImage={actions.uploadImage}
            />
        </Box>
    );
};

export default ImagesBox;
