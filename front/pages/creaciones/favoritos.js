import { useEffect, useState } from 'react';
import Link from 'next/link';
import { pedirJSON } from '../../lib/api';
import TarjetaCreacion from '../../components/TarjetaCreacion';
import styles from '../index.module.css';

export default function Guardados() {
    // undefined = leyendo localStorage, null = sin sesión
    const [usuario, setUsuario] = useState(undefined);
    const [favoritos, setFavoritos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        try {
            const u = JSON.parse(localStorage.getItem('usuario'));
            setUsuario(u || null);

            if (u) {
                const idUsuario = u.id_usuario ?? u.id;
                pedirJSON(`/favoritos/${idUsuario}`)
                    .then(setFavoritos)
                    .catch((err) => setError(err.message));
            }
        } catch {
            setUsuario(null);
        }
    }, []);

    // Quitar de favoritos cuando vuelve a presionar el botón de guardar en esta pantalla
    async function manejarQuitar(idCreacion) {
        if (!usuario) return;
        const idUsuario = usuario.id_usuario ?? usuario.id;

        try {
            await pedirJSON('/favoritos', {
                method: 'DELETE',
                body: JSON.stringify({
                    id_usuarios: idUsuario,
                    id_creacion: idCreacion,
                }),
            });

            // Quita la tarjeta de la pantalla al instante sin recargar
            setFavoritos((prev) =>
                prev.filter((c) => (c.id_creacion ?? c.id) !== idCreacion)
            );
        } catch (err) {
            alert(err.message);
        }
    }

    if (usuario === undefined) {
        return <main className={styles.fondo}><p style={{ color: '#DCE6EC' }}>Cargando...</p></main>;
    }

    if (usuario === null) {
        return (
            <main className={styles.fondo}>
                <div className={styles.avisoContenedor}>
                    <p className={styles.avisoTexto}>
                        Inicia sesión para ver tus creaciones guardadas.{' '}
                        <Link href="/login" className={styles.avisoEnlace}>
                            Ir a iniciar sesión
                        </Link>
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.fondo}>
            <div className={styles.pestanas}>
                <div className={`${styles.pestana} ${styles.pestanaActiva}`} style={{ textAlign: 'center', cursor: 'default' }}>
                    Creaciones Guardadas
                </div>
            </div>

            <section className={styles.contenedorLista}>
                <div>
                    {error && <p style={{ color: '#ffdddd' }}>{error}</p>}

                    {favoritos.length === 0 ? (
                        <p style={{ color: '#DCE6EC', textAlign: 'center', marginTop: '20px' }}>
                            Aún no has guardado ninguna creación.
                        </p>
                    ) : (
                        <div className={styles.listaCreacion}>
                            {favoritos.map((c) => (
                                <TarjetaCreacion
                                    key={c.id_creacion ?? c.id}
                                    creacion={c}
                                    guardado={true}
                                    onGuardar={manejarQuitar}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}