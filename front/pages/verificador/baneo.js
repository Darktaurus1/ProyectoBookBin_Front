import { useState } from "react";
import styles from "./verificador.module.css"

export default function Baneo({ onConfirmar, onCancelar}) {
    const[razon, setRazon] = useState("");

    function confirmar() {
        if(!razon.trim()) return;
        onConfirmar(razon.trim());
    }

    return (
    <div className="modalFondo" onClick={onCancelar}>
      <div className="modalCaja" onClick={(e) => e.stopPropagation()}>
        <h2>Razon del baneo</h2>
        <textarea
          placeholder="Razon del baneo..."
          value={razon}
          onChange={(e) => setRazon(e.target.value)}
        />
        <div className="modalBotones">
          <button type="button" onClick={confirmar} disabled={!razon.trim()}>
            Banear
          </button>
          <button type="button" onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}