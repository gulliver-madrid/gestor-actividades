import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, HStack } from '@chakra-ui/react';

import { ActivityDataForDetail } from '../../../../model';
import NormalButton from '../../../components/buttons/NormalButton';
import Column from '../../../components/Column';
import Thumbnails from './Thumbnails';
import ActivityExtraInfo from './ActivityExtraInfo';

interface ActivityDetailsContentBasicProps {
    activityData: ActivityDataForDetail;
    modalDeleteOnOpen: () => void;
}
interface Props extends ActivityDetailsContentBasicProps {
    setImageOpened: Dispatch<SetStateAction<number | null>>;
}

const ActivityDetailsContent = ({
    activityData,
    modalDeleteOnOpen,
    setImageOpened,
}: Props) => {
    const { activity } = activityData;
    return (
        <Column>
            {' '}
            <Flex my="16px" justify="space-between" flexGrow={1}>
                <Box ml="24px">
                    <ActivityExtraInfo activityData={activityData} />
                </Box>

                <Box pr="16px">
                    <Thumbnails
                        idImages={activity.imagenes}
                        setImageOpened={setImageOpened}
                    />
                </Box>
            </Flex>
            <Flex mt="12px" justify="center" w="100%">
                <HStack>
                    {' '}
                    <Link to={`../modify-activity/${activity.id}`}>
                        <NormalButton>Modificar</NormalButton>
                    </Link>
                    <NormalButton
                        className="red"
                        onClick={(event) => {
                            event.stopPropagation();
                            modalDeleteOnOpen();
                        }}
                    >
                        Eliminar
                    </NormalButton>
                </HStack>
            </Flex>
        </Column>
    );
};

export type { ActivityDetailsContentBasicProps };
export default ActivityDetailsContent;
