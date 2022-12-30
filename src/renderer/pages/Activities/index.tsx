import { useMemo, useState } from 'react';
import { Flex } from '@chakra-ui/react';

import {
    AllActivities,
    IdActividad,
    NumberOfActivity,
    Project,
    UsuarioConId,
} from '../../../model';
import { debugBg } from '../../config';
import useFilters from '../../hooks/useFilters';
import usePageSizing from '../../hooks/usePageSizing';
import { PATH_NAMES } from '../../components/Nav';
import PageTitle from '../../components/PageTitle';
import Page from '../Page';
import FilterSideBar from './FilterSideBar';
import ActivitiesWidgetList from './Widget';
import ActivityDetails from './Details';
import {
    filterAndNumber as filterNumberAndSort,
    getSelectedActivityData,
} from './helpers';

interface Props {
    activities: AllActivities;
    users: UsuarioConId[];
    projects: Project[];
    eliminarActividad: (id: IdActividad) => void;
}

const ActivitiesPage = ({
    activities,
    users: users,
    eliminarActividad: eliminarActividadById,
    projects,
}: Props) => {
    const pageSizing = usePageSizing();
    const resetPage = pageSizing.resetPageSizing;
    const { filters, filtersControl } = useFilters(resetPage);

    const [showingFilters, setShowingFilters] = useState(false);
    const [selected, setSelected] = useState<NumberOfActivity | null>(null);

    const actividadesNumeradasFiltradas = useMemo(() => {
        return filterNumberAndSort(activities, projects, users, filters);
    }, [activities, filters]);

    const activityDataForDetails = getSelectedActivityData(
        actividadesNumeradasFiltradas,
        users,
        projects,
        selected
    );
    const onCloseActivity = () => setSelected(null);
    return (
        <Page
            id="lista-actividades-page"
            breadcrumb={[PATH_NAMES.HOME, PATH_NAMES.ACTIVITIES]}
            maxW="100%"
            maxH="100%"
            bg={debugBg('orange')}
        >
            {activityDataForDetails ? (
                <ActivityDetails
                    activityData={activityDataForDetails}
                    eliminarActividad={() => {
                        const idToRemove = activityDataForDetails.activity.id;
                        eliminarActividadById(idToRemove);
                        setSelected(null);
                    }}
                    onCloseActivity={onCloseActivity}
                />
            ) : (
                <>
                    <PageTitle>Actividades</PageTitle>

                    <Flex
                        direction="row"
                        justify="space-between"
                        align="stretch"
                        flexGrow={1}
                        maxH="100%"
                        bg={debugBg('cyan')}
                    >
                        <ActivitiesWidgetList
                            filters={filters}
                            activities={actividadesNumeradasFiltradas}
                            setShowingFilters={setShowingFilters}
                            showingFilters={showingFilters}
                            setSelected={setSelected}
                            pageSizing={pageSizing}
                        />
                        {showingFilters ? (
                            <FilterSideBar
                                key={filters.version}
                                filters={filters}
                                filtersControl={filtersControl}
                                users={users}
                                projects={projects}
                            />
                        ) : null}
                    </Flex>
                </>
            )}
        </Page>
    );
};

export default ActivitiesPage;
