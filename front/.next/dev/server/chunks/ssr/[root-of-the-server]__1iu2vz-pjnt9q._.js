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
"[project]/pages/creaciones/[id].js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Creacion
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$creaciones$2f$nueva$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/pages/creaciones/nueva.module.css [ssr] (css module)");
;
;
;
;
;
;
function Creacion() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { id } = router.query;
    async function cargar() {
        const [errorCarga1, setErrorCarga1] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
        const [errorGuardar, setErrorGuardar1] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
        const [exito, setExito1] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
        const [creacion1, setCreacion] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
        const [usuario1, setUsuario] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
        try {
            setCreacion(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["pedirJSON"])(`/creaciones/${id}`));
            setErrorCarga1('');
        } catch (e) {
            setErrorCarga1(e.message);
        }
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
            if (!router.isReady) return;
            cargar();
        }, [
            router.isReady,
            id
        ]);
    }
    async function guardarCreacion(e) {
        e.preventDefrault();
        setExito('');
        setErrorGuardar('');
        if (!usuario) return setErrorGuardar('Inicia Sesion para guardar una creacion');
        if (guardados.some((a)=>a.creacion_id === creacion.id && a.usuario_id === usuario.id)) return setErrorCarga('Ya has guardado esta Creacion');
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["pedirJSON"])('/favoritos', {
                method: 'POST',
                body: JSON.stringify({
                    id_usuarios: usuario.id,
                    id_creacion: creacion.id
                })
            });
        } catch (err) {
            setErrorGuardar(errorToJSON.message);
        }
        if (errorCarga) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "error",
                children: errorCarga
            }, void 0, false, {
                fileName: "[project]/pages/creaciones/[id].js",
                lineNumber: 53,
                columnNumber: 38
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/creaciones/[id].js",
            lineNumber: 53,
            columnNumber: 32
        }, this);
        const usuarioCreacion = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["pedirJSON"])('/musuarios', {
            method: 'POST',
            body: JSON.stringify({})
        });
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "contenedor-creacion-datos",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                            children: creacion.nombre
                        }, void 0, false, {
                            fileName: "[project]/pages/creaciones/[id].js",
                            lineNumber: 63,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                children: [
                                    "Creacion de ",
                                    usuarioCreacion.nombre
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/creaciones/[id].js",
                                lineNumber: 64,
                                columnNumber: 24
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/creaciones/[id].js",
                            lineNumber: 64,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            children: creacion.descripcion
                        }, void 0, false, {
                            fileName: "[project]/pages/creaciones/[id].js",
                            lineNumber: 65,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/creaciones/[id].js",
                    lineNumber: 62,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "contenedor-creacion-contenido",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        children: creacion.instrucciones
                    }, void 0, false, {
                        fileName: "[project]/pages/creaciones/[id].js",
                        lineNumber: 68,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/creaciones/[id].js",
                    lineNumber: 67,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "contenedor-creacion-botones",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: "boton-1",
                            onClick: guardarCreacion(),
                            children: "Guardar"
                        }, void 0, false, {
                            fileName: "[project]/pages/creaciones/[id].js",
                            lineNumber: 71,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            className: "Boton-Link",
                            href: "/index",
                            children: "Regresar"
                        }, void 0, false, {
                            fileName: "[project]/pages/creaciones/[id].js",
                            lineNumber: 72,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: "boton-2",
                            children: "Reportar"
                        }, void 0, false, {
                            fileName: "[project]/pages/creaciones/[id].js",
                            lineNumber: 73,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/creaciones/[id].js",
                    lineNumber: 70,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/creaciones/[id].js",
            lineNumber: 61,
            columnNumber: 13
        }, this);
    }
}
}),
"[project]/pages/creaciones/nueva.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "bloqueMateriales": "nueva-module__9BjGqq__bloqueMateriales",
  "botonBorrador": "nueva-module__9BjGqq__botonBorrador",
  "botonCancelar": "nueva-module__9BjGqq__botonCancelar",
  "botonPublicar": "nueva-module__9BjGqq__botonPublicar",
  "cabeceraMateriales": "nueva-module__9BjGqq__cabeceraMateriales",
  "cajaDescripcion": "nueva-module__9BjGqq__cajaDescripcion",
  "cajaImagen": "nueva-module__9BjGqq__cajaImagen",
  "cajaInstrucciones": "nueva-module__9BjGqq__cajaInstrucciones",
  "chipMaterial": "nueva-module__9BjGqq__chipMaterial",
  "chipSeleccionado": "nueva-module__9BjGqq__chipSeleccionado",
  "contenedorChipsMateriales": "nueva-module__9BjGqq__contenedorChipsMateriales",
  "filaBotones": "nueva-module__9BjGqq__filaBotones",
  "filaMedia": "nueva-module__9BjGqq__filaMedia",
  "fondo": "nueva-module__9BjGqq__fondo",
  "inputMateriales": "nueva-module__9BjGqq__inputMateriales",
  "inputNombre": "nueva-module__9BjGqq__inputNombre",
  "previewImagen": "nueva-module__9BjGqq__previewImagen",
  "tarjetaAcciones": "nueva-module__9BjGqq__tarjetaAcciones",
  "tarjetaFormulario": "nueva-module__9BjGqq__tarjetaFormulario",
  "textoImagen": "nueva-module__9BjGqq__textoImagen",
  "titulo": "nueva-module__9BjGqq__titulo",
});
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1iu2vz-pjnt9q._.js.map