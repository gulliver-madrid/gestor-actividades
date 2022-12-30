import { Button, ButtonProps } from '@chakra-ui/react';

const NormalButton = (props: ButtonProps) => {
    const { className, children, ...rest } = props;
    const userClassNames = className || '';
    const allClassNames = [
        'normal-button increasing-size-button',
        userClassNames,
    ].join(' ');
    return (
        <Button
            className={allClassNames}
            type="button"
            m="5px"
            bg="white"
            color="black"
            borderRadius="10px"
            fontSize="1.2rem"
            {...rest}
        >
            {children}
        </Button>
    );
};

export default NormalButton;
