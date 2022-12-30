import { Box, Flex } from '@chakra-ui/react';

import useActivityForm, {
    ActivityFormArgs,
    DESCRIPTION_FIELD,
    PROJECT_FIELD,
    STATUS_FIELD,
    TITLE_FIELD,
} from '../../../hooks/useActivityForm';
import { posiblesStatus, statusDefault } from '../../../../model';
import SelectWithOptionalLabel from '../../../Select';
import TextInput from '../TextInput';
import AreaParticipantes from './AreaParticipantes';
import ImagesBox from './ImagesBox';

type FormularioProps = ActivityFormArgs;

const FormularioActividad = ({
    data,
    setActivity,
    sendActivity,
    notifications,
}: FormularioProps) => {
    const {
        initialStateOfActivity,
        activity,
        users,
        projectsTextsForSelect,
        currentValueProjectsSelect,
        images,
        changeHandler,
        handleSubmit,
    } = useActivityForm({ data, setActivity, sendActivity, notifications });
    return (
        <Box>
            <form id="activity-form" onSubmit={handleSubmit}>
                <Flex justify="space-between" maxH="none" pb="60px">
                    <Box w="45%" h="fit-content">
                        <Box className="padding-y-10px">
                            <label
                                className="font-size-24"
                                htmlFor={TITLE_FIELD}
                            >
                                Título de la actividad *
                            </label>
                            <br />
                            <TextInput
                                name={TITLE_FIELD}
                                value={activity.titulo}
                                onChange={changeHandler.handleChangeInput}
                            />
                            <br />
                        </Box>

                        <Box className="padding-y-10px">
                            <label
                                className="font-size-24"
                                htmlFor={DESCRIPTION_FIELD}
                            >
                                Descripción
                            </label>
                            <br />
                            <textarea
                                className="description-input color-black small-padding"
                                name={DESCRIPTION_FIELD}
                                value={activity.descripcion}
                                onChange={changeHandler.handleTextareaChange}
                            />
                            <br />
                        </Box>
                        <AreaParticipantes
                            users={users}
                            participantes={activity.participantes}
                            updateParticipantes={
                                changeHandler.updateParticipantes
                            }
                        />
                    </Box>
                    <Box w="45%">
                        <SelectWithOptionalLabel
                            name={PROJECT_FIELD}
                            label="Proyecto *"
                            choices={projectsTextsForSelect}
                            currentValue={currentValueProjectsSelect}
                            onChange={changeHandler.handleChangeSelect}
                        />
                        <Box pt="40px">
                            <SelectWithOptionalLabel
                                name={STATUS_FIELD}
                                label="Status *"
                                choices={posiblesStatus}
                                currentValue={posiblesStatus.indexOf(
                                    activity.status || statusDefault
                                )}
                                onChange={changeHandler.handleChangeSelect}
                            />
                        </Box>
                        <ImagesBox
                            pt="40px"
                            images={images}
                            setActivity={setActivity}
                            activity={activity}
                            initialStateOfActivity={initialStateOfActivity}
                        />
                    </Box>
                </Flex>
            </form>
        </Box>
    );
};

export default FormularioActividad;
