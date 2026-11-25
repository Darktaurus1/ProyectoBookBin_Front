import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { pedirJSON, fetchConSesion } from '../../lib/api';
import styles from './nueva.module.css';
import SelectorMateriales from '../../components/SelectorMateriales';
import EditorPasos, { limpiarPasos } from '../../components/EditorPasos';

export default function NuevaCreacion() {
    const router = useRouter();
    const [usuario, setUsuario] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [instrucciones, setInstrucciones] = useState('');
    
    // Lista completa de materiales de la BD y lista de IDs seleccionados
    const [catalogoMateriales, setCatalogoMateriales] = useState([]);
    const [materialesSeleccionados, setMaterialesSeleccionados] = useState([]);
    // Cantidad de cada material: { idMaterial: cantidad }
    const [cantidades, setCantidades] = useState({});

    // Catálogo de herramientas y las seleccionadas (opcionales)
    const [catalogoHerramientas, setCatalogoHerramientas] = useState([]);
    const [herramientasSeleccionadas, setHerramientasSeleccionadas] = useState([]);
    const [cargandoHerramientas, setCargandoHerramientas] = useState(true);

    const [imagen, setImagen] = useState(null);
    const [preview, setPreview] = useState('');
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const u = localStorage.getItem('usuario');
        if (!u) {
            router.push('/login');
            return;
        }
        setUsuario(JSON.parse(u));

        // Cargar borrador local previo si existe
        const borradorGuardado = localStorage.getItem('borrador_creacion');
        if (borradorGuardado) {
            try {
                const datosBorrador = JSON.parse(borradorGuardado);
                setNombre(datosBorrador.nombre || '');
                setDescripcion(datosBorrador.descripcion || '');
                setInstrucciones(datosBorrador.instrucciones || '');
                if (Array.isArray(datosBorrador.materiales)) {
                    setMaterialesSeleccionados(datosBorrador.materiales);
                }
                if (datosBorrador.cantidades && typeof datosBorrador.cantidades === 'object') {
                    setCantidades(datosBorrador.cantidades);
                }
                if (Array.isArray(datosBorrador.herramientas)) {
                    setHerramientasSeleccionadas(datosBorrador.herramientas);
                }
            } catch {
            }
        }
        // Cargar catálogo de materiales desde la BD
        pedirJSON('/materiales')
            .then((datos) => {
                if (Array.isArray(datos)) {
                    setCatalogoMateriales(datos);
                    // Quita del borrador los materiales que ya no existen en el catálogo
                    const idsValidos = datos.map((m) => m.id_materiales);
                    setMaterialesSeleccionados((prev) => prev.filter((id) => idsValidos.includes(id)));
                }
            })
            .catch(() => setError('No se pudieron cargar los materiales disponibles.'));

        // Cargar catálogo de herramientas desde la BD
        pedirJSON('/herramientas')
            .then((datos) => {
                if (Array.isArray(datos)) {
                    setCatalogoHerramientas(datos);
                    const idsValidos = datos.map((h) => h.id_herramientas);
                    setHerramientasSeleccionadas((prev) => prev.filter((id) => idsValidos.includes(id)));
                }
            })
            .catch(() => setError('No se pudieron cargar las herramientas disponibles.'))
            .finally(() => setCargandoHerramientas(false));
    }, [router]);

    const manejarCambioImagen = (e) => {
        const archivo = e.target.files[0];
        if (!archivo) return;
        setImagen(archivo);
        setPreview(URL.createObjectURL(archivo));
    };

    // Arma el formulario y lo manda al backend.
    // accion = 'borrador' → se guarda sin publicar (solo pide el nombre)
    // accion = 'publicar' → se manda a verificación (pide todo)
    const enviar = async (accion) => {
        setError('');
        setMensaje('');
        if (!usuario) return;

        const esBorrador = accion === 'borrador';

        if (!nombre.trim()) {
            setError('Ponle un nombre para poder guardarla.');
            return;
        }
        if (!esBorrador) {
            if (materialesSeleccionados.length === 0) {
                setError('Selecciona al menos un material de la lista.');
                return;
            }
            if (!limpiarPasos(instrucciones)) {
                setError('Agrega al menos un paso en las instrucciones.');
                return;
            }
        }

        try {
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('descripcion', descripcion);
            formData.append('instrucciones', limpiarPasos(instrucciones));
            formData.append('id_usuario', usuario.id_usuario ?? usuario.id);
            formData.append('accion', accion);
            formData.append('id_materiales', JSON.stringify(materialesSeleccionados));
            formData.append('id_herramientas', JSON.stringify(herramientasSeleccionadas));
            formData.append('cantidades', JSON.stringify(
                Object.fromEntries(materialesSeleccionados.map((idM) => [idM, cantidades[idM] ?? 1]))
            ));
            if (imagen) formData.append('imagen', imagen);

            const respuesta = await fetchConSesion('/api/creaciones', {
                method: 'POST',
                body: formData,
            });
            const datos = await respuesta.json();
            if (!respuesta.ok) {
                throw new Error(datos.error || 'No se pudo guardar la creación');
            }

            // Ya está en la base de datos: el borrador local ya no hace falta
            localStorage.removeItem('borrador_creacion');
            setMensaje(esBorrador
                ? 'Borrador guardado. Lo encuentras en Mis Creaciones.'
                : '¡Creación enviada! Se publicará cuando un verificador la apruebe.');
            setTimeout(() => router.push('/'), 1200);
        } catch (err) {
            setError(err.message);
        }
    };

    const guardarBorrador = () => enviar('borrador');

    const publicar = (e) => {
        e.preventDefault();
        enviar('publicar');
    };

    return (
        <form onSubmit={publicar} className={styles.fondo}>
            <div className={styles.tarjetaFormulario}>
                <h1 className={styles.titulo}>Nueva creación</h1>

                {error && <p style={{ color: '#7a0019', textAlign: 'center', margin: 0 }}>{error}</p>}
                {mensaje && <p style={{ color: '#0f4c29', textAlign: 'center', margin: 0 }}>{mensaje}</p>}

                <input
                    type="text"
                    className={styles.inputNombre}
                    placeholder="Nombre..."
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />

                <div className={styles.filaMedia}>
                    <label className={styles.cajaImagen}>
                        <span className={styles.textoImagen}>Agrega la imagen de tu creación</span>
                        {preview ? (
                            <img src={preview} alt="Vista previa" className={styles.previewImagen} />
                        ) : (
                            <svg width="76" height="76" viewBox="0 0 24 24" fill="none" stroke="#6B8797" strokeWidth="1.8">
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
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </div>

                <SelectorMateriales
                    catalogo={catalogoMateriales}
                    seleccionados={materialesSeleccionados}
                    onCambiar={setMaterialesSeleccionados}
                    cantidades={cantidades}
                    onCambiarCantidades={setCantidades}
                    cargando={catalogoMateriales.length === 0}
                />

                <SelectorMateriales
                    catalogo={catalogoHerramientas}
                    seleccionados={herramientasSeleccionadas}
                    onCambiar={setHerramientasSeleccionadas}
                    cargando={cargandoHerramientas}
                    campoId="id_herramientas"
                    titulo="Herramientas (opcional)"
                    textoBuscar="Busca una herramienta: tijeras, cúter, pistola de silicón..."
                    nombrePlural="herramientas"
                />

                <EditorPasos value={instrucciones} onChange={setInstrucciones} maxCaracteres={500} />
            </div>

            {/* Tarjeta de acciones recuperada con Borrador, Cancelar y Publicar */}
            <div className={styles.tarjetaAcciones}>
                <div className={styles.filaBotones}>
                    <button
                        type="button"
                        className={styles.botonBorrador}
                        onClick={guardarBorrador}
                    >
                        Guardar borrador
                    </button>
                    <button
                        type="button"
                        className={styles.botonCancelar}
                        onClick={() => router.push('/')}
                    >
                        Cancelar
                    </button>
                </div>

                <button type="submit" className={styles.botonPublicar}>
                    Publicar
                </button>
            </div>
        </form>
    );
}