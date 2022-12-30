import { Link } from 'react-router-dom';
import { Box, BoxProps, Text } from '@chakra-ui/react';

import HomeNavButton from './HomeNavButton';
import { ReactNode } from 'react';

interface Props extends BoxProps {
    path: string;
    text: string;
    icon: ReactNode;
    fontSizeIcon?: string;
}

const HomeNavLinkButton = ({
    path,
    text,
    icon,
    fontSizeIcon,
    ...rest
}: Props) => {
    fontSizeIcon ||= '24px';
    return (
        <Link to={path} type="button">
            <HomeNavButton {...rest}>
                <Text>{text}</Text>
                <Box fontSize={fontSizeIcon}>{icon}</Box>
            </HomeNavButton>
        </Link>
    );
};

export default HomeNavLinkButton;
