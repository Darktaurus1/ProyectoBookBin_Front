import { useEffect, useState } from 'react';
import Link from 'next/link';
import { pedirJSON } from '../lib/api';
import TarjetaCreacion from '../components/TarjetaCreacion'; // Verifica si tu archivo se llama TarjetaCreacion.js o TarjetaCreacion.js
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
    const [creaciones, setCreaciones] = useState([]);
    const [usuario, setUsuario] = useState(null);
    const [idsFavoritos, setIdsFavoritos] = useState([]);
    const [pestana, setPestana] = useState('recomendados'); // 'recomendados' | 'mis-creaciones'
    const [mostrarMateriales, setMostrarMateriales] = useState(false);
    const [materialFiltro, setMaterialFiltro] = useState('');
    const [error, setError] = useState('');
    const [materiales, setMateriales] = useState([]);
    const [materialSeleccionado, setMaterialSeleccionado] = useState('');

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

        pedirJSON('/creaciones')
            .then(setCreaciones)
            .catch((err) => setError(err.message));
    }, []);

    useEffect(() => {
        pedirJSON('/materiales')
            .then((datos) => setMateriales(Array.isArray(datos) ? datos : []))
            .catch(() => setError('No se pudieron cargar los materiales.'));
    }, []);

        // Carga las creaciones al inicio y cada vez que cambia el material elegido
        useEffect(() => {
            let vigente = true;
            const ruta = materialSeleccionado
                ? `/creaciones?material=${materialSeleccionado}`
                : '/creaciones';

            setError('');
            pedirJSON(ruta)
                .then((datos) => { if (vigente) setCreaciones(mezclar(datos)); })
                .catch((err) => { if (vigente) setError(err.message); });

            return () => { vigente = false; };
        }, [materialSeleccionado]);

    // Extraer materiales únicos disponibles
    const materialesDisponibles = Array.from(
        new Set(
            creaciones.flatMap((c) =>
                Array.isArray(c.materiales)
                    ? c.materiales.map((m) => m.nombre || m)
                    : []
            )
        )
    );

    const creacionesFiltradas = creaciones.filter((c) => {
        if (pestana === 'mis-creaciones') {
            const idUsuarioActual = usuario?.id_usuario ?? usuario?.id;
            const idAutor = c.id_usuario ?? c.usuario_id;
            if (!idUsuarioActual || idAutor !== idUsuarioActual) return false;
        }
        if (materialFiltro) {
            const lista = Array.isArray(c.materiales)
                ? c.materiales.map((m) => m.nombre || m)
                : [];
            if (!lista.includes(materialFiltro)) return false;
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

            <div className='filtroMateriales'>
                <label htmlFor='filtro-material'>Filtrar por material: </label>
                <select
                    id='filtro-material'
                    value={materialSeleccionado}
                    onChange={(e) => setMaterialSeleccionado(e.target.value)}
                >
                    <option value=''>Todos los materiales</option>
                    {materiales.map((m) => (
                        <option key={m.id_materiales} value={m.id_materiales}>
                            {m.nombre}
                        </option>
                    ))}
                </select>
            </div>

            {/* Desplegable de Materiales */}
            <div className={styles.barraMateriales}>
                <button
                    type="button"
                    className={styles.botonMateriales}
                    onClick={() => setMostrarMateriales(!mostrarMateriales)}
                >
                    <span>Materiales {materialFiltro ? `(${materialFiltro})` : ''}</span>
                    <span>{mostrarMateriales ? 'v' : '>'}</span>
                </button>

                {mostrarMateriales && (
                    <div className={styles.listaChips}>
                        <button
                            type="button"
                            className={`${styles.chip} ${materialFiltro === '' ? styles.chipActivo : ''}`}
                            onClick={() => setMaterialFiltro('')}
                        >
                            Todos
                        </button>
                        {materialesDisponibles.map((mat) => (
                            <button
                                key={mat}
                                type="button"
                                className={`${styles.chip} ${materialFiltro === mat ? styles.chipActivo : ''}`}
                                onClick={() => setMaterialFiltro(mat)}
                            >
                                #{mat}
                            </button>
                        ))}
                    </div>
                )}
            </div>

                {/* Contenedor de tarjetas */}
                <section className={styles.contenedorLista}>
                    <div>
                        {error && <p style={{ color: '#ffdddd' }}>{error}</p>}

                        {creacionesFiltradas.length === 0 ? (
                            <p style={{ color: '#DCE6EC', textAlign: 'center', marginTop: '20px' }}>
                                No hay creaciones para mostrar en esta sección.
                            </p>
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