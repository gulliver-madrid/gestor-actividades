import { Actividad, UsuarioConId, Project } from '../../../../model';

export interface FormularioActividadData {
    activity: Actividad;
    users: UsuarioConId[];
    projects: Project[];
    existingTitles: string[];
    initialStateOfActivity: Actividad;
}
