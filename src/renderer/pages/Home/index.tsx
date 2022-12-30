import { Box, Center, Flex } from '@chakra-ui/react';
import { FaListUl } from 'react-icons/fa';
import { GrAdd, GrProjects } from 'react-icons/gr';
import { CgUserList } from 'react-icons/cg';
import { FiUserPlus } from 'react-icons/fi';

import Column from '../../components/Column';
import HomePageTitle from './HomePageTitle';
import HomeNavLinkButton from './NavLinkButton';
import useCurrentVersion from '../../hooks/useCurrentVersion';

const HomePage = () => {
    const version = useCurrentVersion();
    return (
        <Column flexGrow={1} fontSize="16px" maxH="100%">
            <Center flexGrow={1}>
                <Column flexGrow="1">
                    <HomePageTitle>Gestor de Actividades</HomePageTitle>
                    <Column justify="center" align="center" className="Home">
                        <Flex p="20px">
                            <HomeNavLinkButton
                                path="add-record/"
                                text="Nueva Actividad"
                                icon={<GrAdd />}
                            />
                            <HomeNavLinkButton
                                path="activities/"
                                text="Ver Actividades"
                                icon={<FaListUl />}
                            />
                        </Flex>
                        <Flex p="20px">
                            <HomeNavLinkButton
                                path="add-user/"
                                text="Nuevo Usuario"
                                icon={<FiUserPlus />}
                            />
                            <HomeNavLinkButton
                                path="users/"
                                text="Ver Usuarios"
                                icon={<CgUserList />}
                                fontSizeIcon="28px"
                            />
                        </Flex>
                    </Column>
                </Column>
            </Center>
            <Flex justify="space-between" align="end" p="4px">
                <Box> {version && 'Versión ' + version}</Box>
                <HomeNavLinkButton
                    path="projects/"
                    text="Administrar proyectos"
                    icon={<GrProjects />}
                    p="8px"
                    fontSize="12px"
                    bg="rgba(255,255,255,0.8)"
                />
            </Flex>
        </Column>
    );
};

export default HomePage;
