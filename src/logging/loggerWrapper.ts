import log4js from 'log4js';
import { isProduction } from '../helpers';

class LoggerWrapper {
    private logger: log4js.Logger;
    private isDevelopment: boolean;

    constructor(logger: log4js.Logger) {
        this.logger = logger;
        this.isDevelopment = !isProduction();
    }

    debug(message: string) {
        if (this.isDevelopment) {
            this.logger.debug(message);
        }
    }

    info(message: string) {
        if (this.isDevelopment) {
            this.logger.info(message);
        }
    }

    warn(message: string) {
        if (this.isDevelopment) {
            this.logger.warn(message);
        }
    }

    error(message: string) {
        if (this.isDevelopment) {
            this.logger.error(message);
        }
    }
}

export default LoggerWrapper;
