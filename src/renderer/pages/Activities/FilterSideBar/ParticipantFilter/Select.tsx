import { Box } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

interface Props {
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    choices: readonly string[];
    currentValue: number;
}

const SelectParticipantFilter = (props: Props) => {
    const { onChange, choices, currentValue } = props;
    return (
        <Box>
            <select
                name="participantes"
                className="color-black select-filter-by-user"
                value={currentValue}
                onChange={onChange}
            >
                {choices.map((choice: string, index: number) => (
                    <option key={index} value={index}>
                        {choice}
                    </option>
                ))}
            </select>
            <br />
        </Box>
    );
};

export default SelectParticipantFilter;
