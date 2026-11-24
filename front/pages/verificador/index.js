import { useEffect, useState } from "react";
import Link from "next/link";
import { pedirJSON } from "../../lib/api";
import TarjetaCreacionVerificar from "../../components/TarjetaCreacionVerificar";
import BarraElegir from "../../components/BarraElegir";
import styles from "./verificador.module.css";

// Inicio del verificador: creaciones que nadie ha elegido.
// Selecciona varias, da "Elegir estas" y pasan a "Por verificar".
export default function InicioVerificador() {
  const [creaciones, setCreaciones] = useState([]);
  const [seleccion, setSeleccion] = useState([]); // ids marcados
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");

  function cargar() {
    setError("");
    return pedirJSON("/verificador/creaciones")
      .then((datos) => setCreaciones(Array.isArray(datos) ? datos : []))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }

  useEffect(() => {
    cargar();
  }, []);

  const alternar = (id) =>
    setSeleccion((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  async function elegir() {
    setError("");
    setAviso("");
    setEnviando(true);
    try {
      const { tomadas, noDisponibles } = await pedirJSON("/verificador/creaciones/tomar", {
        method: "POST",
        body: JSON.stringify({ ids: seleccion }),
      });
      // Las tomadas desaparecen del inicio
      setCreaciones((prev) => prev.filter((c) => !tomadas.includes(c.id_creacion)));
      setSeleccion([]);
      setAviso(
        `${tomadas.length} ${tomadas.length === 1 ? "creación pasó" : "creaciones pasaron"} a Por verificar.` +
          (noDisponibles > 0 ? ` ${noDisponibles} ya las había elegido otro verificador.` : "")
      );
      // Si otro verificador ganó alguna, se recarga para que ya no aparezca
      if (noDisponibles > 0) cargar();
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className={styles.fondo}>
      <div className={styles.contenedorLista}>
        <div className={styles.encabezadoLista}>
          <h1 className={styles.tituloLista}>Creaciones por revisar</h1>
          <Link href="/verificador/por-verificar" className={styles.botonRegresar}>
            Ir a Por verificar
          </Link>
        </div>
        <p className={styles.ayuda}>Toca las creaciones que quieras revisar y luego “Elegir estas”.</p>

        {error && <p className={styles.error}>{error}</p>}
        {aviso && <p className={styles.aviso} role="status">{aviso}</p>}

        {cargando ? (
          <p>Cargando...</p>
        ) : creaciones.length === 0 ? (
          <p>No hay creaciones sin verificar</p>
        ) : (
          <div className={styles.listaCreacion}>
            {creaciones.map((c) => (
              <TarjetaCreacionVerificar
                key={c.id_creacion}
                creacion={c}
                seleccionable
                seleccionada={seleccion.includes(c.id_creacion)}
                onAlternar={alternar}
              />
            ))}
          </div>
        )}
      </div>

      <BarraElegir
        cantidad={seleccion.length}
        enviando={enviando}
        onElegir={elegir}
        onLimpiar={() => setSeleccion([])}
      />
    </main>
  );
}
