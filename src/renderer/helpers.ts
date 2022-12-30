import { ReadableMsgForUser } from '../model';

type MsgOrNull = string | null;

type SetAlertMsg = (msg: ReadableMsgForUser | null, ms?: number) => void;
type SetSuccessMsg = (msg: string | null, ms?: number) => void;

export { MsgOrNull, SetAlertMsg, SetSuccessMsg };
