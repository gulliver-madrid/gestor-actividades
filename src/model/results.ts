import { ReadableMsgForUser } from '.';

type ErrCode = string & { readonly __tag: unique symbol };

interface ErrorObject {
    msg?: string;
    code?: ErrCode;
    readableMsg?: ReadableMsgForUser;
}
type ErrResult = { ok: false; error?: ErrorObject };
type OkVoidResult = {
    ok: true;
};
type OkResult<T> = {
    ok: true;
    value: T;
};

type Result<T> = ErrResult | OkResult<T>;
type VoidResult = ErrResult | OkVoidResult;

interface CreateErrArgs {
    msg?: string;
    code?: ErrCode;
    readableMsg?: ReadableMsgForUser;
}

const createErr = (args?: CreateErrArgs): ErrResult => {
    if (!args) return { ok: false };
    else {
        return {
            ok: false,
            error: {
                msg: args.msg || args.readableMsg,
                code: args.code,
                readableMsg: args.readableMsg,
            },
        };
    }
};

function createOk(): VoidResult;
function createOk<T>(value: T): Result<T>;
function createOk<T>(value?: T) {
    return { ok: true, value };
}
export { createErr, createOk, Result, VoidResult };
