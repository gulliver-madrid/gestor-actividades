import {
    leerActividadesRaw,
    leerActividades,
} from '../src/main/persistence/activities';

const main = async () => {
    const actividadesRaw = leerActividadesRaw();
    console.log('\nActividades Raw:');
    console.log(actividadesRaw);
    const activities = leerActividades();
    console.log('\nActividades:');
    console.log(activities);
};
main();
