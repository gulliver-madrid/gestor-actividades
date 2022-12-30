import ConfirmationModal from './ConfirmationModal';

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    deleteImage: () => void;
}

function DeleteImageModal({ isOpen, closeModal, deleteImage }: Props) {
    return (
        <ConfirmationModal
            isOpen={isOpen}
            closeModal={closeModal}
            onConfirm={() => {
                deleteImage();
                closeModal();
            }}
            bodyComponent={<p>¿Seguro que quieres eliminar la imagen?</p>}
            cancelText="Cancelar"
            confirmText="Eliminar"
            title="Eliminar imagen"
        />
    );
}
export default DeleteImageModal;
