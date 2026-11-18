import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { pedirJSON } from '../../lib/api';
import styles from './admin.module.css';

export default function VerificadoresAdmin() {
    const router = useRouter();
    const [admin, setAdmin] = useState(null);
    const [verificadores, setVerificadores] = useState([]);
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');

    // Solo deja entrar a un administrador con sesión iniciada
    useEffect(() => {
        let u = null;
        try { u = JSON.parse(localStorage.getItem('usuario')); } catch { u = null; }

        if (!u || u.tipo !== 'administrador') {
            router.replace('/login');
            return;
        }
        setAdmin(u);
        cargarVerificadores();
    }, []);

    const cargarVerificadores = async () => {
        try {
            setError('');
            const data = await pedirJSON('/admin/verificadores');
            setVerificadores(data || []);
        } catch (err) {
            setError(err.message || 'Error al cargar la lista de verificadores.');
        }
    };

    const handleCambiarRol = async (id, nuevoRol) => {
        try {
            setError('');
            setMensaje('');
            await pedirJSON(`/admin/verificadores/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ rol: nuevoRol }),
            });
            setMensaje('Rol actualizado con éxito');
            cargarVerificadores();
        } catch (err) {
            setError(err.message || 'Error al actualizar el rol.');
        }
    };

    const handleBorrarVerificador = async (id) => {
        if (!confirm('¿Estás seguro de eliminar esta cuenta de verificador?')) return;

        try {
            setError('');
            setMensaje('');
            await pedirJSON(`/admin/verificadores/${id}`, { method: 'DELETE' });
            setMensaje('Cuenta de verificador eliminada con éxito');
            cargarVerificadores();
        } catch (err) {
            setError(err.message || 'Error al eliminar la cuenta.');
        }
    };

    if (!admin) return null;

    return (
        <div className={styles['admin-contenedor']}>
            <div className={styles['admin-tarjeta']}>
                <h1>Verificadores</h1>

                {mensaje && <div className={styles['alerta-exito']}>{mensaje}</div>}
                {error && <div className={styles['alerta-error']}>{error}</div>}

                {verificadores.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#5885A1', padding: '20px' }}>
                        No hay verificadores registrados.{' '}
                        <Link href="/admin/nuevo">Agrega el primero</Link>
                    </p>
                ) : (
                    <div className={styles['tabla-contenedor']}>
                        <table className={styles['tabla-verificadores']}>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Rol</th>
                                    <th>Admin Asignado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {verificadores.map((v) => (
                                    <tr key={v.id_verificador}>
                                        <td>{v.nombre}</td>
                                        <td>{v.correo}</td>
                                        <td>
                                            <select
                                                value={v.rol}
                                                aria-label={`Rol de ${v.nombre}`}
                                                onChange={(e) => handleCambiarRol(v.id_verificador, e.target.value)}
                                            >
                                                <option value="verificador">Verificador</option>
                                                <option value="verificador_lider">Verificador Líder</option>
                                            </select>
                                        </td>
                                        <td>{v.id_administrador || 'N/D'}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className={styles['btn-borrar']}
                                                onClick={() => handleBorrarVerificador(v.id_verificador)}
                                            >
                                                Borrar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
