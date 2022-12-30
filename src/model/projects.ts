type ProjectName = string & { readonly __tag: unique symbol };
type ProjectId = number & { readonly __tag: unique symbol };

interface Project {
    id: ProjectId;
    name: ProjectName;
}

interface AllProjects {
    values: Project[];
    nextId: number | null;
}

const castToProjectId = (n: number): ProjectId => {
    if (n < 1) {
        throw new Error(`Invalid value for ProjectId: ${n}`);
    }
    return n as ProjectId;
};

const getProjectById = (projects: Project[], projectId: ProjectId): Project => {
    const project = projects.find((p) => p.id === projectId);
    if (project === undefined)
        throw new Error('ProjectId not found in projects list' + projectId);
    return project;
};

const getProjectNames = (projects: Project[]) => projects.map((p) => p.name);

const getProjectIds = (projects: Project[]) => projects.map((p) => p.id);

const projectNameAlreadyUsed = (projects: Project[], name: string): boolean =>
    getProjectNames(projects).includes(name as ProjectName);

export {
    castToProjectId,
    getProjectById,
    getProjectNames,
    getProjectIds,
    projectNameAlreadyUsed,
};

export type { ProjectName, ProjectId, Project, AllProjects };
