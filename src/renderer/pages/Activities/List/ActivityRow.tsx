import { SyntheticEvent } from 'react';
import { Flex } from '@chakra-ui/react';

import { ActivityDataForDetail } from '../../../../model';
import ActivityTableRow from './TableRow';
import PartiallyHighlightedText from './PartiallyHighlightedText';

interface Props {
    highlightedString?: string;
    activityData: ActivityDataForDetail;
    onClickDetail: (event: SyntheticEvent) => void;
}

const ActivityRow = ({
    activityData,
    onClickDetail,
    highlightedString,
}: Props) => {
    const { activity, numberOfActivity, projectName } = activityData;
    const numStr = numberOfActivity.toString();

    return (
        <Flex
            p="8px"
            pl="0"
            borderRadius="12px"
            _hover={{
                bg: 'rgba(255, 255, 255, 0.2)',
            }}
            onClick={onClickDetail}
            flexShrink={1}
            cursor="pointer"
        >
            <ActivityTableRow
                titleComponent={
                    <strong>
                        <PartiallyHighlightedText
                            text={activity.titulo}
                            highlighted={highlightedString}
                        />{' '}
                    </strong>
                }
                statusComponent={
                    <small className="small-caps status-tag">
                        {activity.status}
                    </small>
                }
                projectComponent={<small>{projectName}</small>}
                numberActivityComponent={numStr}
            />
        </Flex>
    );
};

export default ActivityRow;
