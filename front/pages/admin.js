import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { pedirJSON } from '../lib/api';
import styles from './admin.module.css';

const FORMULARIO_VACIO = { nombre: '', correo: '', contrasena: '', rol: 'verificador' };

export default function PanelAdministradorVerificadores() {
    const router = useRouter();
    const [admin, setAdmin] = useState(null);
    const [verificadores, setVerificadores] = useState([]);
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [nuevoVerificador, setNuevoVerificador] = useState(FORMULARIO_VACIO);

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

    const handleChangeInput = (e) => {
        setNuevoVerificador({ ...nuevoVerificador, [e.target.name]: e.target.value });
    };

    const handleCrearVerificador = async (e) => {
        e.preventDefault();
        setMensaje('');
        setError('');

        try {
            const res = await pedirJSON('/admin/verificadores', {
                method: 'POST',
                body: JSON.stringify({ ...nuevoVerificador, id_administrador: admin.id_administrador }),
            });
            setMensaje(res.mensaje || 'Cuenta de verificador creada con éxito');
            setNuevoVerificador(FORMULARIO_VACIO);
            cargarVerificadores();
        } catch (err) {
            setError(err.message || 'Error al crear el verificador.');
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

    // No muestra nada mientras revisa la sesión (o si no es admin)
    if (!admin) return null;

    return (
        <div className={styles['admin-contenedor']}>
            <div className={styles['admin-tarjeta']}>
                <h1>Panel de Administrador</h1>

                {mensaje && <div className={styles['alerta-exito']}>{mensaje}</div>}
                {error && <div className={styles['alerta-error']}>{error}</div>}

                {/* --- FORMULARIO CREAR VERIFICADOR --- */}
                <div className={styles['seccion-formulario']}>
                    <h3>Crear Cuenta de Verificador</h3>
                    <form onSubmit={handleCrearVerificador}>
                        <div className={styles['campo']}>
                            <label htmlFor="nombre">Nombre:</label>
                            <input
                                id="nombre"
                                type="text"
                                name="nombre"
                                maxLength={50}
                                value={nuevoVerificador.nombre}
                                onChange={handleChangeInput}
                                required
                            />
                        </div>
                        <div className={styles['campo']}>
                            <label htmlFor="correo">Correo:</label>
                            <input
                                id="correo"
                                type="email"
                                name="correo"
                                maxLength={45}
                                value={nuevoVerificador.correo}
                                onChange={handleChangeInput}
                                required
                            />
                        </div>
                        <div className={styles['campo']}>
                            <label htmlFor="contrasena">Contraseña:</label>
                            <input
                                id="contrasena"
                                type="password"
                                name="contrasena"
                                minLength={8}
                                maxLength={72}
                                value={nuevoVerificador.contrasena}
                                onChange={handleChangeInput}
                                required
                            />
                        </div>
                        <div className={styles['campo']}>
                            <label htmlFor="rol">Elegir Rol:</label>
                            <select id="rol" name="rol" value={nuevoVerificador.rol} onChange={handleChangeInput}>
                                <option value="verificador">Verificador (Normal)</option>
                                <option value="verificador_lider">Verificador Líder</option>
                            </select>
                        </div>
                        <button type="submit">Crear Verificador</button>
                    </form>
                </div>

                {/* --- LISTA DE VERIFICADORES --- */}
                <div>
                    <h3>Verificadores Registrados</h3>
                    {verificadores.length === 0 ? (
                        <p style={{ textAlign: 'center', color: '#5885A1', padding: '20px' }}>
                            No hay verificadores registrados actualmente.
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
        </div>
    );
}