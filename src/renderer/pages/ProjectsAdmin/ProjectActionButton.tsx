import { Box, Text, HStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
    onClick: () => void;
    Icon: ReactNode;
    text: string;
}

const ProjectActionButton = ({ onClick, Icon, text }: Props) => {
    return (
        <Box
            px="8px"
            border="1px solid black"
            borderRadius="8px"
            bg="white"
            color="black"
            _hover={{ bg: 'rgb(255,255,60)' }}
        >
            <button className="py-2px" onClick={onClick}>
                <HStack>
                    {Icon}
                    <Text>{text} </Text>
                </HStack>
            </button>
        </Box>
    );
};

export default ProjectActionButton;
