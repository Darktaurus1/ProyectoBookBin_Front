import { useState } from "react";
import styles from "./modalVerificador.module.css";

// Ventana para banear una creación: pide la razón y la manda al confirmar
export default function Baneo({ onConfirmar, onCancelar }) {
  const [razon, setRazon] = useState("");

  function confirmar() {
    if (!razon.trim()) return;
    onConfirmar(razon.trim());
  }

  return (
    <div className={styles.fondo} onClick={onCancelar}>
      <div className={styles.caja} onClick={(e) => e.stopPropagation()}>
        <h2>Razón del baneo</h2>
        <textarea
          placeholder="Razón del baneo..."
          value={razon}
          maxLength={500}
          onChange={(e) => setRazon(e.target.value)}
        />
        <div className={styles.botones}>
          <button type="button" className={styles.botonCancelar} onClick={onCancelar}>
            Cancelar
          </button>
          <button
            type="button"
            className={styles.botonConfirmar}
            onClick={confirmar}
            disabled={!razon.trim()}
          >
            Banear
          </button>
        </div>
      </div>
    </div>
  );
}