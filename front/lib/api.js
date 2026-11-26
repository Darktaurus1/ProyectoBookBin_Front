// El JWT se guarda al iniciar sesión; la cookie de sesión la maneja el navegador sola (httpOnly)
export function leerToken() {
    try { return localStorage.getItem('token'); } catch { return null; }
}

function guardarToken(token) {
    try { localStorage.setItem('token', token); } catch { /* sin localStorage */ }
}

export function encabezadoAuth() {
    const token = leerToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export function borrarSesionLocal() {
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
    } catch {
        // sin acceso a localStorage: no hay nada que borrar
    }
}

// Pide un JWT nuevo usando la cookie de sesión. Si varias peticiones lo piden a la vez, se hace una sola vez.
let renovando = null;
function renovarToken() {
    if (!renovando) {
        renovando = fetch('/api/refresh', { method: 'POST' })
            .then(async (res) => {
                if (!res.ok) return false;
                const datos = await res.json();
                guardarToken(datos.token);
                return true;
            })
            .catch(() => false)
            .finally(() => { renovando = null; });
    }
    return renovando;
}

// fetch con token: si el token expiró lo renueva y reintenta una vez; si la sesión terminó, manda al login.

export async function fetchConSesion(url, opciones = {}) {
    const hacer = () => fetch(url, { ...opciones, headers: { ...encabezadoAuth(), ...opciones.headers } });

    let res = await hacer();
    if (res.status === 401 && leerToken()) {
        if (await renovarToken()) res = await hacer();
        if (res.status === 401) {
            borrarSesionLocal();
            if (typeof window !== 'undefined') window.location.href = '/login';
        }
    }
    return res;
}  

export async function pedirJSON(ruta, opciones = {}) {
    let res;
    try {
        res = await fetchConSesion(`/api${ruta}`, {
            ...opciones,
            headers: { 'Content-Type': 'application/json', ...opciones.headers },
        });
    } catch {
        throw new Error('El backend no responde');
    }

    let datos = null;
    try { datos = await res.json(); } catch { datos = null; }
    if (!res.ok) throw new Error((datos && datos.error) || `Error ${res.status}`);
    return datos;
}

// Cierra la sesión en el servidor (destruye la sesión y revoca el token) y en el navegador
export async function cerrarSesion() {
    try {
        await fetch('/api/logout', { method: 'POST', headers: encabezadoAuth() });
    } catch {
        // aunque el backend no responda, la sesión local se borra igual
    }
    borrarSesionLocal();
}
