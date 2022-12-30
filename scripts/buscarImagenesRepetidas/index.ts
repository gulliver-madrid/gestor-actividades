import { IdImagen } from '../../src/model';
import persistence from '../../src/main/persistence';
import { getRepeated } from './getRepeated';

// Run script: `npx ts-node scripts/buscarImagenesRepetidas`

const main = async () => {
    const res = await persistence.leerActividades();
    if (!res.ok) {
        throw new Error(res.error?.msg);
    }
    const allActivities = res.value;

    const idImagenes: IdImagen[] = [];
    for (const act of allActivities.values) {
        for (const idImagen of act.imagenes) {
            idImagenes.push(idImagen);
        }
    }
    const repeatedImages = await getRepeated(idImagenes);
    if (repeatedImages.length) {
        for (const repeated of repeatedImages) {
            const { idImagen, original } = repeated;
            console.log(`${idImagen} está repetida. Original: ${original}`);
        }
    } else {
        console.log('No hay imágenes repetidas');
    }
};

main();
console.log('Done');
