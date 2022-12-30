import { Heading, HeadingProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends HeadingProps {
    children: ReactNode;
}

const FilterTitle = ({ children, ...rest }: Props) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Heading as="h3" size="md" m="4px" minH="max-content  !important" {...rest}>
        {children}
    </Heading>
);

const FilterSideBarTitle = ({ children }: Props) => (
    <Heading as="h2" size="md" mt="0" mb="0" minH="max-content">
        {children}
    </Heading>
);

const FilterInfo = ({ children }: Props) => (
    <Text fontSize="0.8em" pt="10px">
        {children}
    </Text>
);

export { FilterSideBarTitle, FilterTitle, FilterInfo };
