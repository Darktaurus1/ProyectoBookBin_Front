import { useEffect, useState } from "react";
import Link from "next/link";
import { pedirJSON } from "../../lib/api";
import FilaRevision, { claveFila } from "../../components/FilaRevision";
import styles from "./verificador.module.css";

// Reportes y apelaciones que eligió el líder, juntos en una sola lista
export default function PorRevisar() {
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let vigente = true;
    pedirJSON("/verificador/por-revisar")
      .then((datos) => { if (vigente) setItems(Array.isArray(datos) ? datos : []); })
      .catch((err) => { if (vigente) setError(err.message); })
      .finally(() => { if (vigente) setCargando(false); });
    return () => { vigente = false; };
  }, []);

  async function soltar(item) {
    setError("");
    const ruta =
      item.tipo === "apelacion"
        ? `/verificador/apelaciones/${item.id_apelacion}/soltar`
        : `/verificador/reportes/${item.id_creacion}/soltar`;
    try {
      await pedirJSON(ruta, { method: "POST" });
      setItems((prev) => prev.filter((i) => claveFila(i) !== claveFila(item)));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className={styles.fondo}>
      <div className={styles.contenedorLista}>
        <div className={styles.encabezadoLista}>
          <h1 className={styles.tituloLista}>Por revisar</h1>
          <Link href="/verificador/lider" className={styles.botonRegresar}>
            Elegir más
          </Link>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {cargando ? (
          <p>Cargando...</p>
        ) : items.length === 0 ? (
          <p>No tienes pendientes elegidos. Ve al inicio y elige algunos.</p>
        ) : (
          <ul className={styles.listaReportes}>
            {items.map((item) => (
              <FilaRevision key={claveFila(item)} item={item} onSoltar={soltar} />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
