import { BoxProps } from '@chakra-ui/react';
import colors from '../colors';
import Column from '../components/Column';

const FormPage = ({ children }: BoxProps) => {
    return (
        <Column
            flexGrow={1}
            p="20px"
            pl="32px"
            overflowY="auto"
            bg={colors.bgSoft}
        >
            {children}
        </Column>
    );
};

export default FormPage;
