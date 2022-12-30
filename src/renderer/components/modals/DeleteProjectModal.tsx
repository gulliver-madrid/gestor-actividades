import { Text } from '@chakra-ui/react';

import { VoidResult } from '../../../model';
import { ModalControls } from '../../hooks/useModalControls';
import ConfirmationModal from './ConfirmationModal';

interface Props {
    controls: ModalControls;
    handleRemove: () => VoidResult;
    projectName: string;
}

function DeleteProjectModal({ controls, handleRemove, projectName }: Props) {
    const handleConfirm = () => {
        handleRemove();
        controls.close();
    };
    return (
        <ConfirmationModal
            isOpen={controls.isOpen && !!projectName}
            closeModal={controls.close}
            onConfirm={handleConfirm}
            bodyComponent={
                <Text>
                    {`¿Seguro que quieres eliminar el proyecto ${projectName}?`}
                </Text>
            }
            cancelText="Cancelar"
            confirmText="Eliminar el proyecto"
            title="¿Eliminar proyecto?"
        />
    );
}
export default DeleteProjectModal;
