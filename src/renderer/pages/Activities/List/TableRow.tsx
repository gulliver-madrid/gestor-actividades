import { Text, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

const widthTitle = '35%';
const widthStatus = '8em';
const numberOfActivityWidth = '2.4em';
const numberOfActivityMarginRight = '1rem';

interface Props {
    titleComponent: ReactNode;
    statusComponent: ReactNode;
    projectComponent: ReactNode;
    numberActivityComponent?: ReactNode;
}

const ActivityTableRow = ({
    titleComponent,
    statusComponent,
    projectComponent,
    numberActivityComponent,
}: Props) => {
    return (
        <>
            <Text
                w={numberOfActivityWidth}
                minW={numberOfActivityWidth}
                mr={numberOfActivityMarginRight}
                textAlign="right"
            >
                {numberActivityComponent}
            </Text>
            <Flex flexGrow={1} h="max-content" align="baseline">
                <Text
                    width={widthTitle}
                    minW={widthTitle}
                    overflow="hidden"
                    textOverflow="ellipsis"
                >
                    {titleComponent}
                </Text>
                <Text ml="1em" width={widthStatus} minW={widthStatus}>
                    {statusComponent}
                </Text>
                <Text lineHeight="1em">{projectComponent}</Text>
            </Flex>
        </>
    );
};

export default ActivityTableRow;
