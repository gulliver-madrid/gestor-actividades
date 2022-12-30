import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import { ActividadConId, Usuario, IdUsuario, IdActividad } from '../model';
import actions from './actions/actions';
import AddActivityPage from './pages/Activity/Add';
import HomePage from './pages/Home';
import ModificarActividadPage from './pages/Activity/Modify';
import ActivitiesPage from './pages/Activities';
import AddUserPage from './pages/User/Add';
import ModificarUsuarioPage from './pages/User/Modify';
import UsersPage from './pages/Users';
import { isProduction } from '../helpers';

import './App.css';
import config from './config';
import useProjects from './hooks/useProjects';
import useActivities from './hooks/useActivities';
import useUsers from './hooks/useUsers';
import DevHint from './components/DevHint';
import { ActivitiesActionKind } from './reducers/activityReducer';
import ProjectsAdminPage from './pages/ProjectsAdmin';

const emotionCache = createCache({
    key: 'emotion-css-cache',
    prepend: true, // ensures styles are prepended to the <head>, instead of appended
});

export default function App() {
    const { activities, dispatch: dispatchActivities } = useActivities();
    const { users: users, setUsers } = useUsers();
    const { projects, projectsControl } = useProjects();

    actions.logMsg('>>> Rendering App <<<', 'info');

    const eliminarActividad = (id: IdActividad) => {
        dispatchActivities({
            type: ActivitiesActionKind.REMOVE,
            idToRemove: id,
        });
    };
    const addActivity = (activity: ActividadConId) => {
        dispatchActivities({
            type: ActivitiesActionKind.ADD,
            activity,
        });
    };
    const modifyActivity = (modificada: ActividadConId) => {
        dispatchActivities({ type: ActivitiesActionKind.MODIFY, modificada });
    };
    const removeUserFromActivities = (idUsuario: IdUsuario) => {
        dispatchActivities({
            type: ActivitiesActionKind.REMOVE_USER,
            idUsuario,
        });
    };

    const eliminarUsuarioPorId = (idUsuario: IdUsuario) => {
        const actualizados = users.filter(
            (user: Usuario) => user.id !== idUsuario
        );
        removeUserFromActivities(idUsuario);
        logRemoveUser(idUsuario);
        setUsers(actualizados);
        actions.guardarUsuarios(actualizados);
    };
    return (
        <CacheProvider value={emotionCache}>
            <ChakraProvider>
                {!isProduction() && config.showDevHint ? <DevHint /> : null}
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="add-record/"
                            element={
                                <AddActivityPage
                                    users={users}
                                    projects={projects}
                                    activityTitles={activities.values.map(
                                        (act) => act.titulo
                                    )}
                                    addActivity={addActivity}
                                />
                            }
                        />
                        <Route
                            path="activities/"
                            element={
                                <ActivitiesPage
                                    activities={activities}
                                    users={users}
                                    eliminarActividad={eliminarActividad}
                                    projects={projects}
                                />
                            }
                        />
                        <Route
                            path="add-user/"
                            element={
                                <AddUserPage
                                    users={users}
                                    setUsers={setUsers}
                                />
                            }
                        />
                        <Route
                            path="users/"
                            element={
                                <UsersPage
                                    users={users}
                                    eliminarUsuarioPorId={eliminarUsuarioPorId}
                                />
                            }
                        />
                        <Route
                            path="modify-activity/:idActividad"
                            element={
                                <ModificarActividadPage
                                    data={{ activities, users, projects }}
                                    modifyActivity={modifyActivity}
                                />
                            }
                        />
                        <Route
                            path="modify-user/:idUsuario"
                            element={
                                <ModificarUsuarioPage
                                    users={users}
                                    setUsers={setUsers}
                                />
                            }
                        />
                        <Route
                            path="projects/"
                            element={
                                <ProjectsAdminPage
                                    projects={projects}
                                    projectsControl={projectsControl}
                                    activities={activities}
                                />
                            }
                        />
                    </Routes>
                </Router>
            </ChakraProvider>
        </CacheProvider>
    );
}
function logRemoveUser(idUser: IdUsuario) {
    actions.logMsg(`Se solicitó eliminar el usuario con id ${idUser}`, 'info');
}
