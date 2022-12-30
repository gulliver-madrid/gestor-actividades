import { ReadableMsgForUser } from '../../model';
import { MsgOrNull } from '../helpers';

interface NotificationsObject {
    alertMsg: ReadableMsgForUser | null;
    successMsg: MsgOrNull;
}
interface Props {
    notifications: NotificationsObject;
}

const Notifications = ({ notifications }: Props) => {
    const { alertMsg, successMsg } = notifications;
    return (
        <>
            {alertMsg && <div className="notify error">{alertMsg}</div>}
            {successMsg && <div className="notify success">{successMsg}</div>}
        </>
    );
};

export type { NotificationsObject };
export default Notifications;
