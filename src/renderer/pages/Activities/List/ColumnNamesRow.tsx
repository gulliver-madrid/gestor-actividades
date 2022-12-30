import { Flex } from '@chakra-ui/react';

import ActivityTableRow from './TableRow';

const ColumnNamesRow = () => (
    <Flex
        id="column-names-activities"
        bg="rgba(0,0,0,0.4)"
        pb="8px"
        mt="-4px"
        pt="4px"
    >
        <ActivityTableRow
            titleComponent={
                <small>
                    <strong>Título</strong>
                </small>
            }
            statusComponent={
                <small>
                    <strong>Status</strong>{' '}
                </small>
            }
            projectComponent={
                <small>
                    <strong>Proyecto</strong>{' '}
                </small>
            }
        />
    </Flex>
);

export default ColumnNamesRow;
