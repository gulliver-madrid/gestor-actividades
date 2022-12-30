import { Text } from '@chakra-ui/react';
import { Actividad } from '../../../../model';

import { BotonHomeAskConfirm, NormalButton } from '../../../components/buttons';

interface Props {
    activity: Actividad;
    changed: boolean;
}

const DiscardConfirmButtons = ({ activity, changed }: Props) => {
    return (
        <>
            <BotonHomeAskConfirm
                is_red
                text="Descartar"
                bodyComponent={
                    <Text>
                        <span className="no-select">
                            ¿Seguro que quieres descartar los cambios en la
                            actividad <em>{activity.titulo}</em>?
                        </span>
                    </Text>
                }
            />

            <NormalButton
                className="green"
                form="activity-form"
                type="submit"
                disabled={!changed}
            >
                Confirmar cambios
            </NormalButton>
        </>
    );
};

export default DiscardConfirmButtons;
