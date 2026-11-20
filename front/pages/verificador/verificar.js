import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { pedirJSON } from "../../lib/api";

import Bano from "./baneo";
import Rechazo from "./rechazar";

function urlImagen(imagen) {
  if (!imagen) return null;
  return imagen.startsWith("http") ? imagen : `http://localhost:4000${imagen}`;
}

export default function verificar() {
  const router = useRouter();

  const [creacion, setCreacion] = useState(null);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    let vigente = true;

    let u = null;
    try {
      u = JSON.parse(localStorage.getItem("usuario"));
    } catch {
      u = null;
    }
    setUsuario(u);

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

  if (cargado) {
    return (
      <main className={styles.fondo}>
        <p className={styles.estado}>Cargando creacion...</p>
      </main>
    );
  }

  if (errorCarga || !creacion) {
    return (
      <main className={styles.fondo}>
        <p className={styles.estado}>
          {errorCarga || "No se encontró la creación"}{" "}
        </p>
        <Link href="/" className={styles.botonRegresar}>
          Regresar al inicio
        </Link>
      </main>
    );
  }

  function aprobar() {
    // funcion aprobar
  }
  function desaprobar() {
    setModal("rechazo");
  }
  function banear() {
    setModal("baneo")
  }
  function Regresar() {}

  function confirmarRechazo(razon) {
    // insertar el reporte en la base de datos    
  }

  function confirmarBaneo(razon) {
    //insertar un reporte, y quitar la creacion de la base de datos
    
    pedirJSON(`/mcreaciones/${id}/baneado`, {method: "POST", body: JSON.stringify({razon}) })
  }

  const imagen = urlImagen(creacion.imagen);
  const autor = creacion.musuarios?.nombre;
  const materiales = Array.isArray(creacion.materiales)
    ? creacion.materiales
    : [];

  return (
    <main className={styles.fondo}>
      <article>
        <h1>Verificar creación de usuario</h1>
        {autor && <p className={styles.autor}>Creación de {autor} </p>}

        {materiales.lenght > 0 && <section></section>}
        <div>
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
          <div>
            <h2>Descripción:</h2>
            <p className={styles.texto}> {creacion.descripcion} </p>
          </div>
        </div>
        <div>
          <h2>Materiales</h2>
          <ul className={styles.listaMateriales}>
            {materiales.map((m) => (
              <li key={m.id_materiales ?? m.nombre}>#{nombre}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Instrucciones</h2>
          <p className={styles.texto}>{creacion.instrucciones}</p>
        </div>
      </article>
      <div className={styles.botones}>
        <button type="button" className={styles.botonAprobar} onClick={aprobar}>
          Aprobar Creación
        </button>
        <button
          type="button"
          className={styles.botonCancelar}
          onClick={desaprobar}
        >
          Desaprobar Verificación
        </button>
        <button type="button" className={styles.botonBanear} onClick={banear}>
          Banear
        </button>
        <button
          type="button"
          className={styles.botonRegresar}
          onClick={Regresar}
        >
          Verificar más tarde y Regresar
        </button>
      </div>
    </main>
  );
}
