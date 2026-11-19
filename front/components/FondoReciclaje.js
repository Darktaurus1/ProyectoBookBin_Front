import fondo from './FondoReciclaje.module.css';

// Fondo decorativo animado. El contenedor padre necesita
// position: relative; e isolation: isolate; para que quede detrás del contenido.
export default function FondoReciclaje() {
    return <div className={fondo['fondo-cascada']} aria-hidden="true" />;
}