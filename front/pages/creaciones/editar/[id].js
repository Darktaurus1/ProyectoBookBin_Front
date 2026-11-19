import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { pedirJSON } from '../../../lib/api';
import styles from '../nueva.module.css';

function urlImagen(imagen) {
    if (!imagen) return '';
    return imagen.startsWith('http') ? imagen : `http://localhost:4000${imagen}`;
}

export default function EditarCreacion() {
    const router = useRouter();
    const { id } = router.query;

    const [usuario, setUsuario] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [instrucciones, setInstrucciones] = useState('');
    const [catalogoMateriales, setCatalogoMateriales] = useState([]);
    const [materialesSeleccionados, setMaterialesSeleccionados] = useState([]);
    const [imagen, setImagen] = useState(null);
    const [preview, setPreview] = useState('');
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');

    // Carga la creación y el catálogo; si no es del usuario, lo regresa al detalle
    useEffect(() => {
        if (!router.isReady) return;
        let vigente = true;

        let u = null;
        try { u = JSON.parse(localStorage.getItem('usuario')); } catch { u = null; }
        const idUsuario = u?.id_usuario ?? u?.id;
        if (!idUsuario) {
            router.replace('/login');
            return;
        }
        setUsuario(u);

        Promise.all([pedirJSON(`/creaciones/${id}`), pedirJSON('/materiales')])
            .then(([creacion, materiales]) => {
                if (!vigente) return;

                if (Number(creacion.id_usuario) !== Number(idUsuario)) {
                    router.replace(`/creaciones/${id}`);
                    return;
                }

                setNombre(creacion.nombre || '');
                setDescripcion(creacion.descripcion || '');
                setInstrucciones(creacion.instrucciones || '');
                setPreview(urlImagen(creacion.imagen));
                setCatalogoMateriales(Array.isArray(materiales) ? materiales : []);
                setMaterialesSeleccionados(
                    (creacion.materiales || []).map((m) => m.id_materiales).filter(Boolean)
                );
            })
            .catch((err) => { if (vigente) setError(err.message); })
            .finally(() => { if (vigente) setCargando(false); });

        return () => { vigente = false; };
    }, [router.isReady, id]);

    const alternarMaterial = (idMaterial) => {
        setMaterialesSeleccionados((prev) =>
            prev.includes(idMaterial)
                ? prev.filter((idM) => idM !== idMaterial)
                : [...prev, idMaterial]
        );
    };

    const manejarCambioImagen = (e) => {
        const archivo = e.target.files[0];
        if (!archivo) return;
        setImagen(archivo);
        setPreview(URL.createObjectURL(archivo));
    };

    const guardarCambios = async (e) => {
        e.preventDefault();
        setError('');
        setMensaje('');

        if (materialesSeleccionados.length === 0) {
            setError('Selecciona al menos un material de la lista.');
            return;
        }

        const formData = new FormData();
        formData.append('id_usuario', usuario.id_usuario ?? usuario.id);
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('instrucciones', instrucciones);
        formData.append('id_materiales', JSON.stringify(materialesSeleccionados));
        if (imagen) formData.append('imagen', imagen);

        setGuardando(true);
        try {
            const respuesta = await fetch(`/api/creaciones/${id}`, {
                method: 'PUT',
                body: formData,
            });
            let datos = null;
            try { datos = await respuesta.json(); } catch { datos = null; }
            if (!respuesta.ok) {
                throw new Error((datos && datos.error) || 'No se pudieron guardar los cambios.');
            }

            setMensaje('¡Cambios guardados!');
            setTimeout(() => router.push(`/creaciones/${id}`), 900);
        } catch (err) {
            setError(err.message);
        } finally {
            setGuardando(false);
        }
    };

    if (cargando) {
        return <div className={styles.fondo}><p style={{ textAlign: 'center' }}>Cargando creación...</p></div>;
    }

    return (
        <form onSubmit={guardarCambios} className={styles.fondo}>
            <div className={styles.tarjetaFormulario}>
                <h1 className={styles.titulo}>Editar creación</h1>

                {error && <p style={{ color: '#7a0019', textAlign: 'center', margin: 0 }}>{error}</p>}
                {mensaje && <p style={{ color: '#0f4c29', textAlign: 'center', margin: 0 }}>{mensaje}</p>}

                <input
                    type="text"
                    className={styles.inputNombre}
                    placeholder="Nombre..."
                    aria-label="Nombre"
                    maxLength={50}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />

                <div className={styles.filaMedia}>
                    <label className={styles.cajaImagen}>
                        <span className={styles.textoImagen}>Toca para cambiar la imagen</span>
                        {preview ? (
                            <img src={preview} alt="Vista previa" className={styles.previewImagen} />
                        ) : (
                            <svg width="76" height="76" viewBox="0 0 24 24" fill="none" stroke="#6B8797" strokeWidth="1.8" aria-hidden="true">
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                <circle cx="12" cy="13" r="4" />
                            </svg>
                        )}
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={manejarCambioImagen}
                            hidden
                        />
                    </label>

                    <textarea
                        className={styles.cajaDescripcion}
                        placeholder="Descripción..."
                        aria-label="Descripción"
                        maxLength={100}
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.bloqueMateriales}>
                    <div className={styles.cabeceraMateriales}>
                        <span>Materiales utilizados</span>
                        <span>({materialesSeleccionados.length} seleccionados)</span>
                    </div>

                    <div className={styles.contenedorChipsMateriales}>
                        {catalogoMateriales.map((mat) => {
                            const estaSeleccionado = materialesSeleccionados.includes(mat.id_materiales);
                            return (
                                <button
                                    key={mat.id_materiales}
                                    type="button"
                                    aria-pressed={estaSeleccionado}
                                    className={`${styles.chipMaterial} ${estaSeleccionado ? styles.chipSeleccionado : ''}`}
                                    onClick={() => alternarMaterial(mat.id_materiales)}
                                >
                                    {estaSeleccionado ? '✓ ' : '+ '} {mat.nombre}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <textarea
                    className={styles.cajaInstrucciones}
                    placeholder="Instrucciones..."
                    aria-label="Instrucciones"
                    maxLength={500}
                    value={instrucciones}
                    onChange={(e) => setInstrucciones(e.target.value)}
                    required
                />
            </div>

            <div className={styles.tarjetaAcciones}>
                <div className={styles.filaBotones}>
                    <button
                        type="button"
                        className={styles.botonCancelar}
                        onClick={() => router.push(`/creaciones/${id}`)}
                    >
                        Cancelar
                    </button>
                </div>

                <button type="submit" className={styles.botonPublicar} disabled={guardando}>
                    {guardando ? 'Guardando...' : 'Guardar cambios'}
                </button>
            </div>
        </form>
    );
}