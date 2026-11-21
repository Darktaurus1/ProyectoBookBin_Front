import { useState } from 'react';
import Link from 'next/link';
import ModalReporte from './ModalReporte';
import ModalEliminacion from './ModalEliminacion';
import styles from './TarjetaCreacion.module.css';

export default function TarjetaCreacion({ creacion, onGuardar, guardado = false }) {
    const id = creacion.id_creacion ?? creacion.id;
    const materialesTexto = Array.isArray(creacion.materiales)
        ? creacion.materiales.map((m) => `#${m.nombre || m}`).join(' ')
        : creacion.materiales || '#Material';

    const [menuAbierto, setMenuAbierto] = useState(false);
    const [reportando, setReportando] = useState(false);
    const [eliminando, setEliminando] = useState(false);

    return (
        <article className={styles.tarjeta}>
            <div className={styles.imagenCaja}>
                {creacion.imagen ? (
                    <img
                        src={creacion.imagen.startsWith('http') ? creacion.imagen : `http://localhost:4000${creacion.imagen}`}
                        alt=""
                    />
                ) : (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="#6B8797" aria-hidden="true">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                    </svg>
                )}
            </div>

            {/* Guardar y tres puntitos, encima de la imagen */}
            <div className={styles.acciones}>
                <button
                    type="button"
                    className={styles.botonIcono}
                    title={guardado ? 'Quitar de guardados' : 'Guardar creación'}
                    aria-label={guardado ? 'Quitar de guardados' : 'Guardar creación'}
                    onClick={() => onGuardar && onGuardar(id)}
                >
                    <svg
                        width="18"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={guardado ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                    >
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                </button>

                <button
                    type="button"
                    className={styles.botonIcono}
                    title="Más opciones"
                    aria-label="Más opciones"
                    aria-expanded={menuAbierto}
                    onClick={() => setMenuAbierto(!menuAbierto)}
                >
                    ⋮
                </button>

                {menuAbierto && (
                    <div className={styles.menuOpciones}>
                        <button
                            type="button"
                            onClick={() => {
                                setMenuAbierto(false);
                                setReportando(true);
                            }}
                        >
                            Reportar
                        </button>
                        {creacion.id_usuario === (JSON.parse(localStorage.getItem('usuario'))?.id_usuario ?? JSON.parse(localStorage.getItem('usuario'))?.id) && (
                            <button
                                type="button"
                                onClick={() => {
                                    setMenuAbierto(false);
                                    setEliminando(true);
                                }}
                            >
                                Eliminar
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className={styles.contenido}>
                {/* El enlace del título cubre toda la tarjeta: clic en cualquier parte abre el detalle */}
                <Link href={`/creaciones/${id}`} className={styles.titulo}>
                    {creacion.nombre}
                </Link>
                <p className={styles.materiales}>{materialesTexto}</p>
                <p className={styles.descripcion}>{creacion.descripcion}</p>
            </div>

            {reportando && (
                <ModalReporte idCreacion={id} onCerrar={() => setReportando(false)} />
            )}
            {eliminando && (
                <ModalEliminacion idCreacion={id} onCerrar={() => setEliminando(false)} />
            )}
        </article>
    );
}