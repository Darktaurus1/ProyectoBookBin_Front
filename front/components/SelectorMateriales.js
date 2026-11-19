import { useEffect, useId, useMemo, useRef, useState } from 'react';
import styles from './SelectorMateriales.module.css';

// Quita acentos y mayúsculas: "Plástico" y "plastico" cuentan igual
function normalizar(texto) {
    return String(texto || '')
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .trim();
}

export const CANTIDAD_MAXIMA = 999;

// Campo numérico que deja borrar y reescribir; si queda vacío, al salir regresa al valor anterior
function CampoCantidad({ valor, onCambiar, etiqueta, className }) {
    const [texto, setTexto] = useState(String(valor));

    useEffect(() => {
        setTexto(String(valor));
    }, [valor]);

    return (
        <input
            type="number"
            inputMode="numeric"
            min={1}
            max={CANTIDAD_MAXIMA}
            className={className}
            aria-label={etiqueta}
            value={texto}
            onChange={(e) => {
                setTexto(e.target.value);
                if (e.target.value !== '') onCambiar(e.target.value);
            }}
            onBlur={() => setTexto(String(valor))}
            onFocus={(e) => e.target.select()}
        />
    );
}

export default function SelectorMateriales({
    catalogo,
    seleccionados,
    onCambiar,
    cantidades = {},
    onCambiarCantidades,
    cargando = false,
    error = '',
}) {
    const idLista = useId();
    const inputRef = useRef(null);
    const [busqueda, setBusqueda] = useState('');
    const [abierto, setAbierto] = useState(false);
    const [activo, setActivo] = useState(0);

    const materialesSeleccionados = seleccionados
        .map((idM) => catalogo.find((m) => m.id_materiales === idM))
        .filter(Boolean);

    // Coincidencias: primero los que empiezan con lo escrito, luego los que lo contienen
    const resultados = useMemo(() => {
        const q = normalizar(busqueda);
        const disponibles = catalogo.filter((m) => !seleccionados.includes(m.id_materiales));
        if (!q) return disponibles;

        const empiezan = [];
        const contienen = [];
        for (const m of disponibles) {
            const nombre = normalizar(m.nombre);
            const extra = normalizar(`${m.codigo || ''} ${m.descripcion || ''}`);
            if (nombre.startsWith(q)) empiezan.push(m);
            else if (nombre.includes(q) || extra.includes(q)) contienen.push(m);
        }
        return [...empiezan, ...contienen];
    }, [busqueda, catalogo, seleccionados]);

    const agregar = (material) => {
        onCambiar([...seleccionados, material.id_materiales]);
        onCambiarCantidades?.({ ...cantidades, [material.id_materiales]: 1 });
        setBusqueda('');
        setActivo(0);
        inputRef.current?.focus();
    };

    const quitar = (idMaterial) => {
        onCambiar(seleccionados.filter((idM) => idM !== idMaterial));
        if (onCambiarCantidades) {
            const { [idMaterial]: _, ...resto } = cantidades;
            onCambiarCantidades(resto);
        }
    };

    // Cantidad entre 1 y 999; si escriben algo inválido se queda en 1
    const cambiarCantidad = (idMaterial, valor) => {
        const numero = Math.round(Number(valor));
        const cantidad = Number.isFinite(numero) ? Math.min(Math.max(numero, 1), CANTIDAD_MAXIMA) : 1;
        onCambiarCantidades?.({ ...cantidades, [idMaterial]: cantidad });
    };

    const manejarTeclas = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setAbierto(true);
            setActivo((i) => Math.min(i + 1, resultados.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActivo((i) => Math.max(i - 1, 0));
        } else if (e.key === 'Enter') {
            // Enter agrega el material resaltado y no envía el formulario
            if (abierto && resultados[activo]) {
                e.preventDefault();
                agregar(resultados[activo]);
            }
        } else if (e.key === 'Escape') {
            setAbierto(false);
        } else if (e.key === 'Backspace' && busqueda === '' && seleccionados.length > 0) {
            quitar(seleccionados[seleccionados.length - 1]);
        }
    };

    const mostrarLista = abierto && !cargando && catalogo.length > 0;
    const idActivo = mostrarLista && resultados[activo] ? `${idLista}-${resultados[activo].id_materiales}` : undefined;

    return (
        <div className={styles.bloque}>
            <div className={styles.cabecera}>
                <label htmlFor={`${idLista}-buscar`}>Materiales utilizados</label>
                <span>{seleccionados.length} seleccionados</span>
            </div>

            <div className={styles.cuerpo}>
                {/* Materiales ya elegidos, con su cantidad */}
                {materialesSeleccionados.length > 0 && (
                    <ul className={styles.elegidos} aria-label="Materiales seleccionados">
                        {materialesSeleccionados.map((m) => {
                            const cantidad = cantidades[m.id_materiales] ?? 1;
                            return (
                                <li key={m.id_materiales} className={styles.fila}>
                                    <span className={styles.nombreFila}>{m.nombre}</span>

                                    {onCambiarCantidades && (
                                        <div className={styles.cantidad} role="group" aria-label={`Cantidad de ${m.nombre}`}>
                                            <button
                                                type="button"
                                                className={styles.botonCantidad}
                                                aria-label={`Quitar uno de ${m.nombre}`}
                                                disabled={cantidad <= 1}
                                                onClick={() => cambiarCantidad(m.id_materiales, cantidad - 1)}
                                            >
                                                −
                                            </button>
                                            <CampoCantidad
                                                valor={cantidad}
                                                className={styles.numeroCantidad}
                                                etiqueta={`Cantidad de ${m.nombre}`}
                                                onCambiar={(v) => cambiarCantidad(m.id_materiales, v)}
                                            />
                                            <button
                                                type="button"
                                                className={styles.botonCantidad}
                                                aria-label={`Agregar uno de ${m.nombre}`}
                                                disabled={cantidad >= CANTIDAD_MAXIMA}
                                                onClick={() => cambiarCantidad(m.id_materiales, cantidad + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    )}

                                    <button
                                        type="button"
                                        className={styles.quitar}
                                        aria-label={`Quitar ${m.nombre}`}
                                        onClick={() => quitar(m.id_materiales)}
                                    >
                                        ×
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}

                {/* Buscador con lista desplegable */}
                <div className={styles.buscador}>
                    <svg className={styles.lupa} width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                        <circle cx="11" cy="11" r="7" />
                        <line x1="20" y1="20" x2="16.2" y2="16.2" />
                    </svg>
                    <input
                        ref={inputRef}
                        id={`${idLista}-buscar`}
                        type="text"
                        className={styles.input}
                        placeholder={cargando ? 'Cargando materiales...' : 'Busca un material: plástico, cartón, vidrio...'}
                        autoComplete="off"
                        disabled={cargando}
                        role="combobox"
                        aria-expanded={mostrarLista}
                        aria-controls={idLista}
                        aria-activedescendant={idActivo}
                        aria-autocomplete="list"
                        value={busqueda}
                        onChange={(e) => {
                            setBusqueda(e.target.value);
                            setActivo(0);
                            setAbierto(true);
                        }}
                        onFocus={() => setAbierto(true)}
                        onBlur={() => setAbierto(false)}
                        onKeyDown={manejarTeclas}
                    />

                    {mostrarLista && (
                        <ul id={idLista} role="listbox" className={styles.lista}>
                            {resultados.length === 0 ? (
                                <li className={styles.vacio}>
                                    {busqueda ? `No hay materiales que coincidan con "${busqueda}"` : 'Ya seleccionaste todos los materiales'}
                                </li>
                            ) : (
                                resultados.map((m, i) => (
                                    <li
                                        key={m.id_materiales}
                                        id={`${idLista}-${m.id_materiales}`}
                                        role="option"
                                        aria-selected={i === activo}
                                        className={`${styles.opcion} ${i === activo ? styles.opcionActiva : ''}`}
                                        // mousedown en lugar de click para que el input no pierda el foco antes
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            agregar(m);
                                        }}
                                        onMouseEnter={() => setActivo(i)}
                                    >
                                        <span className={styles.nombreOpcion}>+ {m.nombre}</span>
                                        {m.descripcion && <span className={styles.detalleOpcion}>{m.descripcion}</span>}
                                    </li>
                                ))
                            )}
                        </ul>
                    )}
                </div>

                {error && <p className={styles.error}>{error}</p>}
                {!error && seleccionados.length === 0 && !cargando && (
                    <p className={styles.ayuda}>Escribe para buscar y presiona Enter o haz clic para agregar.</p>
                )}
            </div>
        </div>
    );
}