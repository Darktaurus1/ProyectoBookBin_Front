import { useEffect, useState } from 'react';
import Link from 'next/link';
import { pedirJSON } from '../lib/api';
import TarjetaCreacion from '../components/TarjetaCreacion';
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
    const [materiales, setMateriales] = useState([]);
    const [materialSeleccionado, setMaterialSeleccionado] = useState('');
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

    // El filtro por material ya lo aplica el backend; aquí solo se filtra por pestaña
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

            {/* Select de materiales */}
            <div className={styles.barraMateriales}>
                <label htmlFor="filtro-material" className={styles.etiquetaMateriales}>
                    Filtrar por material:
                </label>
                <select
                    id="filtro-material"
                    className={styles.selectMateriales}
                    value={materialSeleccionado}
                    onChange={(e) => setMaterialSeleccionado(e.target.value)}
                >
                    <option value="">Todos los materiales</option>
                    {materiales.map((m) => (
                        <option key={m.id_materiales} value={m.id_materiales}>
                            {m.nombre}
                        </option>
                    ))}
                </select>
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