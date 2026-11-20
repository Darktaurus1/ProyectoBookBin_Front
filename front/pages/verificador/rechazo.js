import { useState } from "react";

export default function Rechazo({ onConfirmar, onCancelar}) {
    const [razon, setRazon] = useState("");

    function confirmar() {
        if (!razon.trim()) return;
        onConfirmar(razon.trim());
    }

return (
     <div className={styles.fondo} onClick={onCancelar}>
      <div className="modalCaja" onClick={(e) => e.stopPropagation()}>
        <h2>Escribe la razon del rechazo</h2>
        <textarea
          placeholder="Razon del rechazo..."
          value={razon}
          onChange={(e) => setRazon(e.target.value)}
        />
        <div className="modalBotones">
          <button type="button" onClick={confirmar} disabled={!razon.trim()}>
            Rechazar Publicacion
          </button>
          <button type="button" onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );

}