function isString(obj: unknown): obj is string {
    return typeof obj === 'string';
}

function isNumber(obj: unknown): obj is number {
    return typeof obj === 'number';
}

function isBoolean(obj: unknown): obj is boolean {
    return typeof obj === 'boolean';
}

function isStringNotEmpty(obj: unknown): obj is string {
    return isString(obj) && obj.length > 0;
}

export { isString, isStringNotEmpty, isNumber, isBoolean };
