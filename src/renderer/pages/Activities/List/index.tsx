import { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { Box, BoxProps, Flex } from '@chakra-ui/react';
import { Pagination } from 'antd';

import { FilteredActivities, NumberOfActivity } from '../../../../model';
import colors from '../../../colors';
import { debugBg } from '../../../config';
import { PageSizing } from '../../../hooks/usePageSizing';
import Column from '../../../components/Column';
import ActivityRow from './ActivityRow';
import PageSizeSetter from './PageSizeSetter';
import ColumnNamesRow from './ColumnNamesRow';

interface Props extends BoxProps {
    activities: FilteredActivities;
    filterText?: string;
    setSelected: Dispatch<SetStateAction<NumberOfActivity | null>>;
    pageSizing: PageSizing;
}

const ActivityList = ({
    activities,
    filterText,
    setSelected,
    pageSizing,
    ...rest
}: Props) => {
    const {
        currentPage,
        pageSize,
        displayedRange,
        handlePaginationChange,
        updatePageSize,
    } = pageSizing;
    const createHandleClickDetail = (numberOfActivity: NumberOfActivity) => {
        const handleClick = (event: SyntheticEvent) => {
            event.preventDefault();
            setSelected((prev) =>
                prev === numberOfActivity ? null : numberOfActivity
            );
        };
        return handleClick;
    };
    const displayedActivities = activities.slice(
        displayedRange.minValue,
        displayedRange.maxValue
    );
    const numberOfPages = Math.ceil(activities.length / pageSize);
    return (
        <Column
            bg={debugBg('blue')}
            minH="0"
            h="100%"
            maxH="100%"
            overflowY="hidden"
            {...rest}
        >
            <Box
                id="div-actividades"
                m="0"
                p={0}
                flexGrow={1}
                bg={colors.bgSoft}
            >
                <Column h="100%" justify="space-around">
                    <ColumnNamesRow />
                    <Column
                        overflowY="auto"
                        justify="space-around"
                        flexGrow={1}
                    >
                        <ul
                            className={
                                'ul-actividades ' +
                                (numberOfPages === currentPage
                                    ? 'flex-start'
                                    : '')
                            }
                        >
                            {displayedActivities.map((activityData) => (
                                <li
                                    key={activityData.activity.id}
                                    className="no-bullet"
                                >
                                    <ActivityRow
                                        activityData={activityData}
                                        highlightedString={filterText}
                                        onClickDetail={createHandleClickDetail(
                                            activityData.numberOfActivity
                                        )}
                                    />
                                </li>
                            ))}
                        </ul>
                    </Column>
                </Column>
            </Box>

            <Flex flexShrink={0} pt="12px" justify="center">
                <Flex>
                    <Pagination
                        key={pageSize}
                        current={currentPage}
                        pageSize={pageSize}
                        onChange={handlePaginationChange}
                        total={activities.length}
                    />
                    <PageSizeSetter
                        updatePageSize={updatePageSize}
                        pageSize={pageSize}
                    />
                </Flex>
            </Flex>
        </Column>
    );
};

export default ActivityList;
