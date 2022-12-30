import { Box, Text } from '@chakra-ui/react';

import { ActivityDataForDetail, userToString } from '../../../../model';
import FieldName from './FieldName';
import ParticipantList from './ParticipantList';

interface Props {
    activityData: ActivityDataForDetail;
}

const ActivityExtraInfo = ({ activityData }: Props) => {
    const { activity } = activityData;
    const nombresParticipantes = getParticipantNames(activityData);
    const fechaCreacionFormatoCorrecto =
        activity.fechaCreacion.toLocaleDateString('es-ES');

    return (
        <Box>
            {activity.descripcion ? (
                <p>
                    <FieldName>Descripción: </FieldName>
                    {activity.descripcion}
                </p>
            ) : null}
            <Text mt="8px">
                <FieldName>Proyecto: </FieldName>{' '}
                {activityData.projectName || 'Sin asignar'}
            </Text>

            <Text mt="8px">
                <FieldName>Status: </FieldName>
                {activity.status || 'No disponible'}
            </Text>

            <ParticipantList names={nombresParticipantes} />
            <Text mt="8px">
                <FieldName>Fecha de creación: </FieldName>{' '}
                {fechaCreacionFormatoCorrecto}
            </Text>
        </Box>
    );
};

const getParticipantNames = (data: ActivityDataForDetail) =>
    data.usersParticipants.map((user) => userToString(user));

export default ActivityExtraInfo;
