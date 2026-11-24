import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { pedirJSON } from "../../lib/api";
import { aPasos } from "../../components/EditorPasos";
import Baneo from "./baneo";
import styles from "./verificador.module.css";

function urlImagen(imagen) {
  if (!imagen) return null;
  return imagen.startsWith("http") ? imagen : `http://localhost:4000${imagen}`;
}

// Revisión de una apelación: el autor explica por qué no debió rechazarse su creación
export default function Apelaciones() {
  const router = useRouter();
  const { id } = router.query;

  const [apelacion, setApelacion] = useState(null);
  const [creacion, setCreacion] = useState(null);
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

    pedirJSON(`/verificador/apelaciones/${id}`)
      .then(async (datosApelacion) => {
        const datosCreacion = await pedirJSON(
          `/creaciones/${datosApelacion.id_creacion}`
        );
        if (!vigente) return;
        setApelacion(datosApelacion);
        setCreacion(datosCreacion);
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

  async function enviar(ruta, cuerpo) {
    setError("");
    setEnviando(true);
    try {
      await pedirJSON(ruta, {
        method: "POST",
        body: JSON.stringify(cuerpo || {}),
      });
      router.push("/verificador/apelaciones-lista");
    } catch (err) {
      setError(err.message);
      setModal(null);
      setEnviando(false);
    }
  }

  const aprobar = () =>
    enviar(`/verificador/creaciones/${apelacion.id_creacion}/aprobar`);
  const mantener = () => enviar(`/verificador/apelaciones/${id}/mantener`);
  const confirmarBaneo = (razon) =>
    enviar(`/verificador/creaciones/${apelacion.id_creacion}/baneado`, {
      razon,
    });
  const regresar = () => router.push("/verificador/apelaciones-lista");

  if (cargando) {
    return (
      <main className={styles.fondo}>
        <p className={styles.estado}>Cargando apelación...</p>
      </main>
    );
  }

  if (errorCarga || !apelacion || !creacion) {
    return (
      <main className={styles.fondo}>
        <p className={styles.estado}>
          {errorCarga || "No se encontró la apelación"}
        </p>
        <Link href="/verificador/apelaciones-lista" className={styles.botonRegresar}>
          Regresar a las apelaciones
        </Link>
      </main>
    );
  }

  const resuelta = apelacion.estado !== "pendiente";
  const imagen = urlImagen(creacion.imagen);
  const autor = creacion.musuarios?.nombre;
  const materiales = Array.isArray(creacion.materiales)
    ? creacion.materiales
    : [];
  const pasos = aPasos(creacion.instrucciones);

  return (
    <main className={styles.fondo}>
      <article className={`${styles.detalle} ${styles.cajaReporte}`}>
        <h1>Apelación</h1>
        <span className={styles.etiquetaRechazo}>Rechazo apelado</span>
        {apelacion.razon_rechazo && (
          <>
            <h2>Razón del rechazo</h2>
            <p className={styles.texto}>{apelacion.razon_rechazo}</p>
          </>
        )}
        <h2>Lo que dice el autor</h2>
        <p className={styles.texto}>{apelacion.contenido}</p>
        {apelacion.musuarios?.nombre && (
          <p className={styles.autor}>Apeló: {apelacion.musuarios.nombre}</p>
        )}
        {resuelta && (
          <span className={styles.etiquetaCorregida}>Apelación ya resuelta</span>
        )}
      </article>

      <article className={styles.detalle}>
        <h1>{creacion.nombre}</h1>
        {autor && <p className={styles.autor}>Creación de {autor}</p>}

        <div className={styles.imagenCaja}>
          {imagen ? <img src={imagen} alt={creacion.nombre} /> : null}
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

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.botones}>
        <button
          type="button"
          className={styles.botonAprobar}
          onClick={aprobar}
          disabled={enviando || resuelta}
        >
          Aceptar apelación y aprobar
        </button>
        <button
          type="button"
          className={styles.botonCancelar}
          onClick={mantener}
          disabled={enviando || resuelta}
        >
          Mantener rechazo
        </button>
        <button
          type="button"
          className={styles.botonBanear}
          onClick={() => setModal("baneo")}
          disabled={enviando || resuelta}
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