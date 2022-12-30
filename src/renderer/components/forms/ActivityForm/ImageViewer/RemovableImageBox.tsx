import { useState } from 'react';

import { ImageWithBuffer } from '../../../../../model';
import useModalControls from '../../../../hooks/useModalControls';
import DeleteImageModal from '../../../modals/DeleteImageModal';
import { BiTrash } from 'react-icons/bi';

interface Props {
    deleteImage: () => void;
    imageWithBuffer: ImageWithBuffer;
}

const RemovableImageBox = ({ imageWithBuffer, deleteImage }: Props) => {
    const [isHovered, setIsHovered] = useState(false);
    const modal = useModalControls();

    const conditionalPreDeletionStyle = isHovered
        ? { border: 'red 4px dotted' }
        : { border: 'rgba(0,0,0,0) 4px dotted' };

    return (
        <div
            key={imageWithBuffer.idImage}
            className="image-deletable-container thumbnail-sized"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <DeleteImageModal
                isOpen={modal.isOpen}
                closeModal={() => {
                    modal.close();
                    setIsHovered(false);
                }}
                deleteImage={deleteImage}
            />
            <span className="relative" style={conditionalPreDeletionStyle}>
                {isHovered && <CloseButton onClick={modal.open} />}
                <img
                    className="thumbnail"
                    src={imageWithBuffer.buffer}
                    alt=""
                />
            </span>
        </div>
    );
};

interface CloseButtonProps {
    onClick: () => void;
}

const CloseButton = ({ onClick }: CloseButtonProps) => (
    <span
        role="button"
        className="red absolute delete-image-button"
        onClick={onClick}
    >
        <BiTrash />
    </span>
);

export default RemovableImageBox;
