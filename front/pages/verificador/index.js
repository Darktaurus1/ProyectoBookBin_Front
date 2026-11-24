import { useEffect, useState } from "react";
import Link from "next/link";
import { pedirJSON } from "../../lib/api";
import TarjetaCreacion from "../../components/TarjetaCreacionVerificar";
import styles from "./verificador.module.css";

export default function Home() {
  const [creaciones, setCreaciones] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    let vigente = true;
    setError('');
    pedirJSON('/verificador/creaciones').then((datos) => {if (vigente) setCreaciones(datos.filter((c) => !(Number(c.veces_rechazada) > 0 && Number(c.corregida) !== 1)));}).catch((err) => {if(vigente) setError(err.message);});
    return () => {vigente = false;}
  }, [])


  return (
    <main className={styles.fondo}>
        {/*Creaciones*/}
        <div className={styles.contenedorLista}>
            {error && <p className={styles.error}>{error}</p>}
            {creaciones.length === 0 ? (
                <p>No hay creaciones sin verificar</p>
            ):
            (
                <div className={styles.listaCreacion}>
                    {creaciones.map((c) => {
                        const idCreacion = c.id_creacion ?? c.id;
                        return(<TarjetaCreacion key={idCreacion} creacion = {c}/>);
                    })}
                </div>
            )} 
        </div>
    </main>
  )

}