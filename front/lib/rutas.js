export function esVerificador(tipo) {
    return tipo === 'verificador' || tipo === 'verificador_lider';
}

export function rutaInicio(tipo) {
    if (tipo === 'administrador') return '/admin';
    if (tipo === 'verificador_lider') return '/verificador/lider';
    if (tipo === 'verificador') return '/verificador';
    return '/';
}