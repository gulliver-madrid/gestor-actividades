import { Box } from '@chakra-ui/react';
import TextInput from '../../../components/forms/TextInput';

import Column from '../../../components/Column';
import { FilterTitle } from './filterComponents';
import { ChangeEvent } from 'react';

interface Props {
    searchText: string;
    changeSearchText: (newText: string) => void;
}

const ByNameFilter = ({ searchText, changeSearchText }: Props) => {
    const searchByNameId = 'search-by-name-input';
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        changeSearchText(event.target.value);
    };
    return (
        <Column>
            <FilterTitle>Texto en el título:</FilterTitle>
            <Box pl="12px">
                <TextInput
                    id={searchByNameId}
                    boxProps={{ ml: '2rem', bg: 'orange' }}
                    name={searchByNameId}
                    value={searchText}
                    onChange={handleChange}
                    extraClassName="full-width search-filter"
                    autoFocus
                />
            </Box>
        </Column>
    );
};

export default ByNameFilter;
