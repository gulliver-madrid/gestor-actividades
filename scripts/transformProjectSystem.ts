import {
    ActivitiesObject,
    leerActividadesRaw,
    saveActivitiesObjectAsync,
} from '../src/main/persistence/activities';
import persistence from '../src/main/persistence';
import { ProjectsObjectToSave } from '../src/main/persistence/projects';
import { ProjectName } from '../src/model';

const PROJECTS_OFFSET = 1;
const ENABLED = 0;

// Este script se uso para modificar el formato de datos de los proyectos

interface OldData {
    proyecto?: string;
}

const main = async () => {
    if (!ENABLED) {
        console.log(
            'Error: Este script es legacy, y se supone que no debería ser ejecutado.'
        );
    }
    const projects =
        (await persistence.readProjects()) as unknown as ProjectName[];
    // console.log('\nProjects:');
    // console.log(projects);
    const newProjects = projects.map((name, index) => ({
        name,
        id: index + PROJECTS_OFFSET,
    }));
    // console.log(newProjects);
    const nextId = newProjects.length + PROJECTS_OFFSET;
    // console.log({ nextId });
    const newProjectsObject = { version: 2, projects: newProjects, nextId };

    console.log('\nNewProjectsObject:');
    console.log(newProjectsObject);
    const actividadesRaw = await leerActividadesRaw();
    if (!actividadesRaw.ok) {
        console.error('No se pudieron cargar las actividades');
        return;
    }
    const newActivities = actividadesRaw.value.map((oldAct) => {
        const act = oldAct as unknown as OldData;
        let project: number | undefined;
        if (projects.includes(act.proyecto as ProjectName)) {
            const found = newProjects.find(
                (proy) => act.proyecto === proy.name
            );
            if (found) {
                project = found.id;
            }
        }
        delete act.proyecto;
        return { ...act, project };
    });
    const newActivitiesObject = { version: 2, activities: newActivities };
    console.log('\nNewActivitiesObject:');
    console.log(newActivitiesObject);
    persistence.saveProjectsObject(
        newProjectsObject as unknown as ProjectsObjectToSave
    );
    await saveActivitiesObjectAsync({
        ...(newActivitiesObject as unknown as ActivitiesObject),
        saveDate: new Date(),
    });
    console.log('Done');
};

main();
