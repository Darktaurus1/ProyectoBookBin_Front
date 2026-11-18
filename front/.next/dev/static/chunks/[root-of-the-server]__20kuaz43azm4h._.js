(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/creaciones/favoritos.js\" }", (function(__turbopack_context__){
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/creaciones/favoritos.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/creaciones/favoritos.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/creaciones/favoritos";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/creaciones/favoritos.js [client] (ecmascript)");
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
"[project]/components/ModalReporte.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ModalReporte
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ModalReporte$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/ModalReporte.module.css [client] (css module)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const MOTIVOS = [
    {
        valor: 'inapropiado',
        texto: 'Contenido inapropiado u ofensivo'
    },
    {
        valor: 'spam',
        texto: 'Spam o publicidad'
    },
    {
        valor: 'peligroso',
        texto: 'Instrucciones peligrosas'
    },
    {
        valor: 'plagio',
        texto: 'Plagio o contenido robado'
    },
    {
        valor: 'otro',
        texto: 'Otro'
    }
];
function ModalReporte({ idCreacion, onCerrar }) {
    _s();
    const [motivo, setMotivo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [detalle, setDetalle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [enviando, setEnviando] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [enviado, setEnviado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const enviar = async (e)=>{
        e.preventDefault();
        setError('');
        const guardado = localStorage.getItem('usuario');
        if (!guardado) {
            setError('Inicia sesión para poder reportar.');
            return;
        }
        const usuario = JSON.parse(guardado);
        setEnviando(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$client$5d$__$28$ecmascript$29$__["pedirJSON"])(`/creaciones/${idCreacion}/reportes`, {
                method: 'POST',
                body: JSON.stringify({
                    id_usuario: usuario.id_usuario ?? usuario.id,
                    motivo,
                    detalle
                })
            });
            setEnviado(true);
        } catch (err) {
            setError(err.message);
        } finally{
            setEnviando(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ModalReporte$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].fondo,
        onClick: onCerrar,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ModalReporte$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].caja,
            onClick: (e)=>e.stopPropagation(),
            children: enviado ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Reporte enviado"
                    }, void 0, false, {
                        fileName: "[project]/components/ModalReporte.js",
                        lineNumber: 54,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Gracias. El equipo de verificación lo revisará."
                    }, void 0, false, {
                        fileName: "[project]/components/ModalReporte.js",
                        lineNumber: 55,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ModalReporte$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].botonEnviar,
                        onClick: onCerrar,
                        children: "Cerrar"
                    }, void 0, false, {
                        fileName: "[project]/components/ModalReporte.js",
                        lineNumber: 56,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ModalReporte.js",
                lineNumber: 53,
                columnNumber: 21
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: enviar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Reportar creación"
                    }, void 0, false, {
                        fileName: "[project]/components/ModalReporte.js",
                        lineNumber: 60,
                        columnNumber: 25
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ModalReporte$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].error,
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/components/ModalReporte.js",
                        lineNumber: 61,
                        columnNumber: 35
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "motivo-reporte",
                        children: "Motivo"
                    }, void 0, false, {
                        fileName: "[project]/components/ModalReporte.js",
                        lineNumber: 63,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        id: "motivo-reporte",
                        value: motivo,
                        onChange: (e)=>setMotivo(e.target.value),
                        required: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Selecciona un motivo"
                            }, void 0, false, {
                                fileName: "[project]/components/ModalReporte.js",
                                lineNumber: 70,
                                columnNumber: 29
                            }, this),
                            MOTIVOS.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: m.valor,
                                    children: m.texto
                                }, m.valor, false, {
                                    fileName: "[project]/components/ModalReporte.js",
                                    lineNumber: 72,
                                    columnNumber: 33
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ModalReporte.js",
                        lineNumber: 64,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "detalle-reporte",
                        children: "¿Qué es lo que incumple?"
                    }, void 0, false, {
                        fileName: "[project]/components/ModalReporte.js",
                        lineNumber: 76,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        id: "detalle-reporte",
                        value: detalle,
                        onChange: (e)=>setDetalle(e.target.value),
                        minLength: 10,
                        maxLength: 300,
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/components/ModalReporte.js",
                        lineNumber: 77,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ModalReporte$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].botones,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ModalReporte$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].botonCancelar,
                                onClick: onCerrar,
                                children: "Cancelar"
                            }, void 0, false, {
                                fileName: "[project]/components/ModalReporte.js",
                                lineNumber: 87,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ModalReporte$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].botonEnviar,
                                disabled: enviando,
                                children: enviando ? 'Enviando...' : 'Reportar'
                            }, void 0, false, {
                                fileName: "[project]/components/ModalReporte.js",
                                lineNumber: 88,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ModalReporte.js",
                        lineNumber: 86,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ModalReporte.js",
                lineNumber: 59,
                columnNumber: 21
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/ModalReporte.js",
            lineNumber: 51,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ModalReporte.js",
        lineNumber: 50,
        columnNumber: 9
    }, this);
}
_s(ModalReporte, "KSyYsAVl9SvRgbcnpDV3tPCm/e0=");
_c = ModalReporte;
var _c;
__turbopack_context__.k.register(_c, "ModalReporte");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ModalReporte.module.css [client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "botonCancelar": "ModalReporte-module__LJ1dia__botonCancelar",
  "botonEnviar": "ModalReporte-module__LJ1dia__botonEnviar",
  "botones": "ModalReporte-module__LJ1dia__botones",
  "caja": "ModalReporte-module__LJ1dia__caja",
  "error": "ModalReporte-module__LJ1dia__error",
  "fondo": "ModalReporte-module__LJ1dia__fondo",
});
}),
"[project]/components/TarjetaCreacion.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TarjetaCreacion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ModalReporte$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ModalReporte.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/TarjetaCreacion.module.css [client] (css module)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function TarjetaCreacion({ creacion, onGuardar, guardado = false }) {
    _s();
    const id = creacion.id_creacion ?? creacion.id;
    const materialesTexto = Array.isArray(creacion.materiales) ? creacion.materiales.map((m)=>`#${m.nombre || m}`).join(' ') : creacion.materiales || '#Material';
    const [menuAbierto, setMenuAbierto] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reportando, setReportando] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].fila,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].imagenCaja,
                children: creacion.imagen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: creacion.imagen.startsWith('http') ? creacion.imagen : `http://localhost:4000${creacion.imagen}`,
                    alt: creacion.nombre
                }, void 0, false, {
                    fileName: "[project]/components/TarjetaCreacion.js",
                    lineNumber: 19,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: "48",
                    height: "48",
                    viewBox: "0 0 24 24",
                    fill: "#6B8797",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
                    }, void 0, false, {
                        fileName: "[project]/components/TarjetaCreacion.js",
                        lineNumber: 25,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/TarjetaCreacion.js",
                    lineNumber: 24,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/TarjetaCreacion.js",
                lineNumber: 17,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contenido,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].botonGuardar,
                        title: guardado ? 'Quitar de guardados' : 'Guardar creación',
                        "aria-label": guardado ? 'Quitar de guardados' : 'Guardar creación',
                        onClick: ()=>onGuardar && onGuardar(id),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "20",
                            height: "24",
                            viewBox: "0 0 24 24",
                            fill: guardado ? 'currentColor' : 'none',
                            stroke: "currentColor",
                            strokeWidth: "2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
                            }, void 0, false, {
                                fileName: "[project]/components/TarjetaCreacion.js",
                                lineNumber: 46,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/TarjetaCreacion.js",
                            lineNumber: 38,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/TarjetaCreacion.js",
                        lineNumber: 31,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].botonMenu,
                        title: "Más opciones",
                        "aria-label": "Más opciones",
                        onClick: ()=>setMenuAbierto(!menuAbierto),
                        children: "⋮"
                    }, void 0, false, {
                        fileName: "[project]/components/TarjetaCreacion.js",
                        lineNumber: 51,
                        columnNumber: 17
                    }, this),
                    menuAbierto && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].menuOpciones,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>{
                                setMenuAbierto(false);
                                setReportando(true);
                            },
                            children: "Reportar"
                        }, void 0, false, {
                            fileName: "[project]/components/TarjetaCreacion.js",
                            lineNumber: 63,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/TarjetaCreacion.js",
                        lineNumber: 62,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].encabezado,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            href: `/creaciones/${id}`,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].titulo,
                            children: creacion.nombre
                        }, void 0, false, {
                            fileName: "[project]/components/TarjetaCreacion.js",
                            lineNumber: 76,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/TarjetaCreacion.js",
                        lineNumber: 75,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].filaMateriales,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: materialesTexto
                            }, void 0, false, {
                                fileName: "[project]/components/TarjetaCreacion.js",
                                lineNumber: 82,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/creaciones/${id}`,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].verMas,
                                children: "Más.."
                            }, void 0, false, {
                                fileName: "[project]/components/TarjetaCreacion.js",
                                lineNumber: 83,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/TarjetaCreacion.js",
                        lineNumber: 81,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].filaDescripcion,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].descripcionTexto,
                                children: creacion.descripcion
                            }, void 0, false, {
                                fileName: "[project]/components/TarjetaCreacion.js",
                                lineNumber: 87,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/creaciones/${id}`,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].verMas,
                                children: "Más..."
                            }, void 0, false, {
                                fileName: "[project]/components/TarjetaCreacion.js",
                                lineNumber: 88,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/TarjetaCreacion.js",
                        lineNumber: 86,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/TarjetaCreacion.js",
                lineNumber: 30,
                columnNumber: 13
            }, this),
            reportando && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ModalReporte$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                idCreacion: id,
                onCerrar: ()=>setReportando(false)
            }, void 0, false, {
                fileName: "[project]/components/TarjetaCreacion.js",
                lineNumber: 94,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/TarjetaCreacion.js",
        lineNumber: 16,
        columnNumber: 9
    }, this);
}
_s(TarjetaCreacion, "gfBtLMGbeNeLNUvRb0n/PimZhrE=");
_c = TarjetaCreacion;
var _c;
__turbopack_context__.k.register(_c, "TarjetaCreacion");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/TarjetaCreacion.module.css [client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "botonGuardar": "TarjetaCreacion-module__AtMrxa__botonGuardar",
  "botonMenu": "TarjetaCreacion-module__AtMrxa__botonMenu",
  "contenido": "TarjetaCreacion-module__AtMrxa__contenido",
  "descripcionTexto": "TarjetaCreacion-module__AtMrxa__descripcionTexto",
  "encabezado": "TarjetaCreacion-module__AtMrxa__encabezado",
  "fila": "TarjetaCreacion-module__AtMrxa__fila",
  "filaDescripcion": "TarjetaCreacion-module__AtMrxa__filaDescripcion",
  "filaMateriales": "TarjetaCreacion-module__AtMrxa__filaMateriales",
  "imagenCaja": "TarjetaCreacion-module__AtMrxa__imagenCaja",
  "menuOpciones": "TarjetaCreacion-module__AtMrxa__menuOpciones",
  "titulo": "TarjetaCreacion-module__AtMrxa__titulo",
  "verMas": "TarjetaCreacion-module__AtMrxa__verMas",
});
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
"[project]/pages/creaciones/favoritos.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Guardados
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/TarjetaCreacion.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/pages/index.module.css [client] (css module)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function Guardados() {
    _s();
    // undefined = leyendo localStorage, null = sin sesión
    const [usuario, setUsuario] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [favoritos, setFavoritos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Guardados.useEffect": ()=>{
            try {
                const u = JSON.parse(localStorage.getItem('usuario'));
                setUsuario(u || null);
                if (u) {
                    const idUsuario = u.id_usuario ?? u.id;
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$client$5d$__$28$ecmascript$29$__["pedirJSON"])(`/favoritos/${idUsuario}`).then(setFavoritos).catch({
                        "Guardados.useEffect": (err)=>setError(err.message)
                    }["Guardados.useEffect"]);
                }
            } catch  {
                setUsuario(null);
            }
        }
    }["Guardados.useEffect"], []);
    // Quitar de favoritos cuando vuelve a presionar el botón de guardar en esta pantalla
    async function manejarQuitar(idCreacion) {
        if (!usuario) return;
        const idUsuario = usuario.id_usuario ?? usuario.id;
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$client$5d$__$28$ecmascript$29$__["pedirJSON"])('/favoritos', {
                method: 'DELETE',
                body: JSON.stringify({
                    id_usuarios: idUsuario,
                    id_creacion: idCreacion
                })
            });
            // Quita la tarjeta de la pantalla al instante sin recargar
            setFavoritos((prev)=>prev.filter((c)=>(c.id_creacion ?? c.id) !== idCreacion));
        } catch (err) {
            alert(err.message);
        }
    }
    if (usuario === undefined) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].fondo,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    color: '#DCE6EC'
                },
                children: "Cargando..."
            }, void 0, false, {
                fileName: "[project]/pages/creaciones/favoritos.js",
                lineNumber: 53,
                columnNumber: 47
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/creaciones/favoritos.js",
            lineNumber: 53,
            columnNumber: 16
        }, this);
    }
    if (usuario === null) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].fondo,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    color: '#DCE6EC',
                    textAlign: 'center',
                    marginTop: '40px'
                },
                children: [
                    "Inicia sesión para ver tus creaciones guardadas.",
                    ' ',
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/login",
                        style: {
                            color: '#FFFFFF',
                            textDecoration: 'underline'
                        },
                        children: "Ir a iniciar sesión"
                    }, void 0, false, {
                        fileName: "[project]/pages/creaciones/favoritos.js",
                        lineNumber: 61,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/creaciones/favoritos.js",
                lineNumber: 59,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/creaciones/favoritos.js",
            lineNumber: 58,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].fondo,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pestanas,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pestana} ${__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pestanaActiva}`,
                    style: {
                        textAlign: 'center',
                        cursor: 'default'
                    },
                    children: "Creaciones Guardadas"
                }, void 0, false, {
                    fileName: "[project]/pages/creaciones/favoritos.js",
                    lineNumber: 72,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/creaciones/favoritos.js",
                lineNumber: 71,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].contenedorLista,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                color: '#ffdddd'
                            },
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/pages/creaciones/favoritos.js",
                            lineNumber: 79,
                            columnNumber: 31
                        }, this),
                        favoritos.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                color: '#DCE6EC',
                                textAlign: 'center',
                                marginTop: '20px'
                            },
                            children: "Aún no has guardado ninguna creación."
                        }, void 0, false, {
                            fileName: "[project]/pages/creaciones/favoritos.js",
                            lineNumber: 82,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].listaCreacion,
                            children: favoritos.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    creacion: c,
                                    guardado: true,
                                    onGuardar: manejarQuitar
                                }, c.id_creacion ?? c.id, false, {
                                    fileName: "[project]/pages/creaciones/favoritos.js",
                                    lineNumber: 88,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/pages/creaciones/favoritos.js",
                            lineNumber: 86,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/creaciones/favoritos.js",
                    lineNumber: 78,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/creaciones/favoritos.js",
                lineNumber: 77,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/creaciones/favoritos.js",
        lineNumber: 70,
        columnNumber: 9
    }, this);
}
_s(Guardados, "p/DBhMF41eZPdYN0SekUEbOmVMk=");
_c = Guardados;
var _c;
__turbopack_context__.k.register(_c, "Guardados");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/index.module.css [client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "barraMateriales": "index-module__KWKY6G__barraMateriales",
  "botonMateriales": "index-module__KWKY6G__botonMateriales",
  "botonNuevaCreacion": "index-module__KWKY6G__botonNuevaCreacion",
  "chip": "index-module__KWKY6G__chip",
  "chipActivo": "index-module__KWKY6G__chipActivo",
  "contenedorBotonNueva": "index-module__KWKY6G__contenedorBotonNueva",
  "contenedorLista": "index-module__KWKY6G__contenedorLista",
  "fondo": "index-module__KWKY6G__fondo",
  "listaChips": "index-module__KWKY6G__listaChips",
  "listaCreacion": "index-module__KWKY6G__listaCreacion",
  "pestana": "index-module__KWKY6G__pestana",
  "pestanaActiva": "index-module__KWKY6G__pestanaActiva",
  "pestanas": "index-module__KWKY6G__pestanas",
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

//# sourceMappingURL=%5Broot-of-the-server%5D__20kuaz43azm4h._.js.map