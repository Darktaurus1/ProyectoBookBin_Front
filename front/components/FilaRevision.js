import Link from "next/link";
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

// Clave única de una fila: "reporte-12" (id de la creación) o "apelacion-5" (id de la apelación)
export function claveFila(item) {
  return item.tipo === "apelacion" ? `apelacion-${item.id_apelacion}` : `reporte-${item.id_creacion}`;
}

// Fila de un reporte o una apelación para el líder.
//  - seleccionable (inicio): clic la marca o desmarca
//  - normal (Por revisar): botón "Revisar" y "Soltar"
export default function FilaRevision({ item, seleccionable = false, seleccionada = false, onAlternar, onSoltar }) {
  const esApelacion = item.tipo === "apelacion";
  const imagen = urlImagen(item.mcreacion?.imagen);
  const persona = item.musuarios?.nombre;
  const enlace = esApelacion
    ? `/verificador/apelaciones?id=${item.id_apelacion}`
    : `/verificador/reporte?id=${item.id_creacion}`;

  const contenido = (
    <>
      <div className={styles.miniatura}>{imagen ? <img src={imagen} alt="" /> : null}</div>

      <div className={styles.datosReporte}>
        <h2>{item.mcreacion?.nombre}</h2>
        <div className={styles.etiquetas}>
          <span className={esApelacion ? styles.etiquetaCorregida : styles.etiquetaRechazo}>
            {esApelacion ? "Apelación" : "Reporte"}
          </span>
          {!esApelacion && item.total > 1 && (
            <span className={styles.etiquetaSinCorregir}>{item.total} reportes</span>
          )}
        </div>
        {esApelacion ? (
          <p>{item.motivo}</p>
        ) : (
          <p>
            {(item.motivos || [item.motivo]).map((m) => MOTIVOS[m] || m).join(", ")}
            {item.detalle ? ` — ${item.detalle}` : ""}
          </p>
        )}
        {persona && (
          <p className={styles.reportero}>
            {esApelacion ? "Apeló" : "Reportó"}: {persona}
          </p>
        )}
      </div>
    </>
  );

  if (seleccionable) {
    return (
      <li>
        <button
          type="button"
          className={`${styles.filaReporte} ${styles.filaSeleccionable} ${seleccionada ? styles.filaSeleccionada : ""}`}
          aria-pressed={seleccionada}
          onClick={() => onAlternar(item)}
        >
          <span className={styles.marcaFila} aria-hidden="true">{seleccionada ? "✓" : ""}</span>
          {contenido}
        </button>
      </li>
    );
  }

  return (
    <li className={styles.filaReporte}>
      {contenido}
      <div className={styles.accionesFila}>
        <Link href={enlace} className={styles.botonAprobar}>
          Revisar
        </Link>
        {onSoltar && (
          <button type="button" className={styles.botonSoltar} onClick={() => onSoltar(item)}>
            Soltar
          </button>
        )}
      </div>
    </li>
  );
}
