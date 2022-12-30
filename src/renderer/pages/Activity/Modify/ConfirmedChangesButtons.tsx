import {
    BotonesInferiores,
    BotonHome,
    NormalButton,
} from '../../../components/buttons';

interface Props {
    onContinueModifying: () => void;
}

const ConfirmedChangesButtons = ({ onContinueModifying }: Props) => {
    return (
        <BotonesInferiores>
            <BotonHome />
            <NormalButton onClick={onContinueModifying}>
                Continuar modificando
            </NormalButton>
        </BotonesInferiores>
    );
};

export default ConfirmedChangesButtons;
