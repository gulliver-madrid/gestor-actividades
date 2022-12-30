import { HTMLProps } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

interface Props extends HTMLProps<HTMLInputElement> {
    boxProps?: BoxProps;
    extraClassName?: string;
}

const TextInput = ({ name, boxProps, extraClassName, ...rest }: Props) => (
    <Box color="black" {...boxProps}>
        <input
            className={
                'small-padding' + (extraClassName ? ' ' + extraClassName : '')
            }
            type="text"
            name={name}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
        />
    </Box>
);
export default TextInput;
