import { Flex } from '@chakra-ui/react';

import { UsuarioConId, Filters, Project } from '../../../../model';
import { FiltersControl } from '../../../reducers/filtersReducer';
import { NormalButton } from '../../../components/buttons';
import Column from '../../../components/Column';
import { FilterSideBarTitle } from './filterComponents';
import ProjectFilterGroup from './ProjectFilterGroup';
import StatusFilterGroup from './StatusFilterGroup';
import FilterSideBarView from './View';
import ParticipantFilter from './ParticipantFilter';
import ByNameFilter from './ByNameFilter';

interface Props {
    filters: Filters;
    filtersControl: FiltersControl;
    users: UsuarioConId[];
    projects: Project[];
}

const FilterSideBar = ({ filters, filtersControl, users, projects }: Props) => {
    const someFilterActive = someFilterIsActive(filters);
    return (
        <FilterSideBarView>
            <Column justify="space-around">
                <Flex justify="center" minH="max-content !important">
                    <FilterSideBarTitle>Filtros</FilterSideBarTitle>
                </Flex>
                <Column id="grupos-filtros" overflowY="auto" pr="12px">
                    <ByNameFilter
                        searchText={filters.byName}
                        changeSearchText={filtersControl.changeSearchText}
                    />
                    <StatusFilterGroup
                        filters={filters}
                        addStatusFilter={filtersControl.addStatus}
                        removeStatusFilter={filtersControl.removeStatus}
                    />
                    <ParticipantFilter
                        updateParticipant={filtersControl.updateParticipant}
                        users={users}
                        filters={filters}
                    />
                    <ProjectFilterGroup
                        filters={filters}
                        projects={projects}
                        addProjectFilter={filtersControl.addProject}
                        removeProjectFilter={filtersControl.removeProject}
                    />
                </Column>
            </Column>
            {someFilterActive && (
                <NormalButton
                    style={{ backgroundColor: 'DarkOrange', marginTop: '24px' }}
                    onClick={filtersControl.resetFilters}
                >
                    Quitar todos los filtros
                </NormalButton>
            )}
        </FilterSideBarView>
    );
};

const someFilterIsActive = (filters: Filters): boolean => {
    return Boolean(
        filters.byName ||
            filters.projects.length ||
            filters.status.length ||
            filters.user
    );
};

export default FilterSideBar;
