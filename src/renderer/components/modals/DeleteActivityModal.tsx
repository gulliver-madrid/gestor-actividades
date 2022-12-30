import { Text } from '@chakra-ui/react';

import { ModalControls } from '../../hooks/useModalControls';
import ConfirmationModal from './ConfirmationModal';

interface Props {
    controls: ModalControls;
    eliminarActividad: () => void;
    nombreActividadToRemove: string | null;
}

function DeleteActivityModal({
    controls,
    eliminarActividad,
    nombreActividadToRemove,
}: Props) {
    return (
        <ConfirmationModal
            isOpen={controls.isOpen && Boolean(nombreActividadToRemove)}
            closeModal={controls.close}
            onConfirm={() => {
                eliminarActividad();
                controls.close();
            }}
            bodyComponent={
                <Text>
                    {`¿Seguro que quieres eliminar la actividad ${nombreActividadToRemove}?`}
                </Text>
            }
            cancelText="Cancelar"
            confirmText="Eliminar la actividad"
            title="¿Eliminar actividad?"
        />
    );
}
export default DeleteActivityModal;
