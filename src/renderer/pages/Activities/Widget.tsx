import { Dispatch, SetStateAction } from 'react';
import { Flex } from '@chakra-ui/react';

import { FilteredActivities, Filters, NumberOfActivity } from '../../../model';
import { PageSizing } from '../../hooks/usePageSizing';
import { crearMsgFiltros } from '../../presenters/filterMsgCreator';
import Column from '../../components/Column';
import ActivitiesConditionalList from './ConditionalList';
import { FilterInfo } from './FilterSideBar/filterComponents';
import FilterActivitiesButton from './FilterButton';

interface Props {
    filters: Filters;
    activities: FilteredActivities;
    setShowingFilters: Dispatch<SetStateAction<boolean>>;
    showingFilters: boolean;
    setSelected: Dispatch<SetStateAction<NumberOfActivity | null>>;
    pageSizing: PageSizing;
}

const ActivitiesWidgetList = ({
    filters,
    activities,
    setShowingFilters,
    showingFilters,
    setSelected,
    pageSizing,
}: Props) => {
    const filterMsg = crearMsgFiltros(filters);

    return (
        <Column p="10px" pt="0" pr="0" flexGrow={1} h="100%" maxH="100%">
            <Flex
                id="filter-bar"
                p="0 0 0 40px"
                justify="space-between"
                align="center"
                flexShrink={0}
            >
                <FilterInfo>
                    {`${filterMsg} (${activities.length} actividades)`}
                </FilterInfo>
                <FilterActivitiesButton
                    showingFilters={showingFilters}
                    setShowingFilters={setShowingFilters}
                />
            </Flex>
            <ActivitiesConditionalList
                activities={activities}
                filters={filters}
                setSelected={setSelected}
                pageSizing={pageSizing}
            />
        </Column>
    );
};

export default ActivitiesWidgetList;
