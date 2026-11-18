import { useEffect, useState } from "react";
import Link from "next/link";
import { pedirJSON } from "../lib/api";
import TarjetaCreacion from "../components/TarjetaCreacion";
import styles from "./index.module.css";

export default function Home() {
  const [creaciones, setCreaciones] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    pedirJSON("/materiales")
      .then((datos) => setMateriales(Array.isArray(datos) ? datos : []))
      .catch(() => setError("No se pudieron cargar los materiales."));
  }, []);


  useEffect(() => {
    let vigente = true;
    setError('');
    pedirJSON('/mcreaciones').then((datos) => {if (vigente) setCreaciones(datos);}).catch((err) => {if(vigente) setError(err.message);});
    return () => {vigente = false;}
  }, [])

  const filtar = creaciones.filter((c) => {
    if (c.aprovado = true) return false;
    return true;
  });

  return (
    <main className={styles.fondo}>
        {/*Creaciones*/}
        <div className={styles.contenedorLista}>
            {error && <p style={{color: 'ffdddd'}}>{error}</p>}
            {filtar.length === 0 ? (
                <p>No hay creaciones sin verificar</p>
            ):
            (
                <div className={styles.listaCreacion}>
                    {filtar.map((c) => {
                        const idCreacion = c.id_creacion ?? c.id;
                        return(<TargetaCreacion key={idCreacion} creacion = {c}/>);
                    })}
                </div>
            )} 
        </div>
    </main>
  )

}
