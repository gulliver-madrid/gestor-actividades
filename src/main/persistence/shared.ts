import path from 'path';
import {
    actividadesFilename,
    nombreDir,
    usuariosFilename,
    proyectosFilename,
} from '../paths';
import { isProduction } from '../../helpers';

const convertirAJSON = (obj: object) => JSON.stringify(obj, null, 4);

const datadirName = isProduction() ? 'data' : 'dev-gestor-actividades-data';

const appdataDir = process.env.APPDATA;
if (!appdataDir) {
    throw new Error('App data directory not defined');
}
const datadir = path.join(appdataDir, nombreDir, datadirName);
const dataPathActividades = `${datadir}/${actividadesFilename}`;
const dataPathUsuarios = `${datadir}/${usuariosFilename}`;
const dataPathProyectos = `${datadir}/${proyectosFilename}`;

export {
    dataPathActividades,
    dataPathProyectos,
    dataPathUsuarios,
    datadir,
    convertirAJSON,
};
