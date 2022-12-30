import { Box, Text } from '@chakra-ui/react';

import FieldName from './FieldName';

interface Props {
    names: string[];
}

const NO_PARTICIPANTS =
    'Esta actividad aún no tiene participantes registrados.';

const ParticipantList = ({ names }: Props) => {
    const empty = !names.length;
    return (
        <Box>
            <Text mt="4px">
                <FieldName>Participantes: </FieldName>
                {empty && NO_PARTICIPANTS}
            </Text>
            {!empty && (
                <ul className="no-bullet">
                    {names.map((name) => (
                        <li key={name}>- {name} </li>
                    ))}
                </ul>
            )}
        </Box>
    );
};

export default ParticipantList;
