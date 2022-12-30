import { Project } from '../../../model';
import { sortProjectsByName } from './helpers';
import ProjectRow from './ProjectRow';

interface ProjectListProps {
    projects: Project[];
    hovered: number | null;
    setHovered: (value: number | null) => void;
    handleClickRename: (project: Project) => void;
    handleClickRemove: (project: Project) => void;
}

const ProjectList = ({
    projects,
    hovered,
    setHovered,
    handleClickRename,
    handleClickRemove,
}: ProjectListProps) => {
    return (
        <ul>
            {sortProjectsByName(projects).map((p, index) => {
                return (
                    <li
                        key={p.name}
                        onMouseEnter={() => setHovered(index)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <ProjectRow
                            handleClickRename={() => handleClickRename(p)}
                            project={p}
                            hovered={hovered === index}
                            onClickRemove={() => handleClickRemove(p)}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default ProjectList;
