import { Box, Flex, Text, Heading } from '@chakra-ui/react';
import { useState } from 'react';

import { ActivityDataForDetail } from '../../../../model';
import DeleteActivityModal from '../../../components/modals/DeleteActivityModal';
import Column from '../../../components/Column';
import useModalControls from '../../../hooks/useModalControls';
import ActivityDetailsConditionalContent from './ConditionalContent';

interface Props {
    activityData: ActivityDataForDetail;
    eliminarActividad: () => void;
    onCloseActivity: () => void;
}

const ActivityDetails = ({
    activityData,
    eliminarActividad,
    onCloseActivity,
}: Props) => {
    const deleteModal = useModalControls();
    const [imageOpened, setImageOpened] = useState<number | null>(null);
    const { activity } = activityData;
    const selectedActivityName = activity?.titulo || null;

    const noImageOpen = imageOpened === null;
    const handleClickCloseButton = noImageOpen
        ? onCloseActivity
        : () => setImageOpened(null);

    return (
        <Column
            p="8px"
            flexGrow={1}
            justify="start"
            className="activity-detail-container"
        >
            <Box
                className="actividad-opened activity-detail-box"
                w="100%"
                overflow="auto"
            >
                {noImageOpen ? (
                    <Flex w="100%" justify="space-between">
                        <Text>
                            <Heading as="h3">{activity.titulo}</Heading>
                        </Text>
                        <CloseButton
                            onClick={handleClickCloseButton}
                            text="X"
                        />
                    </Flex>
                ) : (
                    <Flex
                        w="100%"
                        justify="space-between"
                        direction="row-reverse"
                    >
                        <CloseButton
                            onClick={handleClickCloseButton}
                            text="[Cerrar imagen]"
                        />
                    </Flex>
                )}
                <ActivityDetailsConditionalContent
                    activityData={activityData}
                    modalDeleteOnOpen={deleteModal.open}
                    imageOpened={imageOpened}
                    setImageOpened={setImageOpened}
                />
            </Box>
            <DeleteActivityModal
                controls={deleteModal}
                nombreActividadToRemove={selectedActivityName}
                eliminarActividad={eliminarActividad}
            />
        </Column>
    );
};
interface CloseButtonProps {
    onClick: () => void;
    text: string;
}
const CloseButton = ({ onClick, text }: CloseButtonProps) => (
    <button onClick={onClick}>
        <Box
            px="16px"
            borderRadius="16px"
            _hover={{ bg: 'rgba(255,255,255,0.3)' }}
        >
            {text}
        </Box>
    </button>
);

export default ActivityDetails;
