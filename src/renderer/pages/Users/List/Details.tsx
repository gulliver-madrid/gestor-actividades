import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

import { UsuarioNumerado } from '../../../../model';
import NormalButton from '../../../components/buttons/NormalButton';

interface Props {
    usuarioNum: UsuarioNumerado;
    isOpen: boolean;
    onClickDetail: (numUsuario: number) => (event: SyntheticEvent) => void;
    modalDeleteOnOpen: () => void;
}

const DetailsUsuario = ({
    isOpen,
    usuarioNum,
    onClickDetail,
    modalDeleteOnOpen,
}: Props) => {
    const user = usuarioNum.usuario;
    const numStr = usuarioNum.numUsuario.toString() + '. ';
    return (
        <details
            className={isOpen ? 'usuario-opened' : 'usuario-not-opened'}
            style={styles.usuario}
            onClick={onClickDetail(usuarioNum.numUsuario)}
            open={isOpen}
        >
            <summary>
                <strong>{numStr + user.nombre + ' ' + user.apellidos}</strong>
            </summary>
            {isOpen ? (
                <>
                    <Link to={`../modify-user/${user.id}`}>
                        <NormalButton>Modificar</NormalButton>
                    </Link>
                    <NormalButton
                        className="red"
                        onClick={(event) => {
                            event.stopPropagation();
                            modalDeleteOnOpen();
                        }}
                    >
                        Eliminar
                    </NormalButton>
                </>
            ) : null}
        </details>
    );
};

const styles = {
    usuario: {
        margin: '20px',
    },
};
export default DetailsUsuario;
