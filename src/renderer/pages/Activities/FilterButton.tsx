import { GrClose, GrFilter } from 'react-icons/gr';
import { Text, VStack } from '@chakra-ui/react';
import styled from 'styled-components';

import { bgColorFilterSideBar } from './FilterSideBar/View';
import { Dispatch, SetStateAction } from 'react';

interface Props {
    showingFilters: boolean;
    setShowingFilters: Dispatch<SetStateAction<boolean>>;
}

const FilterActivitiesButton = ({
    showingFilters,
    setShowingFilters,
}: Props) => {
    const filterButtonText =
        (showingFilters ? 'Ocultar ' : 'Mostrar ') + 'filtros';
    return (
        <FilterButton
            className="filter-button"
            onClick={() => setShowingFilters((prev) => !prev)}
        >
            <VStack>
                {showingFilters ? (
                    <GrClose size="2em" />
                ) : (
                    <GrFilter size="2em" />
                )}
                <Text
                    width="4em"
                    fontSize="0.8em"
                    lineHeight="1em"
                    className="margin-top-0"
                >
                    {filterButtonText}
                </Text>
            </VStack>
        </FilterButton>
    );
};
const FilterButton = styled.button`
    background-color: ${bgColorFilterSideBar};
    color: black;
    margin: 0 0 5px 40px;
    font-size: 1rem;
    padding: 8px 12px 6px 14px;
    border-radius: 24px 0 0 24px;
`;
export default FilterActivitiesButton;
