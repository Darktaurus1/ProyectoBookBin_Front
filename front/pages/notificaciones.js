import { useEffect, useState } from "react";
import Link from "next/link";
import { pedirJSON } from "../lib/api";
import ModalApelacion from "../components/ModalApelacion";
import styles from "./notificaciones.module.css";

function formatearFecha(fecha) {
  const d = new Date(fecha);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleString("es-MX", { dateStyle: "medium", timeStyle: "short" });
}

export default function Notificaciones() {
  const [lista, setLista] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [apelando, setApelando] = useState(null); // id de la notificación que se apela

  useEffect(() => {
    let vigente = true;
    pedirJSON("/notificaciones")
      .then((datos) => {
        if (vigente) setLista(datos);
      })
      .catch((err) => {
        if (vigente) setError(err.message);
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });
    return () => {
      vigente = false;
    };
  }, []);

  async function marcarLeida(id) {
    try {
      await pedirJSON(`/notificaciones/${id}/leida`, { method: "PUT" });
      window.dispatchEvent(new Event("notificaciones-actualizadas"));
      setLista((actual) =>
        actual.map((n) =>
          n.id_notificacion === id ? { ...n, leida: 1 } : n
        )
      );
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className={styles.pagina}>
      <h1>Notificaciones</h1>

      {error && <p className={styles.error}>{error}</p>}
      {cargando && <p>Cargando...</p>}
      {!cargando && !error && lista.length === 0 && (
        <p>No tienes notificaciones.</p>
      )}

      <ul className={styles.lista}>
        {lista.map((n) => (
          <li
            key={n.id_notificacion}
            className={`${styles.item} ${
              n.tipo === "aprobacion" ? styles.aprobada : ""
            } ${n.baneada ? styles.baneada : ""} ${
              n.leida ? styles.leida : ""
            }`}
          >
            <h2>{n.titulo}</h2>
            {n.baneada && (
              <p className={styles.etiquetaBaneo}>Creación baneada</p>
            )}
            <p className={styles.mensaje}>
              {n.tipo === "aprobacion" ? null : (
                <strong>
                  {n.tipo === "apelacion"
                    ? "Respuesta: "
                    : n.baneada
                    ? "Razón del baneo: "
                    : "Razón: "}
                </strong>
              )}
              {n.mensaje}
            </p>
            <p className={styles.fecha}>{formatearFecha(n.fecha)}</p>
            <div className={styles.acciones}>
              {n.id_creacion && n.tipo === "aprobacion" && (
                <Link href={`/creaciones/${n.id_creacion}`}>Ver creación</Link>
              )}
              {n.id_creacion && n.tipo !== "aprobacion" && !n.baneada && (
                <Link href={`/creaciones/editar/${n.id_creacion}`}>
                  Corregir creación
                </Link>
              )}
              {n.tipo === "rechazo" &&
                !n.baneada &&
                (n.apelada ? (
                  <span className={styles.apelada}>Apelación enviada</span>
                ) : (
                  <button
                    type="button"
                    className={styles.botonApelar}
                    onClick={() => setApelando(n.id_notificacion)}
                  >
                    Apelar
                  </button>
                ))}
              {!n.leida && (
                <button
                  type="button"
                  onClick={() => marcarLeida(n.id_notificacion)}
                >
                  Marcar como leída
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {apelando !== null && (
        <ModalApelacion
          idNotificacion={apelando}
          onEnviada={() =>
            setLista((actual) =>
              actual.map((n) =>
                n.id_notificacion === apelando ? { ...n, apelada: true } : n
              )
            )
          }
          onCerrar={() => setApelando(null)}
        />
      )}
    </main>
  );
}