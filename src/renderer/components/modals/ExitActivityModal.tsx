import { ReactNode } from 'react';
import ConfirmationModal from './ConfirmationModal';

interface Props {
    modalIsOpen: boolean;
    // eslint-disable-next-line react/require-default-props
    title?: string;
    closeModal: () => void;
    exitWithoutSave: () => void;
    bodyComponent: ReactNode;
}

function ExitActivityModal({
    title,
    modalIsOpen,
    closeModal,
    exitWithoutSave,
    bodyComponent,
}: Props) {
    return (
        <ConfirmationModal
            isOpen={modalIsOpen}
            closeModal={closeModal}
            onConfirm={() => {
                exitWithoutSave();
                closeModal();
            }}
            title={title || 'Atención: hay cambios sin guardar'}
            bodyComponent={bodyComponent}
            cancelText="Cancelar"
            confirmText="Descartar cambios"
        />
    );
}
export default ExitActivityModal;
