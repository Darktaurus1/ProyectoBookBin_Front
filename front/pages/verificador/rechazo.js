import { useState } from "react";
import styles from "./modalVerificador.module.css";

// Ventana para rechazar una creación: pide la razón y la manda al confirmar
export default function Rechazo({ onConfirmar, onCancelar }) {
  const [razon, setRazon] = useState("");

  function confirmar() {
    if (!razon.trim()) return;
    onConfirmar(razon.trim());
  }

  return (
    <div className={styles.fondo} onClick={onCancelar}>
      <div className={styles.caja} onClick={(e) => e.stopPropagation()}>
        <h2>Escribe la razón del rechazo</h2>
        <textarea
          placeholder="Razón del rechazo..."
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
            Rechazar publicación
          </button>
        </div>
      </div>
    </div>
  );
}