import { Updater } from '../model';

const updateObject = <T, K extends keyof T>(obj: T, key: K, value: T[K]): T => {
    return {
        ...obj,
        [key]: value,
    };
};

/**
 * Devuelve una funcion que recibe una clave K y un valor V y devuelve un Updater
 * que permite generar a partir de cualquier objeto T un objeto similar, pero con la propiedad K
 * establecida en V.
 * Por ejemplo, si T es Actividad, se devuelve una funcion que crea un Updater de Actividad
 * Un Updater es una funcion que se le puede pasar a un setState, es decir, describe una transformacion
 * del objeto T en otro objeto T
 */
const createMetaUpdater = <T>() => {
    const createUpdater = <K extends keyof T>(
        key: K,
        value: T[K]
    ): Updater<T> => {
        return (obj: T) => updateObject(obj, key, value);
    };
    return createUpdater;
};

// Test:
// interface Book {
//     title: string;
//     pages: number;
// }
// const createUpdater = createMetaUpdater<Book>();
// const badUpdater = createUpdater('title', 5); // should fail
// const goodUpdater = createUpdater('title', 'Pride & Prejudice'); // should be ok

// eslint-disable-next-line import/prefer-default-export
export { updateObject, createMetaUpdater };
