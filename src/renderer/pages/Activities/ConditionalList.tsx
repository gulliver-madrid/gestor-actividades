import { Dispatch, SetStateAction } from 'react';
import { Box, Text } from '@chakra-ui/react';

import { FilteredActivities, Filters, NumberOfActivity } from '../../../model';
import { debugBg } from '../../config';
import { PageSizing } from '../../hooks/usePageSizing';
import { createNoActivityMsg } from '../../presenters/filterMsgCreator';
import ActivityList from './List';

interface Props {
    activities: FilteredActivities;
    filters: Filters;
    setSelected: Dispatch<SetStateAction<NumberOfActivity | null>>;
    pageSizing: PageSizing;
}

const ActivitiesConditionalList = ({
    activities,
    filters,
    setSelected,
    pageSizing,
}: Props) => {
    const noActivityMsg = createNoActivityMsg(filters);
    return (
        <Box
            className="actividades-container"
            maxH="100%"
            bg={debugBg('yellow')}
            flexGrow={1}
            pr="10px"
        >
            {' '}
            {activities.length ? (
                <ActivityList
                    activities={activities}
                    filterText={filters.byName || undefined}
                    setSelected={setSelected}
                    flexGrow={1}
                    pageSizing={pageSizing}
                />
            ) : (
                <Text>{noActivityMsg}</Text>
            )}
        </Box>
    );
};

export default ActivitiesConditionalList;
