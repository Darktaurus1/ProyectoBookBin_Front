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
    const [texto, setTexto] = useState('');

    // Se vuelve a revisar en cada cambio de página (por ejemplo, justo después del login)
    useEffect(() => {
        setEsAdmin(leerUsuario()?.tipo === 'administrador');
    }, [router.asPath]);

    // En el inicio, el buscador muestra lo que se está buscando; en otras páginas queda vacío
    useEffect(() => {
        if (!router.isReady) return;
        const q = router.pathname === '/' && typeof router.query.q === 'string' ? router.query.q : '';
        setTexto(q);
    }, [router.isReady, router.pathname, router.query.q]);

    // Busca creaciones por nombre o descripción y muestra los resultados en el inicio
    const buscar = (e) => {
        e.preventDefault();
        const q = texto.trim();
        // Si ya estás en el inicio, conserva el filtro de material
        const query = router.pathname === '/' ? { ...router.query } : {};
        if (q) query.q = q;
        else delete query.q;
        router.push({ pathname: '/', query });
    };

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

            <form role="search" className={styles.searchBox} onSubmit={buscar}>
                <input
                    type="search"
                    placeholder="Buscar creaciones..."
                    aria-label="Buscar creaciones"
                    maxLength={50}
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                />

                <button type="submit" className={styles.searchButton} aria-label="Buscar">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </button>
            </form>

            <Link href="/perfil">Mi perfil</Link>
        </nav>
    );
}
