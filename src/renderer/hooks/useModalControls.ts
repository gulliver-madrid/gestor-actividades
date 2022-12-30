import { useDisclosure } from '@chakra-ui/react';

interface ModalControls {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useModalControls = (): ModalControls => {
    const { isOpen, onOpen: open, onClose: close } = useDisclosure();
    return { isOpen, open, close };
};

export type { ModalControls };
export default useModalControls;
