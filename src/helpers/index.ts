interface ObjectWithId<T extends string> {
    id?: T;
}

const findById = <IdType extends string, T extends ObjectWithId<IdType>>(
    lista: T[],
    idBuscado: IdType
): T => {
    const encontrado = lista.find((item: T) => {
        // console.log({ id: act.id, idBuscado });
        return item.id === idBuscado;
    });
    if (!encontrado) {
        throw Error(`No se encontró ningún item con el id ${idBuscado}`);
    }
    return encontrado;
};

function checkIsArray(item: unknown[]) {
    // Runtime check
    if (!Array.isArray(item))
        throw new Error(`It is not an array: ${JSON.stringify({ item })}`);
}

const copy = <T extends object>(obj: T): T => ({ ...obj });

type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T;

function truthy<T>(value: T): value is Truthy<T> {
    return Boolean(value);
}

const isProduction = () => process.env.NODE_ENV === 'production';

const showPossibleBug = (msg?: string) => {
    msg ||= 'Possible bug detected';
    if (!isProduction()) {
        throw new Error(msg);
    }
    console.error(msg);
};

const check = (value: unknown, msg?: string) => {
    if (!value) {
        showPossibleBug(msg);
    }
};

class InvalidState extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidState';
    }
}

const repr = (obj: unknown): string => JSON.stringify(obj);

// @ts-ignore // it is used for allow unused variables
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
const allow = (obj: unknown): void => {};

const deepEqual = (obj1: unknown, obj2: unknown): boolean =>
    JSON.stringify(obj1) === JSON.stringify(obj2);

interface Range {
    minValue: number;
    maxValue: number;
}

const isNotNull = (obj: unknown) => obj !== null;

const parseInteger = (value: string) => parseInt(value, 10);

export type { Range };
export {
    allow,
    check,
    checkIsArray,
    copy,
    deepEqual,
    findById,
    isNotNull,
    isProduction,
    parseInteger,
    repr,
    showPossibleBug,
    truthy,
    InvalidState,
};
