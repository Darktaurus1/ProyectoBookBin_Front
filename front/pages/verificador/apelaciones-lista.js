import ListaReportesVerificador from "../../components/ListaReportesVerificador";

// Apelaciones de autores a un rechazo; las ven todos los verificadores
export default function ApelacionesLista() {
  return (
    <ListaReportesVerificador
      titulo="Apelaciones"
      ruta="/verificador/apelaciones"
      vacio="No hay apelaciones pendientes."
      apelaciones
    />
  );
}