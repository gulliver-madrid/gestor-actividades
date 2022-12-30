import { Box, VStack, StackProps } from '@chakra-ui/react';

import { debugBg } from '../../config';

const HomeNavButton = ({ children, ...rest }: StackProps) => {
    return (
        <Box
            color="black"
            m="12px"
            p="24px"
            borderRadius="16px"
            bg="white"
            className="increasing-size-button"
            fontSize="20px"
            {...rest}
        >
            <VStack bg={debugBg('yellow')}>{children}</VStack>
        </Box>
    );
};

export default HomeNavButton;
