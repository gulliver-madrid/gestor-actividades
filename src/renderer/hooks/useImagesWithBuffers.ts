import { useEffect, useState } from 'react';

import { IdImagen, ImageWithBuffer } from '../../model';
import { buildImagesWithBuffers } from '../actions/imageActions';

const useImagesWithBuffers = (images: IdImagen[]) => {
    // Carga los buffers de las imagenes
    const [imagesWithBuffers, setImagesWithBuffers] = useState<
        ImageWithBuffer[]
    >([]);

    useEffect(() => {
        const updateBuffers = async () => {
            // console.log('Updating buffers');
            const newImageWithBuffers = await buildImagesWithBuffers(images);
            setImagesWithBuffers(newImageWithBuffers);
        };
        updateBuffers();
    }, [images]);
    return imagesWithBuffers;
};

export default useImagesWithBuffers;
