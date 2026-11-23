import ListaReportesVerificador from "../../components/ListaReportesVerificador";

// Solo el verificador líder puede ver esta lista (lo exige el backend)
export default function Apelaciones() {
  return (
    <ListaReportesVerificador
      titulo="Apelaciones"
      ruta="/verificador/apelaciones"
      vacio="No hay apelaciones pendientes."
    />
  );
}