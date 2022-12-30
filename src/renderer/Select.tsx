import { ChangeEvent } from 'react';

export interface SelectProps<T extends string> {
    name: string;
    label?: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    choices: readonly T[];
    currentValue: number;
    selectClassName?: string;
}
const SelectWithOptionalLabel = <T extends string>(props: SelectProps<T>) => {
    const { name, label, onChange, choices, currentValue, selectClassName } =
        props;
    return (
        <div className="padding-y-10px">
            {label ? (
                <>
                    <label className="font-size-24" htmlFor={name}>
                        {label}
                    </label>
                    <br />
                </>
            ) : null}

            <select
                name={name}
                className={'color-black ' + (selectClassName || '')}
                value={currentValue}
                onChange={onChange}
            >
                {choices.map((choice: T, index: number) => (
                    <option key={index} value={index}>
                        {choice}
                    </option>
                ))}
            </select>
            <br />
        </div>
    );
};

export default SelectWithOptionalLabel;
