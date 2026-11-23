import Link from 'next/link';
import styles from './TarjetaCreacion.module.css';
import estilosVerif from '../pages/verificador/verificador.module.css';

// Tarjeta para la lista del verificador: sin guardar ni menú de opciones, solo abre la página de verificación
export default function TarjetaCreacionVerificar({ creacion }) {
    const id = creacion.id_creacion ?? creacion.id;
    const materialesTexto = Array.isArray(creacion.materiales)
        ? creacion.materiales.map((m) => `#${m.nombre || m}`).join(' ')
        : creacion.materiales || '';

    const rechazos = Number(creacion.veces_rechazada) || 0;

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

            <div className={styles.contenido}>
                {/* El enlace del título cubre toda la tarjeta: clic en cualquier parte abre la verificación */}
                <Link href={`/verificador/verificar?id=${id}`} className={styles.titulo}>
                    {creacion.nombre}
                </Link>
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
            </div>
        </article>
    );
}