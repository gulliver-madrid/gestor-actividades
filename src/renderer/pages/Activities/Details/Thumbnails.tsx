import { Box } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { IdImagen } from '../../../../model';
import getImageBuffers from './getImageBuffers';

interface Props {
    idImages: IdImagen[];
    setImageOpened: Dispatch<SetStateAction<number | null>>;
}

const Thumbnails = ({ idImages, setImageOpened }: Props) => {
    const [imageBuffers, setImageBuffers] = useState<null | string[]>(null);
    useEffect(() => {
        // eslint-disable-next-line no-console
        // console.log('Cargando buffers en DetailsActividad');
        const loadBuffers = async () => {
            const buffers = await getImageBuffers(idImages);
            setImageBuffers(buffers || null);
        };
        loadBuffers();
    }, [idImages]);
    return (
        <div className="thumbnail-container">
            {imageBuffers
                ? imageBuffers.map((buffer, index) => {
                      const alt = `Thumbnail #${index}`;
                      return (
                          <Box key={alt}>
                              <button
                                  onClick={(ev) => {
                                      ev.stopPropagation();
                                      setImageOpened(index);
                                  }}
                              >
                                  <img
                                      className="thumbnail-view"
                                      src={buffer}
                                      alt={alt}
                                  />
                              </button>
                          </Box>
                      );
                  })
                : null}
        </div>
    );
};

export default Thumbnails;
