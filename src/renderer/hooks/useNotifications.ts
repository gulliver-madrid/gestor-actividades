import { useState } from 'react';

import { asReadable, ReadableMsgForUser, VoidResult } from '../../model';
import { NotificationsObject } from '../components/Notifications';
import { MsgOrNull, SetAlertMsg, SetSuccessMsg } from '../helpers';

const DEFAULT_TIMEOUT = 10_000;

const useNotifications = (): FullNotificationsObject => {
    const [alertMsg, setAlertMsg] = useState<ReadableMsgForUser | null>(null);
    const [successMsg, setSuccessMsg] = useState<MsgOrNull>(null);
    const updateSuccessMsg = (msg: string | null, ms?: number): void => {
        setSuccessMsg(msg);
        if (msg === null) return;
        if (!ms) {
            ms = DEFAULT_TIMEOUT;
        }
        setTimeout(() => setSuccessMsg(null), ms);
    };
    const updateAlertMsg = (msg: ReadableMsgForUser | null, ms?: number) => {
        setAlertMsg(msg);
        if (msg === null) return;
        if (!ms) {
            ms = DEFAULT_TIMEOUT;
        }
        setTimeout(() => setAlertMsg(null), ms);
    };
    const notifyResult = (
        result: VoidResult,
        successMsg: string,
        timeout?: number
    ) => {
        if (result.ok) {
            updateSuccessMsg(successMsg, timeout);
        } else {
            const errMsg = result.error?.msg;
            console.error(errMsg || 'Error desconocido');
            updateAlertMsg(
                result.error?.readableMsg || asReadable('Error desconocido'),
                timeout
            );
        }
    };
    const clear = (): void => {
        setSuccessMsg(null);
        setAlertMsg(null);
    };
    const notifications = {
        alertMsg,
        setAlertMsg: updateAlertMsg,
        successMsg,
        setSuccessMsg: updateSuccessMsg,
        notifyResult,
        clear,
    };
    return notifications;
};

interface NotificationsSetterObject {
    setAlertMsg: SetAlertMsg;
    setSuccessMsg: SetSuccessMsg;
    clear: () => void;
}

type FullNotificationsObject = NotificationsSetterObject &
    NotificationsObject & {
        notifyResult: (
            result: VoidResult,
            successMsg: string,
            timeout?: number
        ) => void;
    };

export type { NotificationsSetterObject, FullNotificationsObject };
export default useNotifications;
