import log4js from 'log4js';
import LoggerWrapper from './loggerWrapper';

log4js.configure({
    appenders: {
        out: { type: 'stdout' },
        errorFile: {
            type: 'file',
            filename: 'logs/errorFile.log',
        },
        infoFile: {
            type: 'file',
            filename: 'logs/infoFile.log',
        },
        warn: {
            type: 'logLevelFilter',
            appender: 'errorFile',
            level: 'warn',
        },
        warnConsole: {
            type: 'logLevelFilter',
            appender: 'out',
            level: 'warn',
        },
    },
    categories: {
        default: {
            appenders: ['warn', 'infoFile', 'warnConsole'],
            level: 'info',
        },
    },
});

const actualLogger = log4js.getLogger();

const logger = new LoggerWrapper(actualLogger);

export { logger };
