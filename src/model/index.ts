import {
    Actividad,
    ActividadNumerada,
    IdActividad,
    ActividadConId,
    asIdActividad,
    ActividadFromJson,
    FilteredActivities,
    AllActivities,
    NumberOfActivity,
    ActivityDataForDetail,
} from './actividad';
import { posiblesStatus, Status, statusDefault } from './status';
import {
    IdImagen,
    Imagen,
    UploadImageResult,
    ImageBuffer,
    ImageWithBuffer,
} from './imagenes';
import {
    AllProjects,
    getProjectById,
    getProjectIds,
    getProjectNames,
    Project,
    ProjectId,
    ProjectName,
    projectNameAlreadyUsed,
} from './projects';
import {
    assertEsUsuarioConId,
    getUserByIdFromUsuarios,
    getUserGetterById,
    getUsuariosDisponibles,
    IdUsuario,
    userToString,
    Usuario,
    UsuarioConId,
    UsuarioNumerado,
} from './usuario';
import { UpdateActivities } from './updaters';
import { createErr, createOk, Result, VoidResult } from './results';

// Only for msgs intended to arrive to the end user
type ReadableMsgForUser = string & { readonly __tag: unique symbol };

const asReadable = (s: string): ReadableMsgForUser => s as ReadableMsgForUser;

function isNotNullable<T>(value: T): value is NonNullable<T> {
    return value !== null && value !== undefined;
}

interface Filters {
    byName: string;
    projects: ProjectName[];
    user?: UsuarioConId;
    status: Status[];
    version: number;
}

const toAllActivites = (activities: ActividadConId[]): AllActivities =>
    ({
        values: activities,
    } as AllActivities);

type Updater<T> = (prev: T) => T;

export {
    asReadable,
    assertEsUsuarioConId,
    userToString,
    getUserByIdFromUsuarios,
    getUsuariosDisponibles,
    getUserGetterById,
    posiblesStatus,
    statusDefault,
    asIdActividad,
    toAllActivites,
    createErr,
    createOk,
    getProjectById,
    getProjectNames,
    getProjectIds,
    isNotNullable,
    projectNameAlreadyUsed,
};

export type {
    Usuario,
    UsuarioConId,
    UsuarioNumerado,
    IdUsuario,
    IdActividad,
    Actividad,
    ActividadConId,
    ActividadNumerada,
    ActividadFromJson,
    ActivityDataForDetail,
    IdImagen,
    Imagen,
    ImageWithBuffer,
    ImageBuffer,
    Result,
    UploadImageResult,
    ProjectName,
    Status,
    Filters,
    UpdateActivities,
    FilteredActivities,
    AllActivities,
    NumberOfActivity,
    VoidResult,
    Project,
    ProjectId,
    AllProjects,
    Updater,
    ReadableMsgForUser,
};
