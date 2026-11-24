import { useEffect, useState } from "react";
import Link from "next/link";
import { pedirJSON } from "../../lib/api";
import TarjetaCreacionVerificar from "../../components/TarjetaCreacionVerificar";
import styles from "./verificador.module.css";

// Creaciones que eligió este verificador. Clic para verificarla, o "Soltar" para regresarla al inicio.
export default function PorVerificar() {
  const [creaciones, setCreaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let vigente = true;
    pedirJSON("/verificador/mis-creaciones")
      .then((datos) => { if (vigente) setCreaciones(Array.isArray(datos) ? datos : []); })
      .catch((err) => { if (vigente) setError(err.message); })
      .finally(() => { if (vigente) setCargando(false); });
    return () => { vigente = false; };
  }, []);

  async function soltar(id) {
    setError("");
    try {
      await pedirJSON(`/verificador/creaciones/${id}/soltar`, { method: "POST" });
      setCreaciones((prev) => prev.filter((c) => c.id_creacion !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className={styles.fondo}>
      <div className={styles.contenedorLista}>
        <div className={styles.encabezadoLista}>
          <h1 className={styles.tituloLista}>Por verificar</h1>
          <Link href="/verificador" className={styles.botonRegresar}>
            Elegir más
          </Link>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {cargando ? (
          <p>Cargando...</p>
        ) : creaciones.length === 0 ? (
          <p>No tienes creaciones elegidas. Ve al inicio y elige algunas.</p>
        ) : (
          <div className={styles.listaCreacion}>
            {creaciones.map((c) => (
              <TarjetaCreacionVerificar key={c.id_creacion} creacion={c} onSoltar={soltar} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
