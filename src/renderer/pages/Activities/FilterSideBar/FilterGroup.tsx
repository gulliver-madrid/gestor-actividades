import Column from '../../../components/Column';
import { FilterTitle } from './filterComponents';
import FilterCheckbox from './Checkbox';

interface Props<T> {
    columnId: string;
    title: string;
    addItemFilter: (item: T) => void;
    removeItemFilter: (item: T) => void;
    itemList: readonly T[];
    filteringList: T[];
}

const FilterGroup = <T extends string>({
    columnId,
    title,
    addItemFilter,
    removeItemFilter,
    itemList,
    filteringList,
}: Props<T>) => {
    return (
        <Column id={columnId}>
            <FilterTitle>{title}</FilterTitle>

            <Column border="1px solid #ddd" p="4px" borderRadius="8px">
                {itemList.map((item: T) => {
                    const defaultChecked = filteringList.includes(item);
                    const handleCheck = () => addItemFilter(item);
                    const handleUncheck = () => removeItemFilter(item);
                    return (
                        <FilterCheckbox
                            key={item}
                            defaultChecked={defaultChecked}
                            onCheck={handleCheck}
                            onUncheck={handleUncheck}
                            itemString={item}
                        />
                    );
                })}
            </Column>
        </Column>
    );
};

export default FilterGroup;
