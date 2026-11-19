import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { pedirJSON } from '../../lib/api';
import ModalReporte from '../../components/ModalReporte';
import styles from './creaciones.module.css';

function urlImagen(imagen) {
    if (!imagen) return null;
    return imagen.startsWith('http') ? imagen : `http://localhost:4000${imagen}`;
}

export default function DetalleCreacion() {
    const router = useRouter();
    const { id } = router.query;

    const [creacion, setCreacion] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [guardado, setGuardado] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [errorCarga, setErrorCarga] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [reportando, setReportando] = useState(false);
    

    // Carga la creación y revisa si el usuario ya la guardó
    useEffect(() => {
        if (!router.isReady) return;
        let vigente = true;

        let u = null;
        try { u = JSON.parse(localStorage.getItem('usuario')); } catch { u = null; }
        setUsuario(u);

        setCargando(true);
        setErrorCarga('');

        pedirJSON(`/creaciones/${id}`)
            .then((datos) => { if (vigente) setCreacion(datos); })
            .catch((err) => { if (vigente) setErrorCarga(err.message); })
            .finally(() => { if (vigente) setCargando(false); });

        const idUsuario = u?.id_usuario ?? u?.id;
        if (idUsuario) {
            pedirJSON(`/favoritos/${idUsuario}`)
                .then((favs) => {
                    if (!vigente) return;
                    setGuardado(favs.some((f) => String(f.id_creacion ?? f.id) === String(id)));
                })
                .catch(() => {});
        }

        return () => { vigente = false; };
    }, [router.isReady, id]);

    async function alternarGuardado() {
        setMensaje('');
        const idUsuario = usuario?.id_usuario ?? usuario?.id;
        if (!idUsuario) {
            setMensaje('Inicia sesión para guardar creaciones.');
            return;
        }

        try {
            await pedirJSON('/favoritos', {
                method: guardado ? 'DELETE' : 'POST',
                body: JSON.stringify({
                    id_usuarios: idUsuario,
                    id_creacion: creacion.id_creacion,
                }),
            });
            setGuardado(!guardado);
            setMensaje(guardado ? 'Quitada de tus guardados.' : 'Guardada en tus favoritos.');
        } catch (err) {
            setMensaje(err.message);
        }
    }

    function abrirReporte() {
        if (!usuario) {
            setMensaje('Inicia sesión para reportar.');
            return;
        }
        setReportando(true);
    }

    if (cargando) {
        return <main className={styles.fondo}><p className={styles.estado}>Cargando creación...</p></main>;
    }

    if (errorCarga || !creacion) {
        return (
            <main className={styles.fondo}>
                <p className={styles.estado}>{errorCarga || 'No se encontró la creación.'}</p>
                <Link href="/" className={styles.botonRegresar}>Regresar al inicio</Link>
            </main>
        );
    }

    const imagen = urlImagen(creacion.imagen);
    const autor = creacion.musuarios?.nombre;
    const materiales = Array.isArray(creacion.materiales) ? creacion.materiales : [];
    const idUsuarioActual = usuario?.id_usuario ?? usuario?.id;
    const esMio = idUsuarioActual != null && Number(creacion.id_usuario) === Number(idUsuarioActual);

    return (
        <main className={styles.fondo}>
            <article className={styles.tarjeta}>
                <div className={styles.imagenCaja}>
                    {imagen ? (
                        <img src={imagen} alt={creacion.nombre} />
                    ) : (
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="#6B8797" aria-hidden="true">
                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                        </svg>
                    )}
                </div>

                <div className={styles.contenido}>
                    <h1 className={styles.titulo}>{creacion.nombre}</h1>
                    {autor && <p className={styles.autor}>Creación de {autor}</p>}

                    {materiales.length > 0 && (
                        <section>
                            <h2>Materiales</h2>
                            <ul className={styles.listaMateriales}>
                                {materiales.map((m) => (
                                    <li key={m.id_materiales ?? m.nombre}>#{m.nombre}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    <section>
                        <h2>Descripción</h2>
                        <p className={styles.texto}>{creacion.descripcion}</p>
                    </section>

                    {creacion.instrucciones && (
                        <section>
                            <h2>Instrucciones</h2>
                            <p className={styles.texto}>{creacion.instrucciones}</p>
                        </section>
                    )}

                    {mensaje && <p className={styles.mensaje} role="status">{mensaje}</p>}

                    <div className={styles.botones}>
                        <button type="button" className={styles.botonGuardar} onClick={alternarGuardado}>
                            {guardado ? 'Quitar de guardados' : 'Guardar'}
                        </button>
                        <button type="button" className={styles.botonRegresar} onClick={() => router.back()}>
                            Regresar
                        </button>
                        {esMio ? (
                         <Link href={`/creaciones/editar/${creacion.id_creacion}`} className={styles.botonEditar}>
                                        Editar
                                    </Link>
                                ) : (
                                    <button type="button" className={styles.botonReportar} onClick={abrirReporte}>
                                        Reportar
                                    </button>
                                        )}
                    </div>
                </div>
            </article>

            {reportando && (
                <ModalReporte idCreacion={creacion.id_creacion} onCerrar={() => setReportando(false)} />
            )}
        </main>
    );
}