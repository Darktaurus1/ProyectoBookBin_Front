import { useEffect, useState } from "react";
import Link from "next/link";
import { pedirJSON } from "../lib/api";
import styles from "../pages/verificador/verificador.module.css";

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

// Lista de reportes pendientes; cada fila lleva a la página de revisión de la creación
export default function ListaReportesVerificador({ titulo, ruta, vacio, apelaciones = false }) {
  const [filas, setFilas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let vigente = true;
    pedirJSON(ruta)
      .then((datos) => {
        if (vigente) setFilas(datos);
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
  }, [ruta]);

  return (
    <main className={styles.fondo}>
      <div className={styles.contenedorLista}>
        <h1 className={styles.tituloLista}>{titulo}</h1>

        {error && <p className={styles.error}>{error}</p>}
        {cargando && <p>Cargando...</p>}
        {!cargando && !error && filas.length === 0 && <p>{vacio}</p>}

        <ul className={styles.listaReportes}>
          {filas.map((r) => {
            const imagen = urlImagen(r.mcreacion?.imagen);
            const reporto = r.musuarios?.nombre;
            return (
              <li key={apelaciones ? r.id_apelacion : r.id_reporte} className={styles.filaReporte}>
                <div className={styles.miniatura}>
                  {imagen ? <img src={imagen} alt="" /> : null}
                </div>

                <div className={styles.datosReporte}>
                  <h2>{r.mcreacion?.nombre}</h2>
                  {apelaciones ? (
                    <>
                      <span className={styles.etiquetaRechazo}>Apelación</span>
                      <p>{r.motivo}</p>
                    </>
                  ) : (
                    <>
                      <span className={styles.etiquetaRechazo}>
                        {MOTIVOS[r.motivo] || r.motivo}
                      </span>
                      {r.detalle && <p>{r.detalle}</p>}
                    </>
                  )}
                  {reporto && (
                    <p className={styles.reportero}>
                      {apelaciones ? "Apeló" : "Reportó"}: {reporto}
                    </p>
                  )}
                </div>

                <Link
                  href={
                    apelaciones
                      ? `/verificador/apelaciones?id=${r.id_apelacion}`
                      : `/verificador/reporte?id=${r.id_creacion}`
                  }
                  className={styles.botonAprobar}
                >
                  Revisar
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}