import { useRef } from 'react';

interface RefList<T> {
    extractAll: () => T[];
    clear: () => void;
    add: (idImage: T) => void;
    remove: (toRemove: T) => void;
}

/** Crea una referencia mutable de elementos. Deben ser eliminables por valor
 */
const useRefList = <T>(): RefList<T> => {
    const ref = useRef<T[]>([]);
    const extractAll = (): T[] => {
        const content = ref.current;
        clear();
        return content;
    };
    const clear = (): void => {
        ref.current = [];
    };
    const add = (item: T): void => {
        ref.current.push(item);
    };
    const remove = (toRemove: T): void => {
        ref.current = ref.current.filter((item) => item !== toRemove);
    };
    return { extractAll, clear, add, remove };
};

export default useRefList;
