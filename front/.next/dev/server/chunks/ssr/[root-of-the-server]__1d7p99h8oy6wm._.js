module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/lib/api.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "pedirJSON",
    ()=>pedirJSON
]);
async function pedirJSON(ruta, opciones = {}) {
    let res;
    try {
        res = await fetch(`/api${ruta}`, {
            ...opciones,
            headers: {
                'Content-Type': 'application/json',
                ...opciones.headers
            }
        });
    } catch  {
        throw new Error('El backend no responde');
    }
    let datos = null;
    try {
        datos = await res.json();
    } catch  {
        datos = null;
    }
    if (!res.ok) throw new Error(datos && datos.error || `Error ${res.status}`);
    return datos;
}
}),
"[project]/pages/perfil.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Perfil
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/pages/perfil.module.css [ssr] (css module)");
;
;
;
;
;
;
const CAMPOS = [
    {
        clave: 'correo',
        etiqueta: 'Correo electrónico',
        tipo: 'email',
        maximo: 45
    },
    {
        clave: 'nombre',
        etiqueta: 'Nombre de usuario',
        tipo: 'text',
        maximo: 50
    },
    {
        clave: 'contrasena',
        etiqueta: 'Contraseña',
        tipo: 'password',
        maximo: 72
    }
];
const SIN_EDICION = {
    correo: false,
    nombre: false,
    contrasena: false
};
function IconoEditar() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        width: "26",
        height: "26",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
            }, void 0, false, {
                fileName: "[project]/pages/perfil.js",
                lineNumber: 19,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
            }, void 0, false, {
                fileName: "[project]/pages/perfil.js",
                lineNumber: 20,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/perfil.js",
        lineNumber: 17,
        columnNumber: 9
    }, this);
}
function Perfil() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // undefined = todavía leyendo el navegador, null = no hay sesión
    const [usuario, setUsuario] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(undefined);
    const [valores, setValores] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        correo: '',
        nombre: '',
        contrasena: ''
    });
    const [editando, setEditando] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(SIN_EDICION);
    const [contrasenaActual, setContrasenaActual] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [mensaje, setMensaje] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [guardando, setGuardando] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        try {
            const guardado = JSON.parse(localStorage.getItem('usuario'));
            setUsuario(guardado || null);
            if (guardado) {
                setValores({
                    correo: guardado.correo,
                    nombre: guardado.nombre,
                    contrasena: ''
                });
            }
        } catch  {
            setUsuario(null);
        }
    }, []);
    if (usuario === undefined) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pagina,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].aviso,
                children: "Cargando…"
            }, void 0, false, {
                fileName: "[project]/pages/perfil.js",
                lineNumber: 50,
                columnNumber: 48
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/perfil.js",
            lineNumber: 50,
            columnNumber: 16
        }, this);
    }
    if (usuario === null) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pagina,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].aviso,
                children: [
                    "Inicia sesión para ver tu perfil. ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/login",
                        children: "Ir a iniciar sesión"
                    }, void 0, false, {
                        fileName: "[project]/pages/perfil.js",
                        lineNumber: 57,
                        columnNumber: 55
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/perfil.js",
                lineNumber: 56,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/perfil.js",
            lineNumber: 55,
            columnNumber: 13
        }, this);
    }
    // ¿Qué datos cambió la persona respecto a lo guardado?
    const cambios = {};
    if (editando.correo && valores.correo.trim() !== usuario.correo) cambios.correo = valores.correo.trim();
    if (editando.nombre && valores.nombre.trim() !== usuario.nombre) cambios.nombre = valores.nombre.trim();
    if (editando.contrasena && valores.contrasena !== '') cambios.contrasena = valores.contrasena;
    const hayCambios = Object.keys(cambios).length > 0;
    const alternarEdicion = (clave)=>{
        setError('');
        setMensaje('');
        if (editando[clave]) {
            // Cancelar: se regresa al valor guardado
            setValores({
                ...valores,
                [clave]: clave === 'contrasena' ? '' : usuario[clave]
            });
        }
        setEditando({
            ...editando,
            [clave]: !editando[clave]
        });
    };
    const guardar = async ()=>{
        setError('');
        setMensaje('');
        if (!hayCambios) {
            setError('No hay cambios que guardar.');
            return;
        }
        if (cambios.contrasena && cambios.contrasena.length < 8) {
            setError('La nueva contraseña debe tener al menos 8 caracteres.');
            return;
        }
        if (!contrasenaActual) {
            setError('Escribe tu contraseña actual para confirmar los cambios.');
            return;
        }
        setGuardando(true);
        try {
            const datos = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["pedirJSON"])(`/usuarios/${usuario.id_usuario}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...cambios,
                    contrasena_actual: contrasenaActual
                })
            });
            localStorage.setItem('usuario', JSON.stringify(datos.usuario));
            setUsuario(datos.usuario);
            setValores({
                correo: datos.usuario.correo,
                nombre: datos.usuario.nombre,
                contrasena: ''
            });
            setEditando(SIN_EDICION);
            setContrasenaActual('');
            setMensaje('Tus datos se actualizaron.');
        } catch (err) {
            setError(err.message);
        } finally{
            setGuardando(false);
        }
    };
    const cerrarSesion = ()=>{
        localStorage.removeItem('usuario');
        router.push('/login');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pagina,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].panel,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cuenta,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].titulo,
                            children: "Cuenta"
                        }, void 0, false, {
                            fileName: "[project]/pages/perfil.js",
                            lineNumber: 126,
                            columnNumber: 21
                        }, this),
                        CAMPOS.map((campo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fila,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].etiqueta,
                                        htmlFor: `campo-${campo.clave}`,
                                        children: campo.etiqueta
                                    }, void 0, false, {
                                        fileName: "[project]/pages/perfil.js",
                                        lineNumber: 130,
                                        columnNumber: 29
                                    }, this),
                                    editando[campo.clave] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        id: `campo-${campo.clave}`,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].entrada,
                                        type: campo.tipo,
                                        value: valores[campo.clave],
                                        maxLength: campo.maximo,
                                        placeholder: campo.clave === 'contrasena' ? 'Nueva contraseña' : '',
                                        autoComplete: campo.clave === 'contrasena' ? 'new-password' : 'off',
                                        autoFocus: true,
                                        onChange: (e)=>setValores({
                                                ...valores,
                                                [campo.clave]: e.target.value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/pages/perfil.js",
                                        lineNumber: 135,
                                        columnNumber: 33
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].valor,
                                        id: `campo-${campo.clave}`,
                                        children: campo.clave === 'contrasena' ? '••••••••••••' : usuario[campo.clave]
                                    }, void 0, false, {
                                        fileName: "[project]/pages/perfil.js",
                                        lineNumber: 147,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].editar,
                                        onClick: ()=>alternarEdicion(campo.clave),
                                        "aria-label": `${editando[campo.clave] ? 'Cancelar edición de' : 'Editar'} ${campo.etiqueta.toLowerCase()}`,
                                        "aria-pressed": editando[campo.clave],
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(IconoEditar, {}, void 0, false, {
                                            fileName: "[project]/pages/perfil.js",
                                            lineNumber: 159,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/perfil.js",
                                        lineNumber: 152,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, campo.clave, true, {
                                fileName: "[project]/pages/perfil.js",
                                lineNumber: 129,
                                columnNumber: 25
                            }, this)),
                        hayCambios && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].confirmar,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].etiqueta,
                                    htmlFor: "contrasena-actual",
                                    children: "Contraseña actual"
                                }, void 0, false, {
                                    fileName: "[project]/pages/perfil.js",
                                    lineNumber: 166,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    id: "contrasena-actual",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].entrada,
                                    type: "password",
                                    value: contrasenaActual,
                                    autoComplete: "current-password",
                                    placeholder: "Para confirmar los cambios",
                                    onChange: (e)=>setContrasenaActual(e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/pages/perfil.js",
                                    lineNumber: 169,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/perfil.js",
                            lineNumber: 165,
                            columnNumber: 25
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].error,
                            role: "alert",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/pages/perfil.js",
                            lineNumber: 181,
                            columnNumber: 31
                        }, this),
                        mensaje && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].exito,
                            role: "status",
                            children: mensaje
                        }, void 0, false, {
                            fileName: "[project]/pages/perfil.js",
                            lineNumber: 182,
                            columnNumber: 33
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/perfil.js",
                    lineNumber: 125,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].acciones,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].guardar,
                            onClick: guardar,
                            disabled: !hayCambios || guardando,
                            children: guardando ? 'Guardando…' : 'Guardar cambios'
                        }, void 0, false, {
                            fileName: "[project]/pages/perfil.js",
                            lineNumber: 186,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cerrar,
                            onClick: cerrarSesion,
                            children: "Cerrar sesión"
                        }, void 0, false, {
                            fileName: "[project]/pages/perfil.js",
                            lineNumber: 194,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/perfil.js",
                    lineNumber: 185,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/perfil.js",
            lineNumber: 124,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/pages/perfil.js",
        lineNumber: 123,
        columnNumber: 9
    }, this);
}
}),
"[project]/pages/perfil.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "acciones": "perfil-module__lp-Q8q__acciones",
  "aviso": "perfil-module__lp-Q8q__aviso",
  "cerrar": "perfil-module__lp-Q8q__cerrar",
  "confirmar": "perfil-module__lp-Q8q__confirmar",
  "cuenta": "perfil-module__lp-Q8q__cuenta",
  "editar": "perfil-module__lp-Q8q__editar",
  "entrada": "perfil-module__lp-Q8q__entrada",
  "error": "perfil-module__lp-Q8q__error",
  "etiqueta": "perfil-module__lp-Q8q__etiqueta",
  "exito": "perfil-module__lp-Q8q__exito",
  "fila": "perfil-module__lp-Q8q__fila",
  "guardar": "perfil-module__lp-Q8q__guardar",
  "pagina": "perfil-module__lp-Q8q__pagina",
  "panel": "perfil-module__lp-Q8q__panel",
  "titulo": "perfil-module__lp-Q8q__titulo",
  "valor": "perfil-module__lp-Q8q__valor",
});
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1d7p99h8oy6wm._.js.map