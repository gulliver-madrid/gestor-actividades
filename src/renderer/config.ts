const debugBg = (color: string, force?: boolean) =>
    ((config.debugLayout || force) && color) || undefined;

const config = {
    debugLayout: 0,
    showDevHint: 1,
};

export { debugBg };
export default config;
