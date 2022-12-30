import { Box, BoxProps } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface Props extends BoxProps {
    text?: string;
    is_red?: boolean;
    className?: string;
}

const BotonHome = ({ text, is_red, className, ...rest }: Props) => {
    const colorClassName = `${is_red ? 'red' : ''}`;
    return (
        <Link
            to="/"
            type="button"
            role="button"
            className={`home-button increasing-size-button ${colorClassName} ${className}`}
        >
            <Box p="6px 8px" fontSize="1.2rem" fontWeight="600" {...rest}>
                {' '}
                {text || 'Volver al menú principal'}
            </Box>
        </Link>
    );
};
export default BotonHome;
