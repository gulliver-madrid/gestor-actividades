import { Box } from '@chakra-ui/react';

interface Props {
    children: React.ReactNode;
}

const BotonesInferiores = ({ children }: Props) => (
    <Box className="bottom" flexShrink={0}>
        {children}
    </Box>
);

export default BotonesInferiores;
