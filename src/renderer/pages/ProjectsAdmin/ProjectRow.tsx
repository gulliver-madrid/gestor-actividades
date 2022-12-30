import { Flex, Text } from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';

import { Project } from '../../../model';
import ProjectActionButton from './ProjectActionButton';

interface Props {
    handleClickRename: () => void;
    onClickRemove: () => void;
    project: Project;
    hovered: boolean;
}

const ProjectRow = ({
    project: project,
    handleClickRename,
    onClickRemove: handleClickRemove,
    hovered,
}: Props) => {
    return (
        <Flex
            px="8px"
            py="4px"
            bg={hovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0)'}
            justify="space-between"
        >
            <Text mr="2vh" py="4px" minW="30%">
                {project.name}
            </Text>
            <Flex>
                {' '}
                {hovered && (
                    <>
                        <ProjectActionButton
                            onClick={handleClickRename}
                            Icon={<AiFillEdit />}
                            text="Renombrar"
                        />

                        <Text w="2vh"></Text>
                        <ProjectActionButton
                            onClick={handleClickRemove}
                            Icon={<BsTrash />}
                            text="Eliminar"
                        />
                    </>
                )}
            </Flex>
        </Flex>
    );
};

export default ProjectRow;
