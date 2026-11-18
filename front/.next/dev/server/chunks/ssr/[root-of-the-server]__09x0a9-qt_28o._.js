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
"[project]/components/ModalReporte.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ModalReporte
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ModalReporte$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/ModalReporte.module.css [ssr] (css module)");
;
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
    const [motivo, setMotivo] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [detalle, setDetalle] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [enviando, setEnviando] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [enviado, setEnviado] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
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
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["pedirJSON"])(`/creaciones/${idCreacion}/reportes`, {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ModalReporte$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fondo,
        onClick: onCerrar,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ModalReporte$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].caja,
            onClick: (e)=>e.stopPropagation(),
            children: enviado ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        children: "Reporte enviado"
                    }, void 0, false, {
                        fileName: "[project]/components/ModalReporte.js",
                        lineNumber: 54,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        children: "Gracias. El equipo de verificación lo revisará."
                    }, void 0, false, {
                        fileName: "[project]/components/ModalReporte.js",
                        lineNumber: 55,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ModalReporte$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].botonEnviar,
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
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                onSubmit: enviar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        children: "Reportar creación"
                    }, void 0, false, {
                        fileName: "[project]/components/ModalReporte.js",
                        lineNumber: 60,
                        columnNumber: 25
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ModalReporte$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].error,
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/components/ModalReporte.js",
                        lineNumber: 61,
                        columnNumber: 35
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                        htmlFor: "motivo-reporte",
                        children: "Motivo"
                    }, void 0, false, {
                        fileName: "[project]/components/ModalReporte.js",
                        lineNumber: 63,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                        id: "motivo-reporte",
                        value: motivo,
                        onChange: (e)=>setMotivo(e.target.value),
                        required: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Selecciona un motivo"
                            }, void 0, false, {
                                fileName: "[project]/components/ModalReporte.js",
                                lineNumber: 70,
                                columnNumber: 29
                            }, this),
                            MOTIVOS.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                        htmlFor: "detalle-reporte",
                        children: "¿Qué es lo que incumple?"
                    }, void 0, false, {
                        fileName: "[project]/components/ModalReporte.js",
                        lineNumber: 76,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ModalReporte$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].botones,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ModalReporte$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].botonCancelar,
                                onClick: onCerrar,
                                children: "Cancelar"
                            }, void 0, false, {
                                fileName: "[project]/components/ModalReporte.js",
                                lineNumber: 87,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ModalReporte$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].botonEnviar,
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
}),
"[project]/components/ModalReporte.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "botonCancelar": "ModalReporte-module__LJ1dia__botonCancelar",
  "botonEnviar": "ModalReporte-module__LJ1dia__botonEnviar",
  "botones": "ModalReporte-module__LJ1dia__botones",
  "caja": "ModalReporte-module__LJ1dia__caja",
  "error": "ModalReporte-module__LJ1dia__error",
  "fondo": "ModalReporte-module__LJ1dia__fondo",
});
}),
"[project]/components/TarjetaCreacion.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TarjetaCreacion
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ModalReporte$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ModalReporte.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/components/TarjetaCreacion.module.css [ssr] (css module)");
;
;
;
;
;
function TarjetaCreacion({ creacion, onGuardar, guardado = false }) {
    const id = creacion.id_creacion ?? creacion.id;
    const materialesTexto = Array.isArray(creacion.materiales) ? creacion.materiales.map((m)=>`#${m.nombre || m}`).join(' ') : creacion.materiales || '#Material';
    const [menuAbierto, setMenuAbierto] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [reportando, setReportando] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("article", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fila,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].imagenCaja,
                children: creacion.imagen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                    src: creacion.imagen.startsWith('http') ? creacion.imagen : `http://localhost:4000${creacion.imagen}`,
                    alt: creacion.nombre
                }, void 0, false, {
                    fileName: "[project]/components/TarjetaCreacion.js",
                    lineNumber: 19,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                    width: "48",
                    height: "48",
                    viewBox: "0 0 24 24",
                    fill: "#6B8797",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].contenido,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].botonGuardar,
                        title: guardado ? 'Quitar de guardados' : 'Guardar creación',
                        "aria-label": guardado ? 'Quitar de guardados' : 'Guardar creación',
                        onClick: ()=>onGuardar && onGuardar(id),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                            width: "20",
                            height: "24",
                            viewBox: "0 0 24 24",
                            fill: guardado ? 'currentColor' : 'none',
                            stroke: "currentColor",
                            strokeWidth: "2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].botonMenu,
                        title: "Más opciones",
                        "aria-label": "Más opciones",
                        onClick: ()=>setMenuAbierto(!menuAbierto),
                        children: "⋮"
                    }, void 0, false, {
                        fileName: "[project]/components/TarjetaCreacion.js",
                        lineNumber: 51,
                        columnNumber: 17
                    }, this),
                    menuAbierto && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].menuOpciones,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].encabezado,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: `/creaciones/${id}`,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].titulo,
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].filaMateriales,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                children: materialesTexto
                            }, void 0, false, {
                                fileName: "[project]/components/TarjetaCreacion.js",
                                lineNumber: 82,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/creaciones/${id}`,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].verMas,
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].filaDescripcion,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].descripcionTexto,
                                children: creacion.descripcion
                            }, void 0, false, {
                                fileName: "[project]/components/TarjetaCreacion.js",
                                lineNumber: 87,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/creaciones/${id}`,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].verMas,
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
            reportando && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ModalReporte$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
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
}),
"[project]/components/TarjetaCreacion.module.css [ssr] (css module)", ((__turbopack_context__) => {

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
"[project]/pages/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/TarjetaCreacion.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/pages/index.module.css [ssr] (css module)");
;
;
;
;
;
;
function mezclar(lista) {
    const copia = [
        ...lista
    ];
    for(let i = copia.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [
            copia[j],
            copia[i]
        ];
    }
    return copia;
}
function Home() {
    const [creaciones, setCreaciones] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [usuario, setUsuario] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [idsFavoritos, setIdsFavoritos] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [pestana, setPestana] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('recomendados'); // 'recomendados' | 'mis-creaciones'
    const [materiales, setMateriales] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [materialSeleccionado, setMaterialSeleccionado] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    // Carga el usuario y sus favoritos una sola vez
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const u = localStorage.getItem('usuario');
        if (u) {
            const userObj = JSON.parse(u);
            setUsuario(userObj);
            const idUser = userObj.id_usuario ?? userObj.id;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["pedirJSON"])(`/favoritos/${idUser}`).then((favs)=>setIdsFavoritos(favs.map((f)=>f.id_creacion ?? f.id))).catch(()=>{});
        }
    }, []);
    // Carga el catálogo de materiales una sola vez
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["pedirJSON"])('/materiales').then((datos)=>setMateriales(Array.isArray(datos) ? datos : [])).catch(()=>setError('No se pudieron cargar los materiales.'));
    }, []);
    // Carga las creaciones al inicio y cada vez que cambia el material elegido
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        let vigente = true;
        const ruta = materialSeleccionado ? `/creaciones?material=${materialSeleccionado}` : '/creaciones';
        setError('');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["pedirJSON"])(ruta).then((datos)=>{
            if (vigente) setCreaciones(mezclar(datos));
        }).catch((err)=>{
            if (vigente) setError(err.message);
        });
        return ()=>{
            vigente = false;
        };
    }, [
        materialSeleccionado
    ]);
    // El filtro por material ya lo aplica el backend; aquí solo se filtra por pestaña
    const creacionesFiltradas = creaciones.filter((c)=>{
        if (pestana === 'mis-creaciones') {
            const idUsuarioActual = usuario?.id_usuario ?? usuario?.id;
            const idAutor = c.id_usuario ?? c.usuario_id;
            if (!idUsuarioActual || idAutor !== idUsuarioActual) return false;
        }
        return true;
    });
    async function manejarGuardar(idCreacion) {
        if (!usuario) {
            alert('Inicia sesión para guardar creaciones');
            return;
        }
        const idUser = usuario.id_usuario ?? usuario.id;
        const yaEsFavorito = idsFavoritos.includes(idCreacion);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["pedirJSON"])('/favoritos', {
                method: yaEsFavorito ? 'DELETE' : 'POST',
                body: JSON.stringify({
                    id_usuarios: idUser,
                    id_creacion: idCreacion
                })
            });
            setIdsFavoritos((prev)=>yaEsFavorito ? prev.filter((id)=>id !== idCreacion) : [
                    ...prev,
                    idCreacion
                ]);
        } catch (err) {
            alert(err.message);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fondo,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pestanas,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pestana} ${pestana === 'recomendados' ? __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pestanaActiva : ''}`,
                        onClick: ()=>setPestana('recomendados'),
                        children: "Recomendados"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 101,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pestana} ${pestana === 'mis-creaciones' ? __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pestanaActiva : ''}`,
                        onClick: ()=>setPestana('mis-creaciones'),
                        children: "Mis Creaciones"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 108,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 100,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].barraMateriales,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                        htmlFor: "filtro-material",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].etiquetaMateriales,
                        children: "Filtrar por material:"
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 119,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                        id: "filtro-material",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].selectMateriales,
                        value: materialSeleccionado,
                        onChange: (e)=>setMaterialSeleccionado(e.target.value),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Todos los materiales"
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 128,
                                columnNumber: 25
                            }, this),
                            materiales.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                    value: m.id_materiales,
                                    children: m.nombre
                                }, m.id_materiales, false, {
                                    fileName: "[project]/pages/index.js",
                                    lineNumber: 130,
                                    columnNumber: 29
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 122,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 118,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].contenedorLista,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        children: [
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#ffdddd'
                                },
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 140,
                                columnNumber: 35
                            }, this),
                            creacionesFiltradas.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#DCE6EC',
                                    textAlign: 'center',
                                    marginTop: '20px'
                                },
                                children: "No hay creaciones para mostrar en esta sección."
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 143,
                                columnNumber: 29
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].listaCreacion,
                                children: creacionesFiltradas.map((c)=>{
                                    const idCreacion = c.id_creacion ?? c.id;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TarjetaCreacion$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        creacion: c,
                                        onGuardar: manejarGuardar,
                                        guardado: idsFavoritos.includes(idCreacion)
                                    }, idCreacion, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 151,
                                        columnNumber: 41
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 147,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 139,
                        columnNumber: 21
                    }, this),
                    pestana === 'mis-creaciones' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].contenedorBotonNueva,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/creaciones/nueva",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].botonNuevaCreacion,
                            children: "Nueva Creacion"
                        }, void 0, false, {
                            fileName: "[project]/pages/index.js",
                            lineNumber: 165,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 164,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 138,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.js",
        lineNumber: 98,
        columnNumber: 13
    }, this);
}
}),
"[project]/pages/index.module.css [ssr] (css module)", ((__turbopack_context__) => {

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
];

//# sourceMappingURL=%5Broot-of-the-server%5D__09x0a9-qt_28o._.js.map