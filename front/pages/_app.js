import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Menu from '../components/menu';

export default function App({ Component, pageProps }) {
    const router = useRouter();

    const ocultarMenu =
        router.pathname === '/registro' ||
        router.pathname === '/login';

    // Un administrador solo puede estar en las páginas /admin
    useEffect(() => {
        let u = null;
        try { u = JSON.parse(localStorage.getItem('usuario')); } catch { u = null; }

        const esAdmin = u?.tipo === 'administrador';
        if (esAdmin && !router.pathname.startsWith('/admin') && !ocultarMenu) {
            router.replace('/admin');
        }
    }, [router.pathname]);

    return (
        <>
            {!ocultarMenu && <Menu />}
            <Component {...pageProps} />
        </>
    );
}
