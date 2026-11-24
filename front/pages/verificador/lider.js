import { useEffect, useState } from "react";
import Link from "next/link";
import { pedirJSON } from "../../lib/api";
import FilaRevision, { claveFila } from "../../components/FilaRevision";
import BarraElegir from "../../components/BarraElegir";
import styles from "./verificador.module.css";

// Inicio del verificador líder: reportes y apelaciones que nadie ha elegido.
// Puede marcar de las dos pestañas a la vez; al elegir pasan a "Por revisar".
export default function InicioLider() {
  const [pestana, setPestana] = useState("reportes"); // 'reportes' | 'apelaciones'
  const [reportes, setReportes] = useState([]);
  const [apelaciones, setApelaciones] = useState([]);
  const [seleccion, setSeleccion] = useState({}); // { "reporte-12": item, "apelacion-5": item }
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");

  function cargar() {
    setError("");
    return Promise.all([pedirJSON("/verificador/reportes"), pedirJSON("/verificador/apelaciones")])
      .then(([r, a]) => {
        setReportes(Array.isArray(r) ? r : []);
        setApelaciones(Array.isArray(a) ? a : []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }

  useEffect(() => {
    cargar();
  }, []);

  function alternar(item) {
    const clave = claveFila(item);
    setSeleccion((prev) => {
      const nueva = { ...prev };
      if (nueva[clave]) delete nueva[clave];
      else nueva[clave] = item;
      return nueva;
    });
  }

  const elegidos = Object.values(seleccion);

  async function elegir() {
    setError("");
    setAviso("");
    setEnviando(true);
    try {
      const cuerpo = {
        reportes: elegidos.filter((i) => i.tipo !== "apelacion").map((i) => i.id_creacion),
        apelaciones: elegidos.filter((i) => i.tipo === "apelacion").map((i) => i.id_apelacion),
      };
      const res = await pedirJSON("/verificador/tomar", {
        method: "POST",
        body: JSON.stringify(cuerpo),
      });
      // Lo que tomó desaparece del inicio
      setReportes((prev) => prev.filter((r) => !res.reportes.includes(r.id_creacion)));
      setApelaciones((prev) => prev.filter((a) => !res.apelaciones.includes(a.id_apelacion)));
      setSeleccion({});

      const total = res.reportes.length + res.apelaciones.length;
      setAviso(
        `${total} ${total === 1 ? "pendiente pasó" : "pendientes pasaron"} a Por revisar.` +
          (res.noDisponibles > 0 ? ` ${res.noDisponibles} ya no estaban disponibles.` : "")
      );
      if (res.noDisponibles > 0) cargar();
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  const lista = pestana === "reportes" ? reportes : apelaciones;

  return (
    <main className={styles.fondo}>
      <div className={styles.contenedorLista}>
        <div className={styles.encabezadoLista}>
          <h1 className={styles.tituloLista}>Pendientes</h1>
          <Link href="/verificador/por-revisar" className={styles.botonRegresar}>
            Ir a Por revisar
          </Link>
        </div>

        <div className={styles.pestanas} role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={pestana === "reportes"}
            className={`${styles.pestana} ${pestana === "reportes" ? styles.pestanaActiva : ""}`}
            onClick={() => setPestana("reportes")}
          >
            Reportes ({reportes.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={pestana === "apelaciones"}
            className={`${styles.pestana} ${pestana === "apelaciones" ? styles.pestanaActiva : ""}`}
            onClick={() => setPestana("apelaciones")}
          >
            Apelaciones ({apelaciones.length})
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {aviso && <p className={styles.aviso} role="status">{aviso}</p>}

        {cargando ? (
          <p>Cargando...</p>
        ) : lista.length === 0 ? (
          <p>{pestana === "reportes" ? "No hay reportes pendientes." : "No hay apelaciones pendientes."}</p>
        ) : (
          <ul className={styles.listaReportes}>
            {lista.map((item) => (
              <FilaRevision
                key={claveFila(item)}
                item={item}
                seleccionable
                seleccionada={Boolean(seleccion[claveFila(item)])}
                onAlternar={alternar}
              />
            ))}
          </ul>
        )}
      </div>

      <BarraElegir
        cantidad={elegidos.length}
        enviando={enviando}
        onElegir={elegir}
        onLimpiar={() => setSeleccion({})}
      />
    </main>
  );
}
