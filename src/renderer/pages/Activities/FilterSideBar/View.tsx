import { ReactNode } from 'react';
import Column from '../../../components/Column';

export const bgColorFilterSideBar = 'rgb(255, 255, 100)';

interface Props {
    children: ReactNode;
}

const FilterSideBarView = ({ children }: Props) => {
    const width = '35%';
    return (
        <Column
            justify="space-between"
            p="20px"
            pt="8px"
            borderRadius="0 0 0 24px"
            color="black"
            bg={bgColorFilterSideBar}
            overflowY="auto"
            w={width}
            minW={width}
            h="98%"
        >
            {children}
        </Column>
    );
};

export default FilterSideBarView;
