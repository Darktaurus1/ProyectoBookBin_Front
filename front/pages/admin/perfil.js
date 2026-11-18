import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './admin.module.css';

export default function PerfilAdmin() {
    const router = useRouter();
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        let u = null;
        try { u = JSON.parse(localStorage.getItem('usuario')); } catch { u = null; }

        if (!u || u.tipo !== 'administrador') {
            router.replace('/login');
            return;
        }
        setAdmin(u);
    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem('usuario');
        router.replace('/login');
    };

    if (!admin) return null;

    return (
        <div className={styles['admin-contenedor']}>
            <div className={styles['admin-tarjeta']}>
                <h1>Mi perfil</h1>

                <div className={styles['seccion-formulario']}>
                    <div className={styles['campo']}>
                        <label>Nombre:</label>
                        <p>{admin.nombre}</p>
                    </div>
                    <div className={styles['campo']}>
                        <label>Correo:</label>
                        <p>{admin.correo}</p>
                    </div>
                    <div className={styles['campo']}>
                        <label>Tipo de cuenta:</label>
                        <p>Administrador</p>
                    </div>

                    <button type="button" className={styles['btn-borrar']} onClick={cerrarSesion}>
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
}
