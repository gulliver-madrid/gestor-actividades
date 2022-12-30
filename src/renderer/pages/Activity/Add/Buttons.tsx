import { Text } from '@chakra-ui/react';

import { Actividad } from '../../../../model';
import { BotonHomeAskConfirm, NormalButton } from '../../../components/buttons';

interface Props {
    actividadEnProceso: Actividad;
    activity: Actividad;
    changed: boolean;
}

const AddActivityButtons = ({
    actividadEnProceso,
    activity,
    changed,
}: Props) => {
    return (
        <>
            <BotonHomeAskConfirm
                is_red
                title="¿Salir sin guardar?"
                text="Descartar"
                bodyComponent={
                    <Text>
                        <span className="no-select">
                            Atención: la{' '}
                            {actividadEnProceso.titulo ? (
                                <span>
                                    actividad <em>{activity.titulo}</em>
                                </span>
                            ) : (
                                <span>nueva actividad</span>
                            )}{' '}
                            {`no se ha guardado todavía. Pulsa 'Descartar cambios'
                            para descartarla.`}
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
                Guardar actividad
            </NormalButton>
        </>
    );
};

export default AddActivityButtons;
