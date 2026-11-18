(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/perfil\" }", (function(__turbopack_context__){
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/perfil.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/perfil.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/perfil";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/perfil.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if ("TURBOPACK compile-time truthy", 1) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[project]/lib/api.js [client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/perfil.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Perfil
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/pages/perfil.module.css [client] (css module)");
;
var _s = __turbopack_context__.k.signature();
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
            }, void 0, false, {
                fileName: "[project]/pages/perfil.js",
                lineNumber: 19,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
_c = IconoEditar;
function Perfil() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // undefined = todavía leyendo el navegador, null = no hay sesión
    const [usuario, setUsuario] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [valores, setValores] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        correo: '',
        nombre: '',
        contrasena: ''
    });
    const [editando, setEditando] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(SIN_EDICION);
    const [contrasenaActual, setContrasenaActual] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [mensaje, setMensaje] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [guardando, setGuardando] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Perfil.useEffect": ()=>{
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
        }
    }["Perfil.useEffect"], []);
    if (usuario === undefined) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pagina,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].aviso,
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pagina,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].aviso,
                children: [
                    "Inicia sesión para ver tu perfil. ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
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
            const datos = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$client$5d$__$28$ecmascript$29$__["pedirJSON"])(`/usuarios/${usuario.id_usuario}`, {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pagina,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].panel,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].cuenta,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].titulo,
                            children: "Cuenta"
                        }, void 0, false, {
                            fileName: "[project]/pages/perfil.js",
                            lineNumber: 126,
                            columnNumber: 21
                        }, this),
                        CAMPOS.map((campo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].fila,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].etiqueta,
                                        htmlFor: `campo-${campo.clave}`,
                                        children: campo.etiqueta
                                    }, void 0, false, {
                                        fileName: "[project]/pages/perfil.js",
                                        lineNumber: 130,
                                        columnNumber: 29
                                    }, this),
                                    editando[campo.clave] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: `campo-${campo.clave}`,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].entrada,
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
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].valor,
                                        id: `campo-${campo.clave}`,
                                        children: campo.clave === 'contrasena' ? '••••••••••••' : usuario[campo.clave]
                                    }, void 0, false, {
                                        fileName: "[project]/pages/perfil.js",
                                        lineNumber: 147,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].editar,
                                        onClick: ()=>alternarEdicion(campo.clave),
                                        "aria-label": `${editando[campo.clave] ? 'Cancelar edición de' : 'Editar'} ${campo.etiqueta.toLowerCase()}`,
                                        "aria-pressed": editando[campo.clave],
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconoEditar, {}, void 0, false, {
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
                        hayCambios && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].confirmar,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].etiqueta,
                                    htmlFor: "contrasena-actual",
                                    children: "Contraseña actual"
                                }, void 0, false, {
                                    fileName: "[project]/pages/perfil.js",
                                    lineNumber: 166,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "contrasena-actual",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].entrada,
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
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].error,
                            role: "alert",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/pages/perfil.js",
                            lineNumber: 181,
                            columnNumber: 31
                        }, this),
                        mensaje && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].exito,
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].acciones,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].guardar,
                            onClick: guardar,
                            disabled: !hayCambios || guardando,
                            children: guardando ? 'Guardando…' : 'Guardar cambios'
                        }, void 0, false, {
                            fileName: "[project]/pages/perfil.js",
                            lineNumber: 186,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$perfil$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].cerrar,
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
_s(Perfil, "dkzFibfo5A2NX7OGLjw0X5JXzf0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = Perfil;
var _c, _c1;
__turbopack_context__.k.register(_c, "IconoEditar");
__turbopack_context__.k.register(_c1, "Perfil");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/perfil.module.css [client] (css module)", ((__turbopack_context__) => {

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
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime/runtime-types.d.ts" />
/// <reference path="../../../shared/runtime/dev-globals.d.ts" />
/// <reference path="../../../shared/runtime/dev-protocol.d.ts" />
/// <reference path="../../../shared/runtime/dev-extensions.ts" />
__turbopack_context__.s([
    "TURBOPACK_CHUNK_UPDATE_LISTENERS_GLOBAL",
    ()=>TURBOPACK_CHUNK_UPDATE_LISTENERS_GLOBAL,
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
const TURBOPACK_CHUNK_UPDATE_LISTENERS_GLOBAL = 'TURBOPACK_CHUNK_UPDATE_LISTENERS';
let lastSeenHmrVersion;
function connect({ addMessageListener, sendMessage, onUpdateError = console.error, chunkUpdateListenersGlobal, initialHmrVersion }) {
    // Initialize before replaying socket messages or draining queued listeners.
    // A previously observed socket version takes priority on reconnection.
    lastSeenHmrVersion ??= initialHmrVersion;
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                if (lastSeenHmrVersion === undefined && msg.data !== undefined) {
                    lastSeenHmrVersion = msg.data.hmrVersion;
                }
                handleSocketConnected(sendMessage);
                break;
            case 'turbopack-message':
                lastSeenHmrVersion = msg.hmrVersion;
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
            case 'server-component-changes':
                lastSeenHmrVersion = msg.hmrVersion;
                break;
            default:
                break;
        }
    });
    const global = globalThis;
    const queued = global[chunkUpdateListenersGlobal];
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    global[chunkUpdateListenersGlobal] = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource,
        hmrVersion: lastSeenHmrVersion
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateB.type === 'total') {
        // A total update replaces the entire chunk, so it supersedes any prior update.
        return updateB;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__20e3g1pg1cpvl._.js.map