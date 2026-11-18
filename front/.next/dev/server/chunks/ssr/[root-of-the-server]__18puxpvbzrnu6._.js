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
"[project]/pages/admin.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PanelAdministradorVerificadores
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$admin$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/pages/admin.module.css [ssr] (css module)");
;
;
;
;
;
const FORMULARIO_VACIO = {
    nombre: '',
    correo: '',
    contrasena: '',
    rol: 'verificador'
};
function PanelAdministradorVerificadores() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [admin, setAdmin] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [verificadores, setVerificadores] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [mensaje, setMensaje] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [nuevoVerificador, setNuevoVerificador] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(FORMULARIO_VACIO);
    // Solo deja entrar a un administrador con sesión iniciada
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        let u = null;
        try {
            u = JSON.parse(localStorage.getItem('usuario'));
        } catch  {
            u = null;
        }
        if (!u || u.tipo !== 'administrador') {
            router.replace('/login');
            return;
        }
        setAdmin(u);
        cargarVerificadores();
    }, []);
    const cargarVerificadores = async ()=>{
        try {
            setError('');
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["pedirJSON"])('/admin/verificadores');
            setVerificadores(data || []);
        } catch (err) {
            setError(err.message || 'Error al cargar la lista de verificadores.');
        }
    };
    const handleChangeInput = (e)=>{
        setNuevoVerificador({
            ...nuevoVerificador,
            [e.target.name]: e.target.value
        });
    };
    const handleCrearVerificador = async (e)=>{
        e.preventDefault();
        setMensaje('');
        setError('');
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["pedirJSON"])('/admin/verificadores', {
                method: 'POST',
                body: JSON.stringify({
                    ...nuevoVerificador,
                    id_administrador: admin.id_administrador
                })
            });
            setMensaje(res.mensaje || 'Cuenta de verificador creada con éxito');
            setNuevoVerificador(FORMULARIO_VACIO);
            cargarVerificadores();
        } catch (err) {
            setError(err.message || 'Error al crear el verificador.');
        }
    };
    const handleCambiarRol = async (id, nuevoRol)=>{
        try {
            setError('');
            setMensaje('');
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["pedirJSON"])(`/admin/verificadores/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    rol: nuevoRol
                })
            });
            setMensaje('Rol actualizado con éxito');
            cargarVerificadores();
        } catch (err) {
            setError(err.message || 'Error al actualizar el rol.');
        }
    };
    const handleBorrarVerificador = async (id)=>{
        if (!confirm('¿Estás seguro de eliminar esta cuenta de verificador?')) return;
        try {
            setError('');
            setMensaje('');
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["pedirJSON"])(`/admin/verificadores/${id}`, {
                method: 'DELETE'
            });
            setMensaje('Cuenta de verificador eliminada con éxito');
            cargarVerificadores();
        } catch (err) {
            setError(err.message || 'Error al eliminar la cuenta.');
        }
    };
    // No muestra nada mientras revisa la sesión (o si no es admin)
    if (!admin) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$admin$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['admin-contenedor'],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$admin$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['admin-tarjeta'],
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    children: "Panel de Administrador"
                }, void 0, false, {
                    fileName: "[project]/pages/admin.js",
                    lineNumber: 96,
                    columnNumber: 17
                }, this),
                mensaje && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$admin$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['alerta-exito'],
                    children: mensaje
                }, void 0, false, {
                    fileName: "[project]/pages/admin.js",
                    lineNumber: 98,
                    columnNumber: 29
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$admin$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['alerta-error'],
                    children: error
                }, void 0, false, {
                    fileName: "[project]/pages/admin.js",
                    lineNumber: 99,
                    columnNumber: 27
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$admin$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['seccion-formulario'],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                            children: "Crear Cuenta de Verificador"
                        }, void 0, false, {
                            fileName: "[project]/pages/admin.js",
                            lineNumber: 103,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                            onSubmit: handleCrearVerificador,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$admin$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['campo'],
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            htmlFor: "nombre",
                                            children: "Nombre:"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin.js",
                                            lineNumber: 106,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            id: "nombre",
                                            type: "text",
                                            name: "nombre",
                                            maxLength: 50,
                                            value: nuevoVerificador.nombre,
                                            onChange: handleChangeInput,
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin.js",
                                            lineNumber: 107,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/admin.js",
                                    lineNumber: 105,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$admin$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['campo'],
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            htmlFor: "correo",
                                            children: "Correo:"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin.js",
                                            lineNumber: 118,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            id: "correo",
                                            type: "email",
                                            name: "correo",
                                            maxLength: 45,
                                            value: nuevoVerificador.correo,
                                            onChange: handleChangeInput,
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin.js",
                                            lineNumber: 119,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/admin.js",
                                    lineNumber: 117,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$admin$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['campo'],
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            htmlFor: "contrasena",
                                            children: "Contraseña:"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin.js",
                                            lineNumber: 130,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            id: "contrasena",
                                            type: "password",
                                            name: "contrasena",
                                            minLength: 8,
                                            maxLength: 72,
                                            value: nuevoVerificador.contrasena,
                                            onChange: handleChangeInput,
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin.js",
                                            lineNumber: 131,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/admin.js",
                                    lineNumber: 129,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$admin$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['campo'],
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            htmlFor: "rol",
                                            children: "Elegir Rol:"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/admin.js",
                                            lineNumber: 143,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                            id: "rol",
                                            name: "rol",
                                            value: nuevoVerificador.rol,
                                            onChange: handleChangeInput,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "verificador",
                                                    children: "Verificador (Normal)"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin.js",
                                                    lineNumber: 145,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                    value: "verificador_lider",
                                                    children: "Verificador Líder"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin.js",
                                                    lineNumber: 146,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/admin.js",
                                            lineNumber: 144,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/admin.js",
                                    lineNumber: 142,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    children: "Crear Verificador"
                                }, void 0, false, {
                                    fileName: "[project]/pages/admin.js",
                                    lineNumber: 149,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/admin.js",
                            lineNumber: 104,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/admin.js",
                    lineNumber: 102,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                            children: "Verificadores Registrados"
                        }, void 0, false, {
                            fileName: "[project]/pages/admin.js",
                            lineNumber: 155,
                            columnNumber: 21
                        }, this),
                        verificadores.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: {
                                textAlign: 'center',
                                color: '#5885A1',
                                padding: '20px'
                            },
                            children: "No hay verificadores registrados actualmente."
                        }, void 0, false, {
                            fileName: "[project]/pages/admin.js",
                            lineNumber: 157,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$admin$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['tabla-contenedor'],
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("table", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$admin$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['tabla-verificadores'],
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Nombre"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin.js",
                                                    lineNumber: 165,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Correo"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin.js",
                                                    lineNumber: 166,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Rol"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin.js",
                                                    lineNumber: 167,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Admin Asignado"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin.js",
                                                    lineNumber: 168,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                                    children: "Acciones"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/admin.js",
                                                    lineNumber: 169,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/admin.js",
                                            lineNumber: 164,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin.js",
                                        lineNumber: 163,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tbody", {
                                        children: verificadores.map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: v.nombre
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin.js",
                                                        lineNumber: 175,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: v.correo
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin.js",
                                                        lineNumber: 176,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                            value: v.rol,
                                                            "aria-label": `Rol de ${v.nombre}`,
                                                            onChange: (e)=>handleCambiarRol(v.id_verificador, e.target.value),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                    value: "verificador",
                                                                    children: "Verificador"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/admin.js",
                                                                    lineNumber: 183,
                                                                    columnNumber: 53
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                                    value: "verificador_lider",
                                                                    children: "Verificador Líder"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/admin.js",
                                                                    lineNumber: 184,
                                                                    columnNumber: 53
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/admin.js",
                                                            lineNumber: 178,
                                                            columnNumber: 49
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin.js",
                                                        lineNumber: 177,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: v.id_administrador || 'N/D'
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin.js",
                                                        lineNumber: 187,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$admin$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"]['btn-borrar'],
                                                            onClick: ()=>handleBorrarVerificador(v.id_verificador),
                                                            children: "Borrar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/admin.js",
                                                            lineNumber: 189,
                                                            columnNumber: 49
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/admin.js",
                                                        lineNumber: 188,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, v.id_verificador, true, {
                                                fileName: "[project]/pages/admin.js",
                                                lineNumber: 174,
                                                columnNumber: 41
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/admin.js",
                                        lineNumber: 172,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/admin.js",
                                lineNumber: 162,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/admin.js",
                            lineNumber: 161,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/admin.js",
                    lineNumber: 154,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/pages/admin.js",
            lineNumber: 95,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/pages/admin.js",
        lineNumber: 94,
        columnNumber: 9
    }, this);
}
}),
"[project]/pages/admin.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "admin-contenedor": "admin-module__UBPAFG__admin-contenedor",
  "admin-tarjeta": "admin-module__UBPAFG__admin-tarjeta",
  "alerta-error": "admin-module__UBPAFG__alerta-error",
  "alerta-exito": "admin-module__UBPAFG__alerta-exito",
  "btn-borrar": "admin-module__UBPAFG__btn-borrar",
  "campo": "admin-module__UBPAFG__campo",
  "seccion-formulario": "admin-module__UBPAFG__seccion-formulario",
  "tabla-contenedor": "admin-module__UBPAFG__tabla-contenedor",
  "tabla-verificadores": "admin-module__UBPAFG__tabla-verificadores",
});
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__18puxpvbzrnu6._.js.map