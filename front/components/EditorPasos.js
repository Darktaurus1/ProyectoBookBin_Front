import { useEffect, useId, useLayoutEffect, useRef } from 'react';
import styles from './EditorPasos.module.css';

// Quita numeraciones escritas a mano al inicio: "1.", "2)", "Paso 3:"
const NUMERACION = /^\s*(paso\s*)?\d+\s*[.):]\s*/i;

// Texto guardado → lista de pasos (sin vacíos ni numeración)
export function aPasos(texto) {
    return String(texto || '')
        .split('\n')
        .map((linea) => linea.replace(NUMERACION, '').trim())
        .filter(Boolean);
}

// Lo que se manda al backend: un paso por línea, sin líneas vacías
export function limpiarPasos(texto) {
    return aPasos(texto).join('\n');
}

// Ajusta la altura del cuadro a su contenido
function ajustarAltura(el) {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
}

export default function EditorPasos({ value, onChange}) {
    const idBase = useId();
    const refs = useRef([]);
    const enfocar = useRef(null); // { indice, alFinal }

    // El texto se guarda como líneas; cada línea es un paso (al menos uno, aunque esté vacío)
    const pasos = String(value || '').split('\n');
    const usados = limpiarPasos(value).length;

    const actualizar = (nuevos) => onChange(nuevos.join('\n'));

    // Mueve el cursor al paso indicado después de agregar o borrar
    useEffect(() => {
        if (!enfocar.current) return;
        const { indice, alFinal } = enfocar.current;
        enfocar.current = null;
        const el = refs.current[indice];
        if (el) {
            el.focus();
            const pos = alFinal ? el.value.length : 0;
            el.setSelectionRange(pos, pos);
        }
    });

    // Altura correcta al cargar texto (por ejemplo, al editar)
    useLayoutEffect(() => {
        refs.current.forEach(ajustarAltura);
    }, [pasos.length]);

    const cambiarPaso = (i, texto) => {
        // Si pegan varias líneas, cada una se vuelve un paso
        const lineas = texto.split(/\r?\n/);
        const nuevos = [...pasos];
        nuevos.splice(i, 1, ...lineas);
        if (lineas.length > 1) enfocar.current = { indice: i + lineas.length - 1, alFinal: true };
        actualizar(nuevos);
    };

    const agregarDespues = (i, textoNuevo = '') => {
        const nuevos = [...pasos];
        nuevos.splice(i + 1, 0, textoNuevo);
        enfocar.current = { indice: i + 1, alFinal: false };
        actualizar(nuevos);
    };

    const quitar = (i) => {
        if (pasos.length === 1) {
            actualizar(['']);
            enfocar.current = { indice: 0, alFinal: true };
            return;
        }
        const nuevos = pasos.filter((_, j) => j !== i);
        enfocar.current = { indice: Math.max(i - 1, 0), alFinal: true };
        actualizar(nuevos);
    };

    const manejarTeclas = (e, i) => {
        const el = e.currentTarget;

        // Enter: nuevo paso (Shift+Enter no hace nada para mantener un paso por línea)
        if (e.key === 'Enter') {
            e.preventDefault();
            if (e.shiftKey) return;
            // Si el cursor está a la mitad, lo que sigue pasa al nuevo paso
            const antes = el.value.slice(0, el.selectionStart);
            const despues = el.value.slice(el.selectionEnd);
            const nuevos = [...pasos];
            nuevos.splice(i, 1, antes, despues);
            enfocar.current = { indice: i + 1, alFinal: false };
            actualizar(nuevos);
        }

        // Backspace al inicio: une este paso con el anterior (o lo borra si está vacío)
        if (e.key === 'Backspace' && el.selectionStart === 0 && el.selectionEnd === 0 && i > 0) {
            e.preventDefault();
            const anterior = pasos[i - 1];
            const nuevos = [...pasos];
            nuevos.splice(i - 1, 2, anterior + el.value);
            enfocar.current = { indice: i - 1, alFinal: false };
            actualizar(nuevos);
            // Deja el cursor justo donde estaba la unión
            requestAnimationFrame(() => {
                const prev = refs.current[i - 1];
                if (prev) prev.setSelectionRange(anterior.length, anterior.length);
            });
        }

        // Flechas arriba/abajo en el borde: saltan de un paso a otro
        if (e.key === 'ArrowUp' && el.selectionStart === 0 && i > 0) {
            e.preventDefault();
            refs.current[i - 1]?.focus();
        }
        if (e.key === 'ArrowDown' && el.selectionStart === el.value.length && i < pasos.length - 1) {
            e.preventDefault();
            refs.current[i + 1]?.focus();
        }
    };

    return (
        <div className={styles.bloque}>
            <div className={styles.cabecera}>
                <span id={`${idBase}-titulo`}>Instrucciones paso a paso</span>
            </div>

            <ol className={styles.lista} aria-labelledby={`${idBase}-titulo`}>
                {pasos.map((paso, i) => (
                    <li key={i} className={styles.paso}>
                        <span className={styles.numero} aria-hidden="true">{i + 1}</span>
                        <textarea
                            ref={(el) => { refs.current[i] = el; }}
                            rows={1}
                            className={styles.texto}
                            aria-label={`Paso ${i + 1}`}
                            placeholder={i === 0 ? 'Escribe el primer paso y presiona Enter...' : `Paso ${i + 1}...`}
                            value={paso}
                            onChange={(e) => {
                                cambiarPaso(i, e.target.value);
                                ajustarAltura(e.target);
                            }}
                            onKeyDown={(e) => manejarTeclas(e, i)}
                        />
                        <button
                            type="button"
                            className={styles.quitar}
                            aria-label={`Quitar paso ${i + 1}`}
                            onClick={() => quitar(i)}
                        >
                            ×
                        </button>
                    </li>
                ))}
            </ol>

            <div className={styles.pie}>
                <button type="button" className={styles.agregar} onClick={() => agregarDespues(pasos.length - 1)}>
                    + Agregar paso
                </button>
                <span className={styles.ayuda}>Enter crea el siguiente paso · Backspace al inicio lo une con el anterior</span>
            </div>
        </div>
    );
}