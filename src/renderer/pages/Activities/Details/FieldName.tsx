import { HTMLAttributes } from 'react';

const FieldName = ({ children }: HTMLAttributes<HTMLSpanElement>) => (
    <span>
        <strong>{children}</strong>
    </span>
);

export default FieldName;
