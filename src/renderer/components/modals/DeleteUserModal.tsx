import { ModalControls } from '../../hooks/useModalControls';
import ConfirmationModal from './ConfirmationModal';

interface Props {
    controls: ModalControls;
    deleteUser: () => void;
    nameOfUserToRemove: string | null;
}

function DeleteUserModal({ controls, deleteUser, nameOfUserToRemove }: Props) {
    return (
        <ConfirmationModal
            isOpen={controls.isOpen && !!nameOfUserToRemove}
            closeModal={controls.close}
            onConfirm={() => {
                deleteUser();
                controls.close();
            }}
            bodyComponent={
                <p>
                    {`¿Seguro que quieres eliminar el usuario ${nameOfUserToRemove}? Esto eliminará también sus referencias en actividades en las que haya participado.`}
                </p>
            }
            cancelText="Cancelar"
            confirmText="Eliminar el usuario"
            title="¿Eliminar usuario?"
        />
    );
}
export default DeleteUserModal;
