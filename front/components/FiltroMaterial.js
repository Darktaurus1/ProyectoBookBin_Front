import { useId, useMemo, useState } from 'react';
import styles from './FiltroMaterial.module.css';

// Quita acentos y mayúsculas: "Plástico" y "plastico" cuentan igual
function normalizar(texto) {
    return String(texto || '')
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .trim();
}

// Buscador para elegir UN material como filtro
export default function FiltroMaterial({ catalogo, seleccionado, onElegir, cargando = false }) {
    const idLista = useId();
    const [busqueda, setBusqueda] = useState('');
    const [abierto, setAbierto] = useState(false);
    const [activo, setActivo] = useState(0);

    // Primero los que empiezan con lo escrito, luego los que lo contienen
    const resultados = useMemo(() => {
        const q = normalizar(busqueda);
        const disponibles = catalogo.filter((m) => String(m.id_materiales) !== String(seleccionado));
        if (!q) return disponibles;

        const empiezan = [];
        const contienen = [];
        for (const m of disponibles) {
            const nombre = normalizar(m.nombre);
            if (nombre.startsWith(q)) empiezan.push(m);
            else if (nombre.includes(q) || normalizar(m.descripcion).includes(q)) contienen.push(m);
        }
        return [...empiezan, ...contienen];
    }, [busqueda, catalogo, seleccionado]);

    const elegir = (material) => {
        onElegir(material);
        setBusqueda('');
        setActivo(0);
        setAbierto(false);
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
            e.preventDefault();
            if (abierto && resultados[activo]) elegir(resultados[activo]);
        } else if (e.key === 'Escape') {
            setAbierto(false);
        }
    };

    const mostrarLista = abierto && !cargando && catalogo.length > 0;
    const idActivo = mostrarLista && resultados[activo] ? `${idLista}-${resultados[activo].id_materiales}` : undefined;

    return (
        <div className={styles.buscador}>
            <svg className={styles.lupa} width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <line x1="20" y1="20" x2="16.2" y2="16.2" />
            </svg>
            <input
                type="text"
                className={styles.input}
                placeholder={cargando ? 'Cargando materiales...' : 'Filtrar por material: plástico, cartón...'}
                aria-label="Filtrar por material"
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
                        <li className={styles.vacio}>No hay materiales que coincidan con "{busqueda}"</li>
                    ) : (
                        resultados.map((m, i) => (
                            <li
                                key={m.id_materiales}
                                id={`${idLista}-${m.id_materiales}`}
                                role="option"
                                aria-selected={i === activo}
                                className={`${styles.opcion} ${i === activo ? styles.opcionActiva : ''}`}
                                // mousedown para que el input no pierda el foco antes de elegir
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    elegir(m);
                                }}
                                onMouseEnter={() => setActivo(i)}
                            >
                                {m.nombre}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}
