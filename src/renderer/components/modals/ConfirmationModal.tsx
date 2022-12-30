import { Button } from '@chakra-ui/button';
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/modal';
import { ReactNode } from 'react';

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    onConfirm: () => void;
    bodyComponent: ReactNode;
    cancelText: string;
    confirmText: string;
    title: string;
}

function ConfirmationModal({
    isOpen,
    closeModal,
    onConfirm,
    bodyComponent,
    cancelText,
    confirmText,
    title,
}: Props) {
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent color="black">
                    <ModalHeader>
                        <span className="no-select">{title}</span>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{bodyComponent}</ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={closeModal}
                            className="increasing-size-button"
                        >
                            {cancelText}
                        </Button>
                        <Button
                            colorScheme="red"
                            onClick={onConfirm}
                            className="increasing-size-button"
                        >
                            {confirmText}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
export default ConfirmationModal;
