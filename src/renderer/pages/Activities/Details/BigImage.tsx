import { Dispatch, SetStateAction } from 'react';
import { Box } from '@chakra-ui/react';

import { ImageBuffer } from '../../../../model';

interface Props {
    imageOpened: number;
    setImageOpened: Dispatch<SetStateAction<number | null>>;
    buffer: ImageBuffer | null;
}

const BigImage = ({ imageOpened, setImageOpened, buffer }: Props) => {
    // console.log(`Opening BigImage with id ${imageOpened}`);
    const alt = `Thumbnail #${imageOpened}`;

    return (
        <div>
            {buffer !== null && (
                <Box mt="20px">
                    <button
                        onClick={(ev) => {
                            ev.stopPropagation();
                            setImageOpened(null);
                        }}
                    >
                        <img src={buffer} alt={alt} />
                    </button>
                </Box>
            )}
        </div>
    );
};

export default BigImage;
