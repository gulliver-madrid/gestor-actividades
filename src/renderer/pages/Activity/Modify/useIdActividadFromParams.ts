import { useParams } from 'react-router-dom';

import { IdActividad } from '../../../../model';

const MISSING_PARAM_MSG = 'Falta el parámetro idActividad';

const useIdActividadFromParams = () => {
    const params = useParams();
    if (!params.idActividad) {
        throw new Error(MISSING_PARAM_MSG);
    }
    const idActividad = params.idActividad as IdActividad;
    return idActividad;
};

export default useIdActividadFromParams;
