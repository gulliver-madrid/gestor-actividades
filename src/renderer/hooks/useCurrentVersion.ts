import { useEffect, useState } from 'react';

import actions from '../actions/actions';

const useCurrentVersion = (): string | undefined => {
    const [version, setVersion] = useState<string | undefined>(undefined);
    useEffect(() => {
        const updateVersion = async () => {
            const v = await actions.getVersion();
            setVersion(v);
        };

        updateVersion();
    }, []);
    return version;
};

export default useCurrentVersion;
