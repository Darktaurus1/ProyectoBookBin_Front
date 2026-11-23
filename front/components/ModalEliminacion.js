import { useState } from 'react';
import { pedirJSON } from '../lib/api';
import styles from './ModalReporte.module.css';

export default function ModalEliminacion({ idCreacion, onCerrar }) {
    const [error, setError] = useState('');
    const [enviando, setEnviando] = useState(false);

    const enviar = async (e) => {
        e.preventDefault();
        setError('');

        const guardado = localStorage.getItem('usuario');
        if (!guardado) {
            setError('Inicia sesión para poder Eliminar.');
            return;
        }
        const usuario = JSON.parse(guardado);

        setEnviando(true);
        try {
            await pedirJSON(`/creaciones/${idCreacion}`, {
                method: 'DELETE',
                body: JSON.stringify({
                    id_usuario: usuario.id_usuario ?? usuario.id
                }),
            });
            setEnviado(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className={styles.fondo} onClick={onCerrar}>
            <div className={styles.caja} onClick={(e) => e.stopPropagation()}>
                <form onSubmit={enviar}>
                    <h2>¿Estas seguro de eliminar esta creación?</h2>
                    {error && <p className={styles.error}>{error}</p>}
                    <label>Nadie podra acceder a esta creación una vez eliminada.</label>
                    <div className={styles.botones}>
                        <button type='button' className={styles.botonCancelar} onClick={onCerrar}>Cancelar</button>
                        <button type='submit' className={styles.botonEnviar} disabled={enviando}>
                            {enviando ? 'Eliminando...' : 'Eliminar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}