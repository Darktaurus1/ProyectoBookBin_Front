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

    // Carga el catálogo de materiales una sola vez
    useEffect(() => {
        pedirJSON('/materiales')
            .then((datos) => setMateriales(Array.isArray(datos) ? datos : []))
            .catch(() => setError('No se pudieron cargar los materiales.'))
            .finally(() => setCargandoMateriales(false));
    }, []);

    // Id del usuario con sesión (null si no hay)
    const idActual = usuario?.id_usuario ?? usuario?.id ?? null;
    const enMisCreaciones = pestana === 'mis-creaciones';
    // Solo importa en la pestaña "Mis Creaciones": así Recomendados no se recarga al leer el usuario
    const idParaMisCreaciones = enMisCreaciones ? idActual : null;

    // Carga las creaciones cada vez que cambia la búsqueda, el material, la pestaña o el usuario
    useEffect(() => {
        if (!router.isReady) return;
        let vigente = true;

        // Mis Creaciones: sin sesión no hay nada que pedir
        if (enMisCreaciones && !idParaMisCreaciones) {
            setCreaciones([]);
            setCargando(false);
            return;
        }

        let ruta;
        if (enMisCreaciones) {
            // Trae todas las mías (aprobadas, pendientes y borradores)
            ruta = `/creaciones/usuario/${idParaMisCreaciones}`;
        } else {
            const parametros = new URLSearchParams();
            if (busqueda) parametros.set('q', busqueda);
            if (idMaterial) parametros.set('material', idMaterial);
            ruta = parametros.toString() ? `/creaciones?${parametros}` : '/creaciones';
        }

        setError('');
        setCargando(true);
        pedirJSON(ruta)
            .then((datos) => {
                if (!vigente) return;
                if (enMisCreaciones) {
                    // Esta ruta no filtra: la búsqueda y el material se aplican aquí
                    const texto = busqueda.toLowerCase();
                    const propias = datos.filter((c) => {
                        if (texto) {
                            const nombre = (c.nombre || '').toLowerCase();
                            const descripcion = (c.descripcion || '').toLowerCase();
                            if (!nombre.includes(texto) && !descripcion.includes(texto)) return false;
                        }
                        if (idMaterial) {
                            const usaMaterial = (c.materiales || []).some(
                                (m) => String(m.id_materiales) === idMaterial
                            );
                            if (!usaMaterial) return false;
                        }
                        return true;
                    });
                    setCreaciones(propias);
                } else {
                    // Al buscar se respeta el orden del backend; si no, se muestran al azar
                    setCreaciones(busqueda ? datos : mezclar(datos));
                }
            })
            .catch((err) => { if (vigente) setError(err.message); })
            .finally(() => { if (vigente) setCargando(false); });

        return () => { vigente = false; };
    }, [router.isReady, busqueda, idMaterial, enMisCreaciones, idParaMisCreaciones]);

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

    // Recomendados: filtra el backend. Mis Creaciones: ya llegan solo las mías y filtradas arriba
    const creacionesFiltradas = creaciones;

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
                                const tarjeta = (
                                    <TarjetaCreacion
                                        key={idCreacion}
                                        creacion={c}
                                        onGuardar={manejarGuardar}
                                        guardado={idsFavoritos.includes(idCreacion)}
                                    />
                                );
                                if (!enMisCreaciones) return tarjeta;

                                // En Mis Creaciones se indica si falta verificar o es borrador
                                const estado = c.borrador === 1
                                    ? 'Borrador'
                                    : c.aprovado !== 1
                                        ? 'Pendiente de verificación'
                                        : null;
                                return (
                                    <div key={idCreacion} style={{ position: 'relative' }}>
                                        {estado && (
                                            <span
                                                style={{
                                                    position: 'absolute',
                                                    top: 8,
                                                    left: 8,
                                                    zIndex: 2,
                                                    padding: '3px 8px',
                                                    borderRadius: 6,
                                                    background: '#FFF3CD',
                                                    color: '#664D03',
                                                    fontSize: 13,
                                                }}
                                            >
                                                {estado}
                                            </span>
                                        )}
                                        {tarjeta}
                                    </div>
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