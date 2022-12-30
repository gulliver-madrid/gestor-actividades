import fs from 'fs';

import { logger } from '../../logging';
import {
    ActividadConId,
    ActividadFromJson,
    AllActivities,
    createErr,
    createOk,
    Result,
    toAllActivites,
    VoidResult,
} from '../../model';
import { convertToActivity } from '../convertFromJson';
import { diskWorks } from './diskOps';
import { convertirAJSON, datadir, dataPathActividades } from './shared';

interface ActivitiesObject {
    activities: ActividadFromJson[];
}
interface ActivitiesObjectToSave extends ActivitiesObject {
    saveDate: Date;
}

const readActivitiesObjectAsync = async (): Promise<
    Result<ActivitiesObject>
> => {
    if (!fs.existsSync(datadir) || !fs.existsSync(dataPathActividades)) {
        return createOk({ activities: [] });
    }

    const dataResult = await diskWorks.readFile(dataPathActividades);
    if (!dataResult.ok) {
        return dataResult;
    }
    const data = dataResult.value;

    let activities: ActividadFromJson[] | undefined;
    if (data) {
        try {
            activities = JSON.parse(data).activities;
        } catch (e) {
            logger.error('No se pudieron parsear las actividades.');
        }
    }
    if (!data || !activities)
        return createErr({
            msg: `No data for activities (looking at ${dataPathActividades})`,
        });
    return createOk({ activities });
};

const leerActividadesRaw = async (): Promise<Result<ActividadFromJson[]>> => {
    const res = await readActivitiesObjectAsync();
    if (!res.ok) {
        return res;
    }
    const { activities } = res.value;
    if (!activities.length) {
        logger.info('No se encontraron actividades guardadas.');
    }
    return createOk(activities);
};

const leerActividades = async (): Promise<Result<AllActivities>> => {
    const res = await leerActividadesRaw();
    if (!res.ok) {
        return res;
    }
    const activities: ActividadFromJson[] = res.value;
    const corregidas = activities.map(convertToActivity);
    return createOk(toAllActivites(corregidas));
};

const saveActivitiesObjectAsync = async (
    activitiesObject: ActivitiesObjectToSave
): Promise<VoidResult> => {
    await diskWorks.makeDirIfDoesntExist(datadir);
    const dataJson = convertirAJSON(activitiesObject);
    return diskWorks.writeInDisk(dataJson, dataPathActividades);
};

const removeProjectIfUndefined = (
    activities: ActividadConId[]
): ActividadConId[] => {
    return activities.map((act) => {
        if (act.project === undefined) {
            const newAct = { ...act };
            delete newAct.project;
            return newAct;
        }
        return act;
    });
};

const guardarActividades = async (
    activities: AllActivities
): Promise<VoidResult> => {
    const activitiesValues = removeProjectIfUndefined(activities.values);
    return saveActivitiesObjectAsync({
        activities: activitiesValues as unknown as ActividadFromJson[],
        saveDate: new Date(),
    });
};

export {
    leerActividades,
    guardarActividades,
    leerActividadesRaw,
    saveActivitiesObjectAsync,
};
export type { ActivitiesObject };
