import { Project, ProjectId, ProjectName } from '../../model';
import { sortProjectsByName } from '../../renderer/pages/ProjectsAdmin/helpers';

const fixedId = 0; // Ids should be ignored by sortProjectsByName()
const createProject = (name: string): Project => {
    return {
        name: name as ProjectName,
        id: fixedId as ProjectId,
    };
};

describe('sortProjectsByName', () => {
    test('should sort projects alphabetically', () => {
        const projects: Project[] = [
            createProject('Proyecto C'),
            createProject('Proyecto A'),
            createProject('Proyecto B'),
        ];

        const sortedProjects = sortProjectsByName(projects);

        expect(sortedProjects).toEqual([
            createProject('Proyecto A'),
            createProject('Proyecto B'),
            createProject('Proyecto C'),
        ]);
    });

    test('should sort projects with numbers correctly', () => {
        const projects: Project[] = [
            createProject('Proyecto 10'),
            createProject('Proyecto 1'),
            createProject('Proyecto 3'),
        ];

        const sortedProjects = sortProjectsByName(projects);

        expect(sortedProjects).toEqual([
            createProject('Proyecto 1'),
            createProject('Proyecto 3'),
            createProject('Proyecto 10'),
        ]);
    });

    test('should return an empty array if there are no projects', () => {
        const projects: Project[] = [];

        const sortedProjects = sortProjectsByName(projects);

        expect(sortedProjects).toEqual([]);
    });

    test('should keep the original array intact', () => {
        const originalProjects: Project[] = [
            createProject('Proyecto C'),
            createProject('Proyecto A'),
            createProject('Proyecto B'),
        ];

        const projects = [...originalProjects];
        const sortedProjects = sortProjectsByName(projects);

        expect(projects).toEqual(originalProjects);
        expect(sortedProjects).not.toBe(originalProjects);
    });
});
