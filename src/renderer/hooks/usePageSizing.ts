import { useState } from 'react';

import { Range } from '../../helpers';
import { INITIAL_PAGE_SIZE } from '../settings';

interface PageSizing {
    currentPage: number;
    pageSize: number;
    displayedRange: Range;
    handlePaginationChange: (newPage: number, newPageSize: number) => void;
    updatePageSize: (newPageSize: number) => void;
    resetPageSizing: () => void;
}

const usePageSizing = (): PageSizing => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(INITIAL_PAGE_SIZE);
    const [displayedRange, setDisplayedRange] = useState<Range>({
        minValue: 0,
        maxValue: pageSize,
    });

    const handlePaginationChange = (newPage: number, newPageSize: number) => {
        const minValue = (newPage - 1) * newPageSize;
        const maxValue = minValue + newPageSize;
        const newRange = { minValue, maxValue };
        setDisplayedRange(newRange);
        setCurrentPage(newPage);
    };

    const updatePageSize = (newPageSize: number) => {
        setPageSize(newPageSize);
        handlePaginationChange(1, newPageSize);
    };
    const resetPageSizing = () => {
        handlePaginationChange(1, pageSize);
    };

    return {
        currentPage,
        pageSize,
        displayedRange,
        handlePaginationChange,
        updatePageSize,
        resetPageSizing,
    };
};
export type { PageSizing };
export default usePageSizing;
