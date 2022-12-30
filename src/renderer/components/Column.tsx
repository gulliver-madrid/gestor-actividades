import { Flex, FlexProps } from '@chakra-ui/react';

const Column = ({ children, ...rest }: FlexProps) => {
    return (
        <Flex direction="column" {...rest}>
            {children}
        </Flex>
    );
};

export default Column;
