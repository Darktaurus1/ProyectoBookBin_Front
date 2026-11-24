import { useState } from "react";
import { pedirJSON } from "../lib/api";
import styles from "./ModalReporte.module.css";

// Ventana para apelar un rechazo: pide el motivo y lo envía desde la notificación
export default function ModalApelacion({ idNotificacion, onEnviada, onCerrar }) {
  const [motivo, setMotivo] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const enviar = async (e) => {
    e.preventDefault();
    setError("");
    setEnviando(true);
    try {
      await pedirJSON(`/notificaciones/${idNotificacion}/apelar`, {
        method: "POST",
        body: JSON.stringify({ motivo: motivo.trim() }),
      });
      setEnviado(true);
      onEnviada && onEnviada();
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className={styles.fondo} onClick={onCerrar}>
      <div className={styles.caja} onClick={(e) => e.stopPropagation()}>
        {enviado ? (
          <>
            <h2>Apelación enviada</h2>
            <p>El líder de verificadores la revisará.</p>
            <button type="button" className={styles.botonEnviar} onClick={onCerrar}>
              Cerrar
            </button>
          </>
        ) : (
          <form onSubmit={enviar}>
            <h2>Apelar rechazo</h2>
            {error && <p className={styles.error}>{error}</p>}

            <label htmlFor="motivo-apelacion">¿Por qué crees que no debió rechazarse?</label>
            <textarea
              id="motivo-apelacion"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              minLength={10}
              maxLength={500}
              required
            />

            <div className={styles.botones}>
              <button type="button" className={styles.botonCancelar} onClick={onCerrar}>
                Cancelar
              </button>
              <button type="submit" className={styles.botonEnviar} disabled={enviando}>
                {enviando ? "Enviando..." : "Apelar"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}