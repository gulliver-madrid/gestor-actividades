import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { ImageBuffer } from '../../../../model';
import BigImage from './BigImage';
import ActivityDetailsContent, {
    ActivityDetailsContentBasicProps,
} from './Content';
import getImageBuffers from './getImageBuffers';

interface Props extends ActivityDetailsContentBasicProps {
    imageOpened: number | null;
    setImageOpened: Dispatch<SetStateAction<number | null>>;
}

const ActivityDetailsConditionalContent = ({
    activityData,
    modalDeleteOnOpen,
    imageOpened,
    setImageOpened,
}: Props) => {
    const [buffer, setBuffer] = useState<ImageBuffer | null>(null);
    const { activity } = activityData;

    useEffect(() => {
        const loadBuffer = async (image: number) => {
            const buffers = await getImageBuffers(activity.imagenes);
            setBuffer(buffers[image]);
        };
        if (imageOpened !== null) {
            loadBuffer(imageOpened);
        }
    }, [imageOpened]);

    return imageOpened === null ? (
        <ActivityDetailsContent
            activityData={activityData}
            modalDeleteOnOpen={modalDeleteOnOpen}
            setImageOpened={setImageOpened}
        />
    ) : (
        <BigImage
            imageOpened={imageOpened}
            setImageOpened={setImageOpened}
            buffer={buffer}
        />
    );
};

export default ActivityDetailsConditionalContent;
