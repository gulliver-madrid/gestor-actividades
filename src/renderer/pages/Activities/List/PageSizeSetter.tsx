import { Box } from '@chakra-ui/react';
import { useState } from 'react';

import { parseInteger } from '../../../../helpers';
import { MAX_PAGE_SIZE, MIN_PAGE_SIZE } from '../../../settings';

interface Props {
    pageSize: number;
    updatePageSize: (newPageSize: number) => void;
}

const PageSizeSetter = ({ updatePageSize, pageSize }: Props) => {
    const [inputPageSize, setInputPageSize] = useState(pageSize);
    const handleConfirm = () => {
        let newValue = inputPageSize;
        if (newValue < MIN_PAGE_SIZE) {
            newValue = MIN_PAGE_SIZE;
            setInputPageSize(newValue);
        }
        updatePageSize(newValue);
    };

    return (
        <Box className="page-size-setter" flexShrink={1}>
            Actividades por página:{' '}
            <input
                type="text"
                className="color-black"
                value={inputPageSize}
                onChange={(ev) => {
                    let v = parseInteger(ev.target.value);
                    v = clampInputPageSize(v);
                    setInputPageSize(v);
                }}
                onBlur={handleConfirm}
                onKeyUp={(ev) => {
                    if (ev.key === 'Enter') handleConfirm();
                }}
            />{' '}
        </Box>
    );
};

const clampInputPageSize = (v: number) => {
    if (v < 0 || isNaN(v)) {
        return 0;
    }
    if (v > MAX_PAGE_SIZE) {
        return MAX_PAGE_SIZE;
    }
    return v;
};

export default PageSizeSetter;
