import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { pedirJSON } from "../../lib/api";
import { aPasos } from "../../components/EditorPasos";
import Baneo from "./baneo";
import Rechazo from "./rechazo";
import styles from "./verificador.module.css";

function urlImagen(imagen) {
  if (!imagen) return null;
  return imagen.startsWith("http") ? imagen : `http://localhost:4000${imagen}`;
}

export default function Verificar() {
  const router = useRouter();
  const { id } = router.query;

  const [creacion, setCreacion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");
  const [modal, setModal] = useState(null); // "rechazo" | "baneo" | null
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    let vigente = true;

    setCargando(true);
    setErrorCarga("");

    pedirJSON(`/creaciones/${id}`)
      .then((datos) => {
        if (vigente) setCreacion(datos);
      })
      .catch((err) => {
        if (vigente) setErrorCarga(err.message);
      })
      .finally(() => {
        if (vigente) setCargando(false);
      });

    return () => {
      vigente = false;
    };
  }, [router.isReady, id]);

  // Envía la decisión al backend y regresa a la lista
  async function enviar(accion, cuerpo) {
    setError("");
    setEnviando(true);
    try {
      await pedirJSON(`/verificador/creaciones/${id}/${accion}`, {
        method: "POST",
        body: JSON.stringify(cuerpo || {}),
      });
      router.push("/verificador/por-verificar");
    } catch (err) {
      setError(err.message);
      setModal(null);
      setEnviando(false);
    }
  }

  const aprobar = () => enviar("aprobar");
  const confirmarRechazo = (razon) => enviar("rechazar", { razon });
  const confirmarBaneo = (razon) => enviar("baneado", { razon });
  const regresar = () => router.push("/verificador/por-verificar");

  if (cargando) {
    return (
      <main className={styles.fondo}>
        <p className={styles.estado}>Cargando creación...</p>
      </main>
    );
  }

  if (errorCarga || !creacion) {
    return (
      <main className={styles.fondo}>
        <p className={styles.estado}>
          {errorCarga || "No se encontró la creación"}
        </p>
        <Link href="/verificador/por-verificar" className={styles.botonRegresar}>
          Regresar a la lista
        </Link>
      </main>
    );
  }

  const imagen = urlImagen(creacion.imagen);
  const autor = creacion.musuarios?.nombre;
  const materiales = Array.isArray(creacion.materiales)
    ? creacion.materiales
    : [];
  const herramientas = Array.isArray(creacion.herramientas)
    ? creacion.herramientas
    : [];
  const pasos = aPasos(creacion.instrucciones);
  const rechazos = Number(creacion.veces_rechazada) || 0;

  return (
    <main className={styles.fondo}>
      <article className={styles.detalle}>
        <h1>Verificar creación de usuario</h1>
        <h2>{creacion.nombre}</h2>
        {autor && <p className={styles.autor}>Creación de {autor}</p>}

        {rechazos > 0 && (
          <div className={styles.etiquetas}>
            <span className={styles.etiquetaRechazo}>
              Rechazada antes{rechazos > 1 ? ` (${rechazos} veces)` : ""}
            </span>
            <span
              className={
                creacion.corregida === 1
                  ? styles.etiquetaCorregida
                  : styles.etiquetaSinCorregir
              }
            >
              {creacion.corregida === 1
                ? "El autor la corrigió"
                : "El autor no la ha corregido"}
            </span>
          </div>
        )}

        <div className={styles.imagenCaja}>
          {imagen ? (
            <img src={imagen} alt={creacion.nombre} />
          ) : (
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="#6B8797"
              aria-hidden="true"
            >
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          )}
        </div>

        <section>
          <h2>Descripción</h2>
          <p className={styles.texto}>{creacion.descripcion}</p>
        </section>

        <section>
          <h2>Materiales</h2>
          {materiales.length > 0 ? (
            <ul className={styles.listaMateriales}>
              {materiales.map((m) => (
                <li key={m.id_materiales ?? m.nombre}>
                  #{m.nombre}
                  {m.cantidad > 1 ? ` x${m.cantidad}` : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.texto}>Sin materiales.</p>
          )}
        </section>

        {herramientas.length > 0 && (
          <section>
            <h2>Herramientas</h2>
            <ul className={styles.listaMateriales}>
              {herramientas.map((h) => (
                <li key={h.id_herramientas ?? h.nombre}>{h.nombre}</li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2>Instrucciones</h2>
          {pasos.length > 0 ? (
            <ol className={styles.pasos}>
              {pasos.map((paso, i) => (
                <li key={i}>{paso}</li>
              ))}
            </ol>
          ) : (
            <p className={styles.texto}>Sin instrucciones.</p>
          )}
        </section>
      </article>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.botones}>
        <button
          type="button"
          className={styles.botonAprobar}
          onClick={aprobar}
          disabled={enviando}
        >
          Aprobar creación
        </button>
        <button
          type="button"
          className={styles.botonCancelar}
          onClick={() => setModal("rechazo")}
          disabled={enviando}
        >
          Desaprobar verificación
        </button>
        <button
          type="button"
          className={styles.botonBanear}
          onClick={() => setModal("baneo")}
          disabled={enviando}
        >
          Banear
        </button>
        <button
          type="button"
          className={styles.botonRegresar}
          onClick={regresar}
          disabled={enviando}
        >
          Verificar más tarde y regresar
        </button>
      </div>

      {modal === "rechazo" && (
        <Rechazo
          onConfirmar={confirmarRechazo}
          onCancelar={() => setModal(null)}
        />
      )}
      {modal === "baneo" && (
        <Baneo onConfirmar={confirmarBaneo} onCancelar={() => setModal(null)} />
      )}
    </main>
  );
}