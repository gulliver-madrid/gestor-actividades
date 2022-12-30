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
import { ChangeEvent, useState } from 'react';
import useNotifications from '../../hooks/useNotifications';
import { ModalControls } from '../../hooks/useModalControls';
import { VoidResult } from '../../../model';
import TextInput from '../forms/TextInput';
import Notifications from '../Notifications';
import { handleEnterKeyPress } from './helpers';
import { Box } from '@chakra-ui/react';

interface Props {
    oldName: string;
    controls: ModalControls;
    handleRename: (newName: string) => VoidResult;
}

function RenameProjectModal({ controls, handleRename, oldName }: Props) {
    const [newName, setNewName] = useState(oldName);
    const notifications = useNotifications();
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setNewName(event.target.value);
    };
    const handleConfirm = () => {
        const result = handleRename(newName);
        if (!result.ok) {
            notifications.notifyResult(result, '', 4000);
        } else {
            controls.close();
        }
    };
    return (
        <>
            <Modal
                isOpen={controls.isOpen}
                onClose={controls.close}
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent color="white" bg="purple">
                    <ModalHeader>
                        <span className="no-select">Renombrar proyecto</span>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {' '}
                        <label htmlFor="new-project-name-input">
                            Nuevo nombre:
                        </label>
                        <Box pt="4px"></Box>
                        <TextInput
                            id="new-project-name-input"
                            boxProps={{ ml: '2rem', bg: 'orange' }}
                            name="new-project-name"
                            value={newName}
                            onChange={handleChange}
                            onKeyUp={handleEnterKeyPress(handleConfirm)}
                            extraClassName="full-width"
                            autoFocus
                        />
                        <Notifications notifications={notifications} />
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={controls.close}
                            className="increasing-size-button"
                        >
                            Cancelar
                        </Button>
                        <Button
                            disabled={
                                oldName.trim() === newName.trim() ||
                                !newName.trim()
                            }
                            colorScheme="green"
                            onClick={handleConfirm}
                            className="increasing-size-button"
                        >
                            Confirmar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
export default RenameProjectModal;
