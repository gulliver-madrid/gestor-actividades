import { Center, Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const HomePageTitle = ({ children }: Props) => (
    <Center>
        <Heading>{children}</Heading>
    </Center>
);

export default HomePageTitle;
