import { useEffect, useState } from 'react';
import { pedirJSON } from '../lib/api';
import ListaCreaciones from '../components/ListaCreaciones';

// Devuelve una copia de la lista en orden aleatorio
function mezclar(lista) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

export default function Home() {
    const [creaciones, setCreaciones] = useState([]);
    const [error, setError] = useState('');
    const [materiales, setMateriales] = useState([]);
    const [materialSeleccionado, setMaterialSeleccionado] = useState('');

    // Carga el catálogo de materiales una sola vez
    useEffect(() => {
        pedirJSON('/materiales')
            .then((datos) => setMateriales(Array.isArray(datos) ? datos : []))
            .catch(() => setError('No se pudieron cargar los materiales.'));
    }, []);

    // Carga las creaciones al inicio y cada vez que cambia el material elegido
    useEffect(() => {
        let vigente = true;
        const ruta = materialSeleccionado
            ? `/creaciones?material=${materialSeleccionado}`
            : '/creaciones';

        setError('');
        pedirJSON(ruta)
            .then((datos) => { if (vigente) setCreaciones(mezclar(datos)); })
            .catch((err) => { if (vigente) setError(err.message); });

        return () => { vigente = false; };
    }, [materialSeleccionado]);

    return (
        <main>
            <div className='seleccion'>
                <button>Recomendados</button>
                <button>Historial</button>
                <button>Mis Creaciones</button>
            </div>

            <div className='filtroMateriales'>
                <label htmlFor='filtro-material'>Filtrar por material: </label>
                <select
                    id='filtro-material'
                    value={materialSeleccionado}
                    onChange={(e) => setMaterialSeleccionado(e.target.value)}
                >
                    <option value=''>Todos los materiales</option>
                    {materiales.map((m) => (
                        <option key={m.id_materiales} value={m.id_materiales}>
                            {m.nombre}
                        </option>
                    ))}
                </select>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ListaCreaciones listaCreaciones={creaciones} />
        </main>
    );
}