import { Text } from '@chakra-ui/react';

import useCurrentZoom from '../hooks/useCurrentZoom';
import Column from './Column';

const DevHint = () => {
    const zoom = useCurrentZoom();
    const devText = 'Versión en desarrollo';
    const zoomText = `Zoom: ${zoom.toFixed(0)}%`;

    return (
        <Column
            position="fixed"
            right={0}
            bg="orange"
            color="black"
            fontSize="12px"
            p="4px"
        >
            <Text pb="4px">{devText}</Text>
            <Text>{zoomText}</Text>
        </Column>
    );
};

export default DevHint;
