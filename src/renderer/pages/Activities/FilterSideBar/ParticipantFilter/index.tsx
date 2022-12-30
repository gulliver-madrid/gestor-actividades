import { Box } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

import { check } from '../../../../../helpers';
import { userToString, UsuarioConId, Filters } from '../../../../../model';
import Column from '../../../../components/Column';
import { FilterTitle } from '../filterComponents';
import {
    getCurrentIndexUserFilterSelect,
    getUserFromSelectValue,
} from './helpers';
import SelectParticipantFilter from './Select';

const FIRST_OPTION = 'No filtrar por usuario';

interface Props {
    updateParticipant: (user: UsuarioConId | null) => void;
    users: UsuarioConId[];
    filters: Filters;
}

const ParticipantFilter = ({ updateParticipant, users, filters }: Props) => {
    const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const { target } = event;
        const { name: fieldName, value: fieldValue } = target;
        check(
            fieldName === 'participantes',
            `fieldName tiene un valor erróneo: ${fieldName}`
        );
        const user = getUserFromSelectValue(fieldValue, users);
        updateParticipant(user);
    };
    const participantFilterChoices = [FIRST_OPTION, ...users.map(userToString)];
    const currentValue = getCurrentIndexUserFilterSelect(users, filters.user);
    return (
        <Column>
            <FilterTitle>Participante:</FilterTitle>
            <Box pl="12px">
                <SelectParticipantFilter
                    choices={participantFilterChoices}
                    currentValue={currentValue}
                    onChange={handleChangeSelect}
                />
            </Box>
        </Column>
    );
};

export default ParticipantFilter;
