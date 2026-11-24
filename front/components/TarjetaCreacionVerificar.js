import Link from 'next/link';
import styles from './TarjetaCreacion.module.css';
import estilosVerif from '../pages/verificador/verificador.module.css';

function urlImagen(imagen) {
    if (!imagen) return null;
    return imagen.startsWith('http') ? imagen : `http://localhost:4000${imagen}`;
}

// Tarjeta del verificador. Tiene dos modos:
//  - seleccionable (inicio): clic en la tarjeta la marca o desmarca
//  - normal (Por verificar): clic abre la página de verificación; botón "Soltar" opcional
export default function TarjetaCreacionVerificar({
    creacion,
    seleccionable = false,
    seleccionada = false,
    onAlternar,
    onSoltar,
}) {
    const id = creacion.id_creacion ?? creacion.id;
    const imagen = urlImagen(creacion.imagen);
    const materialesTexto = Array.isArray(creacion.materiales)
        ? creacion.materiales.map((m) => `#${m.nombre || m}`).join(' ')
        : creacion.materiales || '';
    const rechazos = Number(creacion.veces_rechazada) || 0;

    const clases = [
        styles.tarjeta,
        seleccionable ? estilosVerif.tarjetaSeleccionable : '',
        seleccionada ? estilosVerif.tarjetaSeleccionada : '',
    ].join(' ');

    return (
        <article className={clases}>
            {seleccionable && (
                <span className={estilosVerif.marca} aria-hidden="true">
                    {seleccionada ? '✓' : ''}
                </span>
            )}

            <div className={styles.imagenCaja}>
                {imagen ? (
                    <img src={imagen} alt="" />
                ) : (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="#6B8797" aria-hidden="true">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                    </svg>
                )}
            </div>

            <div className={styles.contenido}>
                {seleccionable ? (
                    // Botón que cubre toda la tarjeta (mismo truco que el enlace del título)
                    <button
                        type="button"
                        className={`${styles.titulo} ${estilosVerif.botonTarjeta}`}
                        aria-pressed={seleccionada}
                        onClick={() => onAlternar(id)}
                    >
                        {creacion.nombre}
                    </button>
                ) : (
                    <Link href={`/verificador/verificar?id=${id}`} className={styles.titulo}>
                        {creacion.nombre}
                    </Link>
                )}

                {creacion.musuarios?.nombre && (
                    <p className={estilosVerif.reportero}>De {creacion.musuarios.nombre}</p>
                )}

                {rechazos > 0 && (
                    <div className={estilosVerif.etiquetas}>
                        <span className={estilosVerif.etiquetaRechazo}>
                            Rechazada antes{rechazos > 1 ? ` (${rechazos} veces)` : ''}
                        </span>
                        <span className={creacion.corregida === 1 ? estilosVerif.etiquetaCorregida : estilosVerif.etiquetaSinCorregir}>
                            {creacion.corregida === 1 ? 'Corregida' : 'Sin corregir'}
                        </span>
                    </div>
                )}
                {materialesTexto && <p className={styles.materiales}>{materialesTexto}</p>}
                <p className={styles.descripcion}>{creacion.descripcion}</p>

                {onSoltar && (
                    <button type="button" className={estilosVerif.botonSoltar} onClick={() => onSoltar(id)}>
                        Soltar
                    </button>
                )}
            </div>
        </article>
    );
}
