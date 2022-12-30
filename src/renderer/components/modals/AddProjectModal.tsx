import { ChangeEvent, useState } from 'react';
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
import { Box } from '@chakra-ui/react';

import { VoidResult } from '../../../model';
import useNotifications from '../../hooks/useNotifications';
import { ModalControls } from '../../hooks/useModalControls';
import TextInput from '../forms/TextInput';
import Notifications from '../Notifications';
import { handleEnterKeyPress } from './helpers';

interface Props {
    controls: ModalControls;
    handleCreate: (name: string) => VoidResult;
}

function AddProjectModal({ controls, handleCreate }: Props) {
    const [projectName, setProjectName] = useState('');
    const notifications = useNotifications();
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setProjectName(event.target.value);
    };
    const handleConfirm = () => {
        const result = handleCreate(projectName);
        if (!result.ok) {
            notifications.notifyResult(result, '', 4000);
        } else {
            controls.close();
        }
    };
    const inputId = 'new-project-input';
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
                        <span className="no-select">Añadir proyecto</span>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {' '}
                        <label htmlFor={inputId}>Nombre:</label>
                        <Box pt="4px"></Box>
                        <TextInput
                            id={inputId}
                            boxProps={{ ml: '2rem', bg: 'orange' }}
                            name={inputId}
                            value={projectName}
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
                            disabled={!projectName.trim()}
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
export default AddProjectModal;
