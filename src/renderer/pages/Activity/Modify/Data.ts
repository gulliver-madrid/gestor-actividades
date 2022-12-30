import { AllActivities, Project, UsuarioConId } from '../../../../model';

interface ModificarActividadData {
    activities: AllActivities;
    users: UsuarioConId[];
    projects: Project[];
}

export type { ModificarActividadData };
