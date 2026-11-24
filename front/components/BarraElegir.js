import styles from '../pages/verificador/verificador.module.css';

// Barra fija abajo que aparece cuando hay algo seleccionado
export default function BarraElegir({ cantidad, enviando, onElegir, onLimpiar }) {
    if (cantidad === 0) return null;

    return (
        <div className={styles.barraElegir} role="region" aria-label="Selección">
            <span>
                {cantidad} {cantidad === 1 ? 'seleccionada' : 'seleccionadas'}
            </span>
            <div className={styles.barraBotones}>
                <button type="button" className={styles.botonCancelar} onClick={onLimpiar} disabled={enviando}>
                    Quitar selección
                </button>
                <button type="button" className={styles.botonAprobar} onClick={onElegir} disabled={enviando}>
                    {enviando ? 'Eligiendo...' : 'Elegir estas'}
                </button>
            </div>
        </div>
    );
}
