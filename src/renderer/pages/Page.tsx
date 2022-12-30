import { FlexProps } from '@chakra-ui/react';

import { RENDER_BREADCRUMS } from '../settings';
import Column from '../components/Column';
import Nav, { PathText } from '../components/Nav';

interface Props extends FlexProps {
    breadcrumb: PathText[];
}

const Page = ({ breadcrumb, children, ...rest }: Props) => {
    return (
        <Column h="100%" maxH="100%" justify="space-between" {...rest}>
            {RENDER_BREADCRUMS ? <Nav path={breadcrumb} /> : null}
            {children}
        </Column>
    );
};

export default Page;
