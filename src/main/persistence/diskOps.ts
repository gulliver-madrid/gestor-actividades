import fsPromises from 'fs/promises';

import { createErr, createOk, Result, VoidResult } from '../../model';
import { repr } from '../../helpers';
import { logger } from '../../logging';

async function readFileAsync(filepath: string): Promise<Result<string>> {
    let data;
    try {
        data = await fsPromises.readFile(filepath, {
            encoding: 'utf8',
            flag: 'r',
        });

        logger.info(`Leyendo ${data} desde ${filepath}`);
    } catch (err) {
        logger.error(repr(err));
        return createErr({ msg: repr(err) });
    }
    return createOk(data);
}

const writeInDiskAsync = async (
    content: string,
    filepath: string
): Promise<VoidResult> => {
    let result: VoidResult;
    try {
        await fsPromises.writeFile(filepath, content);
        logger.info(`Datos guardados exitosamente en ${filepath}`);
        result = createOk();
    } catch (err) {
        logger.error(repr(err));
        result = createErr({
            msg: `No se pudieron guardar los datos en ${filepath}`,
        });
    }
    return result;
};

const makeDirIfDoesntExist = async (dir: string): Promise<void> => {
    try {
        await fsPromises.mkdir(dir);
    } catch (err: any) {
        if (err?.code !== 'EEXIST') {
            throw err;
        }
    }
};

class DiskWorks {
    // A flag to avoid concurrent disk operations
    in_use: string[];

    constructor() {
        this.in_use = [];
    }
    async readFile(filepath: string): Promise<Result<string>> {
        if (this.in_use.includes(filepath)) {
            return createErr({
                msg: `Can't read ${filepath}. Disk in use.`,
            });
        }
        return readFileAsync(filepath);
    }

    async makeDirIfDoesntExist(dir: string): Promise<VoidResult> {
        const res = await makeDirIfDoesntExist(dir);
        return createOk(res);
    }

    async writeInDisk(content: string, filepath: string): Promise<VoidResult> {
        if (this.in_use.includes(filepath)) {
            return createErr({
                msg: `Can't write in ${filepath}. Disk in use.`,
            });
        }
        this.in_use.push(filepath);
        const res = await writeInDiskAsync(content, filepath);
        this.in_use = this.in_use.filter((s) => s !== filepath);
        if (!res.ok) {
            return res;
        }
        const ok: VoidResult = createOk(res);
        // console.log(repr(ok));
        return ok;
    }
}

let diskWorks = new DiskWorks();

export { diskWorks };
