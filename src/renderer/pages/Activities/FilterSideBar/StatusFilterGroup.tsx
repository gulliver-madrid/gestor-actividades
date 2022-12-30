import { Filters, posiblesStatus, Status } from '../../../../model';
import FilterGroup from './FilterGroup';

interface Props {
    filters: Filters;
    addStatusFilter: (status: Status) => void;
    removeStatusFilter: (status: Status) => void;
}

const StatusFilterGroup = ({
    filters,
    addStatusFilter,
    removeStatusFilter,
}: Props) => {
    return (
        <FilterGroup
            columnId="filtros-status"
            title="Status"
            addItemFilter={addStatusFilter}
            removeItemFilter={removeStatusFilter}
            itemList={posiblesStatus}
            filteringList={filters.status}
        />
    );
};

export default StatusFilterGroup;
