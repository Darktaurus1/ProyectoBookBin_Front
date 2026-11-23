import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { pedirJSON } from '../lib/api';
import TarjetaCreacion from '../components/TarjetaCreacion';
import FiltroMaterial from '../components/FiltroMaterial';
import styles from './index.module.css';

function mezclar(lista) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

export default function Home() {
    const router = useRouter();

    // Los filtros viven en la URL (/?q=lampara&material=3): así funcionan el buscador del menú,
    // el botón de regresar del navegador y compartir el enlace
    const busqueda = typeof router.query.q === 'string' ? router.query.q : '';
    const idMaterial = typeof router.query.material === 'string' ? router.query.material : '';

    const [creaciones, setCreaciones] = useState([]);
    const [usuario, setUsuario] = useState(null);
    const [idsFavoritos, setIdsFavoritos] = useState([]);
    const [pestana, setPestana] = useState('recomendados'); // 'recomendados' | 'mis-creaciones'
    const [materiales, setMateriales] = useState([]);
    const [cargandoMateriales, setCargandoMateriales] = useState(true);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    // Carga el usuario y sus favoritos una sola vez
    useEffect(() => {
        const u = localStorage.getItem('usuario');
        if (u) {
            const userObj = JSON.parse(u);
            setUsuario(userObj);

            const idUser = userObj.id_usuario ?? userObj.id;
            pedirJSON(`/favoritos/${idUser}`)
                .then((favs) => setIdsFavoritos(favs.map((f) => f.id_creacion ?? f.id)))
                .catch(() => {});
        }
    }, []);

   
    //lee el parametro
    useEffect(() => {
        if (!router.isReady) return;
        const materialUrl = router.query.material;
        if (materialUrl) {
            setMaterialSeleccionado(String(materialUrl));
        }
    }, [router.isReady, router.query.material]);

    // Carga las creaciones cada vez que cambia la búsqueda o el material
    useEffect(() => {
        if (!router.isReady) return;
        let vigente = true;

        const parametros = new URLSearchParams();
        if (busqueda) parametros.set('q', busqueda);
        if (idMaterial) parametros.set('material', idMaterial);
        const ruta = parametros.toString() ? `/creaciones?${parametros}` : '/creaciones';

        setError('');
        setCargando(true);
        pedirJSON(ruta)
            .then((datos) => {
                if (!vigente) return;
                // Al buscar se respeta el orden del backend; si no, se muestran al azar
                setCreaciones(busqueda ? datos : mezclar(datos));
            })
            .catch((err) => { if (vigente) setError(err.message); })
            .finally(() => { if (vigente) setCargando(false); });

        return () => { vigente = false; };
    }, [router.isReady, busqueda, idMaterial]);

    // Cambia uno o varios filtros en la URL; un valor vacío lo quita
    function actualizarFiltros(cambios) {
        const query = { ...router.query, ...cambios };
        Object.keys(query).forEach((llave) => {
            if (query[llave] === '' || query[llave] == null) delete query[llave];
        });
        router.push({ pathname: '/', query }, undefined, { shallow: true, scroll: false });
    }

    const materialActivo = materiales.find((m) => String(m.id_materiales) === idMaterial);
    const hayFiltros = Boolean(busqueda || idMaterial);

    // El filtro por material y la búsqueda los aplica el backend; aquí solo se filtra por pestaña
    const creacionesFiltradas = creaciones.filter((c) => {
        if (pestana === 'mis-creaciones') {
            const idUsuarioActual = usuario?.id_usuario ?? usuario?.id;
            const idAutor = c.id_usuario ?? c.usuario_id;
            if (!idUsuarioActual || idAutor !== idUsuarioActual) return false;
        }
        return true;
    });

    async function manejarGuardar(idCreacion) {
        if (!usuario) {
            alert('Inicia sesión para guardar creaciones');
            return;
        }

        const idUser = usuario.id_usuario ?? usuario.id;
        const yaEsFavorito = idsFavoritos.includes(idCreacion);

        try {
            await pedirJSON('/favoritos', {
                method: yaEsFavorito ? 'DELETE' : 'POST',
                body: JSON.stringify({
                    id_usuarios: idUser,
                    id_creacion: idCreacion,
                }),
            });

            setIdsFavoritos((prev) =>
                yaEsFavorito ? prev.filter((id) => id !== idCreacion) : [...prev, idCreacion]
            );
        } catch (err) {
            alert(err.message);
        }
    }

    const total = creacionesFiltradas.length;

    return (
        <main className={styles.fondo}>
            {/* Solo Recomendados y Mis Creaciones */}
            <div className={styles.pestanas}>
                <button
                    type="button"
                    className={`${styles.pestana} ${pestana === 'recomendados' ? styles.pestanaActiva : ''}`}
                    onClick={() => setPestana('recomendados')}
                >
                    Recomendados
                </button>
                <button
                    type="button"
                    className={`${styles.pestana} ${pestana === 'mis-creaciones' ? styles.pestanaActiva : ''}`}
                    onClick={() => setPestana('mis-creaciones')}
                >
                    Mis Creaciones
                </button>
            </div>

            {/* Barra de filtros: buscador de material, filtros activos y total */}
            <div className={styles.barraFiltros}>
                <div className={styles.filaFiltros}>
                    <FiltroMaterial
                        catalogo={materiales}
                        seleccionado={idMaterial}
                        cargando={cargandoMateriales}
                        onElegir={(m) => actualizarFiltros({ material: String(m.id_materiales) })}
                    />

                    <p className={styles.resumen} aria-live="polite">
                        {cargando ? 'Buscando...' : `${total} ${total === 1 ? 'creación' : 'creaciones'}`}
                    </p>
                </div>

                {hayFiltros && (
                    <div className={styles.filtrosActivos}>
                        {busqueda && (
                            <span className={styles.chipFiltro}>
                                Búsqueda: “{busqueda}”
                                <button
                                    type="button"
                                    className={styles.quitarFiltro}
                                    aria-label={`Quitar la búsqueda ${busqueda}`}
                                    onClick={() => actualizarFiltros({ q: '' })}
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {idMaterial && (
                            <span className={styles.chipFiltro}>
                                Material: {materialActivo ? materialActivo.nombre : '...'}
                                <button
                                    type="button"
                                    className={styles.quitarFiltro}
                                    aria-label="Quitar el filtro de material"
                                    onClick={() => actualizarFiltros({ material: '' })}
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {busqueda && idMaterial && (
                            <button
                                type="button"
                                className={styles.limpiarFiltros}
                                onClick={() => actualizarFiltros({ q: '', material: '' })}
                            >
                                Limpiar todo
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Contenedor de tarjetas */}
            <section className={styles.contenedorLista}>
                <div>
                    {error && <p style={{ color: '#7a0019' }}>{error}</p>}

                    {!cargando && total === 0 ? (
                        <div className={styles.sinResultados}>
                            <p>
                                {hayFiltros
                                    ? 'No encontramos creaciones con esos filtros.'
                                    : 'No hay creaciones para mostrar en esta sección.'}
                            </p>
                            {hayFiltros && (
                                <button
                                    type="button"
                                    className={styles.limpiarFiltros}
                                    onClick={() => actualizarFiltros({ q: '', material: '' })}
                                >
                                    Quitar filtros
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className={styles.listaCreacion}>
                            {creacionesFiltradas.map((c) => {
                                const idCreacion = c.id_creacion ?? c.id;
                                return (
                                    <TarjetaCreacion
                                        key={idCreacion}
                                        creacion={c}
                                        onGuardar={manejarGuardar}
                                        guardado={idsFavoritos.includes(idCreacion)}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>

                {pestana === 'mis-creaciones' && (
                    <div className={styles.contenedorBotonNueva}>
                        <Link href="/creaciones/nueva" className={styles.botonNuevaCreacion}>
                            Nueva Creacion
                        </Link>
                    </div>
                )}
            </section>
        </main>
    );
}
