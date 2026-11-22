import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { pedirJSON } from "../../lib/api";
import Baneo from "./baneo";

function urlImagen(imagen) {
  if (!imagen) return null;
  return imagen.startsWith("http") ? imagen : `http://localhost:4000${imagen}`;
}

function IconoCamara() {
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

export default function Apelaciones() {
  const router = useRouter();
  const { id } = router.query;

  const [creacion, setCreacion] = useState(null);
  const [reporte, setReporte] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [materialesAbiertos, setMaterialesAbiertos] = useState(true);
  const [modal, setModal] = useState(null); // null | "baneo"
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    let vigente = true;

    setCargando(true);
    setErrorCarga("");

    // La creación apelada y el reporte que se le hizo
    Promise.all([
      pedirJSON(`/creaciones/${id}`),
      pedirJSON(`/mcreaciones/${id}/reporte`),
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

  if (cargando) {
    return (
      <main className="fondo">
        <p className="estado">Cargando apelación...</p>
      </main>
    );
  }

  if (errorCarga || !creacion) {
    return (
      <main className="fondo">
        <p className="estado">
          {errorCarga || "No se encontró la creación o el reporte"}
        </p>
        <Link href="/verificador" className="botonRegresar">
          Regresar al inicio
        </Link>
      </main>
    );
  }

  async function aprobar() {
    setError("");
    setMensaje("");
    setEnviando(true);
    try {
      await pedirJSON(`/mcreaciones/${id}/aprobar`, { method: "POST" });
      setMensaje("La verificación fue aprobada.");
      router.push("/verificador");
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  function banear() {
    setModal("baneo");
  }

  async function confirmarBaneo(razon) {
    setError("");
    setMensaje("");
    setEnviando(true);
    try {
      await pedirJSON(`/mcreaciones/${id}/baneado`, {
        method: "POST",
        body: JSON.stringify({ razon }),
      });
      setModal(null);
      setMensaje("La creación fue baneada.");
      router.push("/verificador");
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  function regresar() {
    router.push("/verificador");
  }

  const imagen = urlImagen(creacion.imagen);
  const materiales = Array.isArray(creacion.materiales)
    ? creacion.materiales
    : [];

  return (
    <main className="fondo">
      {/* Datos de la creación apelada */}
      <section className="panelReporte">
        <h1 className="titulo">Verificación de reporte</h1>

        <div className="campo campoNombre">{creacion.nombre}</div>

        <div className="imagenDescripcion">
          <div className="imagenCaja">
            {imagen ? (
              <img src={imagen} alt={creacion.nombre} />
            ) : (
              <>
                <span className="imagenEtiqueta">Imagen agregada del usuario</span>
                <IconoCamara />
              </>
            )}
          </div>
          <div className="descripcionCaja">
            <p className="texto">{creacion.descripcion}</p>
          </div>
        </div>

        <div className="materiales">
          <button
            type="button"
            className="materialesEncabezado"
            onClick={() => setMaterialesAbiertos(!materialesAbiertos)}
            aria-expanded={materialesAbiertos}
          >
            <span>Materiales</span>
            <span aria-hidden="true">{materialesAbiertos ? "v" : ">"}</span>
          </button>

          {materialesAbiertos && (
            <ul className="listaMateriales">
              {materiales.length === 0 ? (
                <li>Sin materiales</li>
              ) : (
                materiales.map((m) => (
                  <li key={m.id_materiales ?? m.nombre}>#{m.nombre}</li>
                ))
              )}
            </ul>
          )}
        </div>

        <div className="campo campoInstrucciones">
          <h2>Instrucciones</h2>
          <p className="texto">{creacion.instrucciones}</p>
        </div>

        <div className="campo campoRazon">
          <h2>Razón de reporte</h2>
          <p className="texto">{reporte?.contenido ?? reporte?.razon}</p>
        </div>
      </section>

      {/* Acciones del verificador */}
      <section className="panelBotones">
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        {mensaje && (
          <p className="exito" role="status">
            {mensaje}
          </p>
        )}

        <div className="botones">
          <button
            type="button"
            className="botonAprobar"
            onClick={aprobar}
            disabled={enviando}
          >
            Aprobar verificación
          </button>
          <button
            type="button"
            className="botonBanear"
            onClick={banear}
            disabled={enviando}
          >
            Banear
          </button>
          <button
            type="button"
            className="botonRegresar"
            onClick={regresar}
            disabled={enviando}
          >
            Verificar más tarde y regresar
          </button>
        </div>
      </section>

      {modal === "baneo" && (
        <Baneo
          onConfirmar={confirmarBaneo}
          onCancelar={() => setModal(null)}
        />
      )}
    </main>
  );
}