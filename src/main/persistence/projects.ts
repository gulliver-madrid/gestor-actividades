import fs from 'fs';

import { logger } from '../../logging';
import { check, checkIsArray } from '../../helpers';
import { AllProjects, Project, VoidResult } from '../../model';
import { diskWorks } from './diskOps';
import { convertirAJSON, datadir, dataPathProyectos } from './shared';

interface ProjectsObject {
    projects: Project[];
    nextId: number;
}
interface ProjectsObjectToSave extends ProjectsObject {
    saveDate: Date;
}

const readProjects = async (): Promise<AllProjects> => {
    const { projects, nextId } = await readProjectsObject();
    checkIsArray(projects);
    if (projects.length) check(projects[0].name);
    return { values: projects, nextId };
};

const readProjectsObject = async (): Promise<ProjectsObject> => {
    if (!fs.existsSync(datadir) || !fs.existsSync(dataPathProyectos)) {
        return { projects: [], nextId: 1 };
    }
    const data = await diskWorks.readFile(dataPathProyectos);
    let projectObjectParsed: ProjectsObject | undefined;
    if (data.ok) {
        try {
            projectObjectParsed = JSON.parse(data.value);
        } catch (e) {
            logger.error('No se pudieron parsear los proyectos.');
        }
    }
    if (
        !data.ok ||
        !projectObjectParsed ||
        !projectObjectParsed.projects ||
        !projectObjectParsed.nextId
    )
        throw new Error(
            `No valid data for projects (looking at ${dataPathProyectos})`
        );

    return projectObjectParsed;
};

const guardarProyectos = (projects: AllProjects): Promise<VoidResult> => {
    const { nextId } = projects;
    if (nextId === null) {
        throw new Error("nextId can't be save as null");
    }
    return saveProjectsObject({
        projects: projects.values,
        nextId,
        saveDate: new Date(),
    });
};
const saveProjectsObject = async (
    projectsObject: ProjectsObjectToSave
): Promise<VoidResult> => {
    await diskWorks.makeDirIfDoesntExist(datadir);
    const dataJson = convertirAJSON(projectsObject);
    return diskWorks.writeInDisk(dataJson, dataPathProyectos);
};

export { readProjects, guardarProyectos, saveProjectsObject };
export type { ProjectsObjectToSave };
