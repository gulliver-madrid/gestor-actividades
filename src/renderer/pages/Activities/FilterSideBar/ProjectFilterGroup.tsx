import { Filters, Project, ProjectName } from '../../../../model';
import FilterGroup from './FilterGroup';

interface Props {
    filters: Filters;
    addProjectFilter: (project: ProjectName) => void;
    removeProjectFilter: (project: ProjectName) => void;
    projects: Project[];
}

const ProjectFilterGroup = ({
    filters,
    addProjectFilter,
    removeProjectFilter,
    projects,
}: Props) => {
    return (
        <FilterGroup
            columnId="filtros-proyectos"
            title="Proyectos"
            addItemFilter={addProjectFilter}
            removeItemFilter={removeProjectFilter}
            itemList={projects.map((p) => p.name)}
            filteringList={filters.projects}
        />
    );
};

export default ProjectFilterGroup;
