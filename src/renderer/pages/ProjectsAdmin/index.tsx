import { Box, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

import {
    AllActivities,
    asReadable,
    getProjectById,
    isNotNullable,
    Project,
    ProjectId,
} from '../../../model';
import { ProjectsControl } from '../../reducers/projectsReducer';
import useNotifications from '../../hooks/useNotifications';
import { NormalButton } from '../../components/buttons';
import Column from '../../components/Column';
import { PATH_NAMES } from '../../components/Nav';
import Notifications from '../../components/Notifications';
import RenameProjectModal from '../../components/modals/RenameProjectModal';
import AddProjectModal from '../../components/modals/AddProjectModal';
import DeleteProjectModal from '../../components/modals/DeleteProjectModal';
import PageTitle from '../../components/PageTitle';
import Page from '../Page';
import {
    hasAssociatedActivities,
    tryAddProject,
    tryRemove,
    tryRename,
} from './helpers';
import ProjectList from './ProjectList';
import useModalControls from '../../hooks/useModalControls';

interface Props {
    projects: Project[];
    projectsControl: ProjectsControl;
    activities: AllActivities;
}

const paddingUpperLevel = '2%';
const minimumPadding = '2vh';
const NOTIFICATION_TIMEOUT = 5000;

const PROJECT_IN_USE_MSG = asReadable(
    'Este proyecto no puede eliminarse, ya que existen actividades asociadas al mismo.'
);

const ProjectsAdminPage = ({
    projects,
    projectsControl,
    activities,
}: Props) => {
    const [selectedProject, setSelectedProject] = useState<ProjectId | null>(
        null
    );
    const [hovered, setHovered] = useState<number | null>(null);
    const notifications = useNotifications();
    const renamingProjectModal = useModalControls();
    const addingProjectModal = useModalControls();
    const deleteProjectModal = useModalControls();

    const handleAddProject = (projectName: string) => {
        const result = tryAddProject(
            projects,
            projectsControl,
            projectName.trim()
        );
        const successMsg = 'Proyecto añadido';
        if (result.ok) {
            notifications.notifyResult(
                result,
                successMsg,
                NOTIFICATION_TIMEOUT
            );
        }
        return result;
    };
    const handleRemove = (projectToRemove: ProjectId) => {
        const result = tryRemove(
            activities,
            projects,
            projectsControl,
            projectToRemove
        );
        const successMsg = 'Proyecto eliminado';
        if (result.ok) {
            notifications.notifyResult(
                result,
                successMsg,
                NOTIFICATION_TIMEOUT
            );
        }
        return result;
    };
    const handleRename = (id: ProjectId, newName: string) => {
        newName = newName.trim();
        const result = tryRename(projects, projectsControl, id, newName);
        if (result.ok) {
            notifications.notifyResult(
                result,
                'Proyecto renombrado',
                NOTIFICATION_TIMEOUT
            );
        }
        return result;
    };

    const handleClickRemove = (project: Project) => {
        if (hasAssociatedActivities(activities, project.id)) {
            notifications.setAlertMsg(PROJECT_IN_USE_MSG, NOTIFICATION_TIMEOUT);
        } else {
            setSelectedProject(project.id);
            deleteProjectModal.open();
        }
    };
    const handleClickRename = (project: Project) => {
        setSelectedProject(project.id);
        renamingProjectModal.open();
    };

    return (
        <Page
            breadcrumb={[PATH_NAMES.HOME, PATH_NAMES.PROJECTS]}
            maxW="100%"
            justify="space-between"
        >
            <Column className="projects-admin" flexGrow={1}>
                <PageTitle mt={0}>Administración de Proyectos</PageTitle>
                <Column
                    p={paddingUpperLevel}
                    pb={0}
                    id="projects-list-widget"
                    w="70%"
                    alignSelf="center"
                >
                    <Column bg="whiteAlpha.200" p={minimumPadding}>
                        {projects.length ? (
                            <>
                                <Text flexShrink={0}>Proyectos actuales:</Text>{' '}
                                <Box
                                    fontSize="0.8em"
                                    overflowY="auto"
                                    flexShrink={1}
                                    bg="whiteAlpha.200"
                                    border="2px solid rgba(0,0,0,0.4)"
                                    p="1vh"
                                >
                                    <ProjectList
                                        projects={projects}
                                        hovered={hovered}
                                        setHovered={setHovered}
                                        handleClickRename={handleClickRename}
                                        handleClickRemove={handleClickRemove}
                                    />
                                </Box>
                            </>
                        ) : (
                            <Text>No hay proyectos definidos</Text>
                        )}

                        <Flex justify="end">
                            <NormalButton
                                w="30%"
                                onClick={addingProjectModal.open}
                                ml="4rem"
                                mt="16px"
                                mr="24px"
                            >
                                Añadir un nuevo proyecto
                            </NormalButton>
                        </Flex>
                    </Column>
                </Column>
                <Box
                    p={paddingUpperLevel}
                    flexGrow={1}
                    flexShrink={0}
                    h="25%"
                    minH="25%"
                >
                    <Column p="12px" pt={0}>
                        <Notifications notifications={notifications} />
                    </Column>
                </Box>
            </Column>
            {addingProjectModal.isOpen && (
                <AddProjectModal
                    controls={addingProjectModal}
                    handleCreate={handleAddProject}
                />
            )}{' '}
            {renamingProjectModal.isOpen && isNotNullable(selectedProject) && (
                <RenameProjectModal
                    controls={renamingProjectModal}
                    handleRename={(newName: string) =>
                        handleRename(selectedProject, newName)
                    }
                    oldName={getProjectById(projects, selectedProject).name}
                />
            )}
            {deleteProjectModal.isOpen && isNotNullable(selectedProject) && (
                <DeleteProjectModal
                    controls={deleteProjectModal}
                    handleRemove={() => handleRemove(selectedProject)}
                    projectName={getProjectById(projects, selectedProject).name}
                />
            )}
        </Page>
    );
};

export default ProjectsAdminPage;
