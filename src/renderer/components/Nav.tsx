import { Box } from '@chakra-ui/layout';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    path: PathText[];
}

export const PATH_NAMES = {
    HOME: 'Menú principal',
    ACTIVITIES: 'Actividades',
    PROJECTS: 'Proyectos',
    USERS: 'Usuarios',
    ADD_ACTIVITY: 'Añadir actividad',
    ADD_USER: 'Añadir usuario',
    MODIFY_ACTIVITY: 'Modificar actividad',
    MODIFY_USER: 'Modificar usuario',
} as const;

type ValueOf<T> = T[keyof T];
export type PathText = ValueOf<typeof PATH_NAMES>;

const paths = new Map<PathText, string>([
    [PATH_NAMES.HOME, '/'],
    [PATH_NAMES.ACTIVITIES, 'activities/'],
    [PATH_NAMES.USERS, 'users/'],
]);

const Nav = (props: Props) => (
    <Box className="breadcrum" flexShrink={0}>
        <p>
            {props.path.map((name, index) => {
                const isLast = index >= props.path.length - 1;
                const key = name + index;
                return (
                    <Fragment key={key}>
                        {isLast ? (
                            <span>{name}</span>
                        ) : (
                            <Link
                                to={paths.get(name) || '/'}
                                type="button"
                                role="button"
                                className="underline-on-hover"
                            >
                                {name}
                            </Link>
                        )}
                        {isLast ? '' : ' > '}
                    </Fragment>
                );
            })}
        </p>
    </Box>
);

export default Nav;
