import { Flex, FlexProps, Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends FlexProps {
    children: ReactNode;
}

const PageTitle = ({ children, ...rest }: Props) => (
    <Flex
        flexShrink={0}
        flexGrow={0}
        justify="center"
        minH="max-content"
        mt="-12px"
        mb="8px"
        {...rest}
    >
        <Heading>{children}</Heading>
    </Flex>
);

export default PageTitle;
