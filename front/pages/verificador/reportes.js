import ListaReportesVerificador from "../../components/ListaReportesVerificador";

export default function Reportes() {
  return (
    <ListaReportesVerificador
      titulo="Reportes pendientes"
      ruta="/verificador/reportes"
      vacio="No hay reportes pendientes."
    />
  );
}