import { MouseEventHandler } from 'react';
import { Button } from '@chakra-ui/react';

import { IdImagen, UploadImageResult } from '../../../../model';
import useNotifications from '../../../hooks/useNotifications';
import { logMsg } from '../../../actions/sharedActions';
import Notifications from '../../Notifications';

interface Props {
    addImage: (idImagen: IdImagen) => void;
    uploadImage: () => Promise<UploadImageResult>;
}

function ImageUploader({ addImage, uploadImage }: Props) {
    const notifications = useNotifications();

    const agregarImagen: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        const uploadImageAsync = async () => {
            const result = await uploadImage();
            if (!result.ok) return;
            const { value: idImagen } = result;
            if (!idImagen) {
                logMsg('Falta el idImagen', 'error');
                return;
            }
            addImage(idImagen);
            notifications.setSuccessMsg('Imagen agregada correctamente', 4000);
        };
        uploadImageAsync();
    };
    return (
        <div>
            <div>
                <Button
                    className="increasing-size-button"
                    colorScheme="blackAlpha"
                    my="12px"
                    onClick={agregarImagen}
                >
                    Agregar imagen
                </Button>
            </div>

            <Notifications notifications={notifications} />
        </div>
    );
}
export default ImageUploader;
