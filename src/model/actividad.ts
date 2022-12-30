import { Status } from './status';
import { IdImagen } from './imagenes';
import { ProjectId, ProjectName } from './projects';
import { IdUsuario, UsuarioConId } from './usuario';

type IdActividad = string & { readonly __tag: unique symbol };
type NumberOfActivity = number & { readonly __tag: unique symbol };

interface ActividadFromJson {
    titulo: string;
    descripcion: string;
    project?: number;
    status?: string;
    participantes: string[];
    imagenes: string[];
    id: string;
    fechaCreacion: string;
}

interface Actividad {
    titulo: string;
    descripcion: string;
    project?: ProjectId;
    status: Status;
    participantes: IdUsuario[];
    imagenes: IdImagen[];
    id?: string;
    fechaCreacion: Date;
}

interface ActividadConId extends Actividad {
    id: IdActividad;
}

interface ActividadNumerada {
    numberOfActivity: NumberOfActivity;
    activity: ActividadConId;
}

interface ActivityDataForDetail extends ActividadNumerada {
    usersParticipants: UsuarioConId[];
    projectName: ProjectName | null;
    id: IdActividad;
}

const asIdActividad = (s: string): IdActividad => s as IdActividad;

type FilteredActivities = ActivityDataForDetail[] & {
    readonly __tag: unique symbol;
};
type AllActivities = {
    values: ActividadConId[];
    readonly __tag: unique symbol;
};

export type {
    Actividad,
    ActividadFromJson,
    ActividadConId,
    NumberOfActivity,
    ActividadNumerada,
    IdActividad,
    FilteredActivities,
    AllActivities,
    ActivityDataForDetail,
};
export { asIdActividad };
