import { IdImagen, ImageWithBuffer } from '../../../../../model';
import RemovableImageBox from './RemovableImageBox';

interface Props {
    imagesWithBuffers: ImageWithBuffer[];
    deleteImageById: (idToRemove: IdImagen) => void;
}

const RemovableImageBoxes = ({ imagesWithBuffers, deleteImageById }: Props) => (
    <div className="thumbnail-container">
        {imagesWithBuffers.map(
            (imageWithBuffer: ImageWithBuffer, index: number) => (
                <RemovableImageBox
                    key={index}
                    deleteImage={() => deleteImageById(imageWithBuffer.idImage)}
                    imageWithBuffer={imageWithBuffer}
                />
            )
        )}
    </div>
);

export default RemovableImageBoxes;
