import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

import useModalControls from '../../hooks/useModalControls';
import ExitActivityModal from '../modals/ExitActivityModal';
import NormalButton from './NormalButton';

interface Props {
    text?: string;
    is_red?: boolean;
    title?: string;
    bodyComponent: ReactNode;
}

const BotonHomeAskConfirm = ({ text, is_red, title, bodyComponent }: Props) => {
    const discardModal = useModalControls();
    const colorClassName = `${is_red ? 'red' : ''}`;
    const navigate = useNavigate();
    const goHome = () => navigate('/');
    return (
        <>
            {' '}
            <ExitActivityModal
                modalIsOpen={discardModal.isOpen}
                closeModal={discardModal.close}
                exitWithoutSave={goHome}
                title={title}
                bodyComponent={bodyComponent}
            />
            <NormalButton
                className={colorClassName}
                onClick={discardModal.open}
            >
                {text || 'Volver al menú principal'}
            </NormalButton>
        </>
    );
};
export default BotonHomeAskConfirm;
