import { useState } from 'react';
import { pedirJSON } from '../lib/api';
import styles from './ModalReporte.module.css';

const MOTIVOS = [
    { valor: 'inapropiado', texto: 'Contenido inapropiado u ofensivo' },
    { valor: 'spam', texto: 'Spam o publicidad' },
    { valor: 'peligroso', texto: 'Instrucciones peligrosas' },
    { valor: 'plagio', texto: 'Plagio o contenido robado' },
    { valor: 'otro', texto: 'Otro' },
];

export default function ModalReporte({ idCreacion, onCerrar }) {
    const [motivo, setMotivo] = useState('');
    const [detalle, setDetalle] = useState('');
    const [error, setError] = useState('');
    const [enviando, setEnviando] = useState(false);
    const [enviado, setEnviado] = useState(false);

    const enviar = async (e) => {
        e.preventDefault();
        setError('');

        const guardado = localStorage.getItem('usuario');
        if (!guardado) {
            setError('Inicia sesión para poder reportar.');
            return;
        }
        const usuario = JSON.parse(guardado);

        setEnviando(true);
        try {
            await pedirJSON(`/creaciones/${idCreacion}/reportes`, {
                method: 'POST',
                body: JSON.stringify({
                    id_usuario: usuario.id_usuario ?? usuario.id,
                    motivo,
                    detalle,
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
                {enviado ? (
                    <>
                        <h2>Reporte enviado</h2>
                        <p>Gracias. El equipo de verificación lo revisará.</p>
                        <button type='button' className={styles.botonEnviar} onClick={onCerrar}>Cerrar</button>
                    </>
                ) : (
                    <form onSubmit={enviar}>
                        <h2>Reportar creación</h2>
                        {error && <p className={styles.error}>{error}</p>}

                        <label htmlFor='motivo-reporte'>Motivo</label>
                        <select
                            id='motivo-reporte'
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                            required
                        >
                            <option value=''>Selecciona un motivo</option>
                            {MOTIVOS.map((m) => (
                                <option key={m.valor} value={m.valor}>{m.texto}</option>
                            ))}
                        </select>

                        <label htmlFor='detalle-reporte'>¿Qué es lo que incumple?</label>
                        <textarea
                            id='detalle-reporte'
                            value={detalle}
                            onChange={(e) => setDetalle(e.target.value)}
                            minLength={10}
                            maxLength={300}
                            required
                        />

                        <div className={styles.botones}>
                            <button type='button' className={styles.botonCancelar} onClick={onCerrar}>Cancelar</button>
                            <button type='submit' className={styles.botonEnviar} disabled={enviando}>
                                {enviando ? 'Enviando...' : 'Reportar'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}