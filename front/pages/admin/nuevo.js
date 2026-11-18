import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { pedirJSON } from '../../lib/api';
import styles from './admin.module.css';

const FORMULARIO_VACIO = { nombre: '', correo: '', contrasena: '', rol: 'verificador' };

export default function NuevoVerificador() {
    const router = useRouter();
    const [admin, setAdmin] = useState(null);
    const [formulario, setFormulario] = useState(FORMULARIO_VACIO);
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [enviando, setEnviando] = useState(false);

    useEffect(() => {
        let u = null;
        try { u = JSON.parse(localStorage.getItem('usuario')); } catch { u = null; }

        if (!u || u.tipo !== 'administrador') {
            router.replace('/login');
            return;
        }
        setAdmin(u);
    }, []);

    const cambiar = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
    };

    const crear = async (e) => {
        e.preventDefault();
        setError('');
        setMensaje('');
        setEnviando(true);

        try {
            const res = await pedirJSON('/admin/verificadores', {
                method: 'POST',
                body: JSON.stringify({ ...formulario, id_administrador: admin.id_administrador }),
            });
            setMensaje(res.mensaje || 'Cuenta de verificador creada con éxito');
            setFormulario(FORMULARIO_VACIO);
        } catch (err) {
            setError(err.message || 'Error al crear el verificador.');
        } finally {
            setEnviando(false);
        }
    };

    if (!admin) return null;

    return (
        <div className={styles['admin-contenedor']}>
            <div className={styles['admin-tarjeta']}>
                <h1>Agregar verificador</h1>

                {mensaje && <div className={styles['alerta-exito']}>{mensaje}</div>}
                {error && <div className={styles['alerta-error']}>{error}</div>}

                <div className={styles['seccion-formulario']}>
                    <form onSubmit={crear}>
                        <div className={styles['campo']}>
                            <label htmlFor="nombre">Nombre:</label>
                            <input id="nombre" type="text" name="nombre" maxLength={50}
                                value={formulario.nombre} onChange={cambiar} required />
                        </div>
                        <div className={styles['campo']}>
                            <label htmlFor="correo">Correo:</label>
                            <input id="correo" type="email" name="correo" maxLength={45}
                                value={formulario.correo} onChange={cambiar} required />
                        </div>
                        <div className={styles['campo']}>
                            <label htmlFor="contrasena">Contraseña:</label>
                            <input id="contrasena" type="password" name="contrasena" minLength={8} maxLength={72}
                                value={formulario.contrasena} onChange={cambiar} required />
                        </div>
                        <div className={styles['campo']}>
                            <label htmlFor="rol">Rol:</label>
                            <select id="rol" name="rol" value={formulario.rol} onChange={cambiar}>
                                <option value="verificador">Verificador (Normal)</option>
                                <option value="verificador_lider">Verificador Líder</option>
                            </select>
                        </div>
                        <button type="submit" disabled={enviando}>
                            {enviando ? 'Creando...' : 'Crear verificador'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
