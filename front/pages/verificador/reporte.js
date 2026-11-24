import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { pedirJSON } from "../../lib/api";
import { aPasos } from "../../components/EditorPasos";
import Baneo from "./baneo";
import styles from "./verificador.module.css";

const MOTIVOS = {
  inapropiado: "Contenido inapropiado u ofensivo",
  spam: "Spam o publicidad",
  peligroso: "Instrucciones peligrosas",
  plagio: "Plagio o contenido robado",
  otro: "Otro",
};

function urlImagen(imagen) {
  if (!imagen) return null;
  return imagen.startsWith("http") ? imagen : `http://localhost:4000${imagen}`;
}

export default function Reporte() {
  const router = useRouter();
  const { id } = router.query;

  const [creacion, setCreacion] = useState(null);
  const [reporte, setReporte] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");
  const [modal, setModal] = useState(null); // "baneo" | null
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    let vigente = true;

    setCargando(true);
    setErrorCarga("");

    // La creación reportada y su reporte pendiente más reciente
    Promise.all([
      pedirJSON(`/creaciones/${id}`),
      pedirJSON(`/verificador/creaciones/${id}/reporte`),
    ])
      .then(([datosCreacion, datosReporte]) => {
        if (!vigente) return;
        setCreacion(datosCreacion);
        setReporte(datosReporte);
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

  // Envía la decisión al backend y regresa a la lista de reportes
  async function enviar(accion, cuerpo) {
    setError("");
    setEnviando(true);
    try {
      await pedirJSON(`/verificador/creaciones/${id}/${accion}`, {
        method: "POST",
        body: JSON.stringify(cuerpo || {}),
      });
      router.push("/verificador/reportes");
    } catch (err) {
      setError(err.message);
      setModal(null);
      setEnviando(false);
    }
  }

  const descartar = () => enviar("descartar");
  const confirmarBaneo = (razon) => enviar("baneado", { razon });
  const regresar = () => router.push("/verificador/reportes");

  if (cargando) {
    return (
      <main className={styles.fondo}>
        <p className={styles.estado}>Cargando reporte...</p>
      </main>
    );
  }

  if (errorCarga || !creacion || !reporte) {
    return (
      <main className={styles.fondo}>
        <p className={styles.estado}>
          {errorCarga || "No se encontró la creación o el reporte"}
        </p>
        <Link href="/verificador/reportes" className={styles.botonRegresar}>
          Regresar a los reportes
        </Link>
      </main>
    );
  }

  const imagen = urlImagen(creacion.imagen);
  const autor = creacion.musuarios?.nombre;
  const materiales = Array.isArray(creacion.materiales)
    ? creacion.materiales
    : [];
  const pasos = aPasos(creacion.instrucciones);

  return (
    <main className={styles.fondo}>
      <article className={styles.detalle}>
        <h1>Verificación de reporte</h1>
        <h2>{creacion.nombre}</h2>
        {autor && <p className={styles.autor}>Creación de {autor}</p>}

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

      <article className={`${styles.detalle} ${styles.cajaReporte}`}>
        <h1>Reporte</h1>
        <span className={styles.etiquetaRechazo}>
          {MOTIVOS[reporte.motivo] || reporte.motivo}
        </span>
        {reporte.detalle && <p className={styles.texto}>{reporte.detalle}</p>}
        {reporte.musuarios?.nombre && (
          <p className={styles.autor}>Reportó: {reporte.musuarios.nombre}</p>
        )}
      </article>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.botones}>
        <button
          type="button"
          className={styles.botonAprobar}
          onClick={descartar}
          disabled={enviando}
        >
          Descartar reporte
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
          Revisar más tarde y regresar
        </button>
      </div>

      {modal === "baneo" && (
        <Baneo onConfirmar={confirmarBaneo} onCancelar={() => setModal(null)} />
      )}
    </main>
  );
}