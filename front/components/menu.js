import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Menu.module.css';

function leerUsuario() {
    try { return JSON.parse(localStorage.getItem('usuario')); } catch { return null; }
}

export default function Menu() {
    const router = useRouter();
    const [esAdmin, setEsAdmin] = useState(false);

    // Se vuelve a revisar en cada cambio de página (por ejemplo, justo después del login)
    useEffect(() => {
        setEsAdmin(leerUsuario()?.tipo === 'administrador');
    }, [router.asPath]);

    if (esAdmin) {
        return (
            <nav className={styles.menu}>
                <h2 className={styles.logo}>BookBin</h2>
                <Link href="/admin">Verificadores</Link>
                <Link href="/admin/nuevo">Agregar verificador</Link>
                <Link href="/admin/perfil">Mi perfil</Link>
            </nav>
        );
    }

    return (
        <nav className={styles.menu}>
            <h2 className={styles.logo}>BookBin</h2>

            <Link href="/">Inicio</Link>
            <Link href="/creaciones/favoritos">Favoritos</Link>
            <Link href="/notificaciones">Notificaciones</Link>

            <div className={styles.searchBox}>
                <input type="text" placeholder="Buscar..." />

                <button type="button" className={styles.searchButton}>
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </button>
            </div>

            <Link href="/perfil">Mi perfil</Link>
        </nav>
    );
}
