import { ChangeEvent } from 'react';
import { Flex } from '@chakra-ui/react';

interface Props {
    defaultChecked: boolean;
    onCheck: () => void;
    onUncheck: () => void;
    itemString: string;
}

const FilterCheckbox = ({
    defaultChecked,
    onCheck,
    onUncheck,
    itemString,
}: Props) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const { checked } = target;
        if (checked) onCheck();
        else onUncheck();
    };

    const checkboxId = createCheckboxId(itemString);
    return (
        <Flex fontSize="16px" flexShrink={0} align="baseline">
            <input
                type="checkbox"
                id={checkboxId}
                className="checkbox-filter"
                name={itemString}
                value={itemString}
                defaultChecked={defaultChecked}
                onChange={handleChange}
            />
            <label htmlFor={checkboxId} className="label-checkbox-filter">
                {itemString}
            </label>
        </Flex>
    );
};

const createCheckboxId = (value: string) => 'checkbox-' + value;

export default FilterCheckbox;
