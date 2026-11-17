import TarjetaCreacion from './TarjetaCreacion';

export default function ListaCreaciones({ listaCreaciones }) {
    return (
        <article className='tarjeta'>
            <div className='listaCreacion'>
                {listaCreaciones.map((c) => (
                    <TarjetaCreacion key={c.id_creacion} creacion={c} />
                ))}
            </div>
        </article>
    );
}