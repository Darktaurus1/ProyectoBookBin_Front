# BookBin – Frontend

Interfaz web de **BookBin**, una plataforma para compartir manualidades hechas con materiales reciclados.
Proyecto aula de Programación Intermedia · CECyT 9 · Grupo 4IV7 · Equipo 5.

🔗 **Demo:** https://bookbin-taupe.vercel.app

## Tecnologías
- Next.js 16 (pages router)
- React 19
- CSS Modules (diseño responsivo para celular)

- ## Integrantes
- Arellano Ramírez Guadalupe Donaji
- Díaz Briseño Erick Gabriel
- Luan Lin Emiliano
- Meneses Hernández Luis Ángel

## Estructura
```
front/
├── pages/          # Cada archivo es una página (index, login, creaciones, verificador, admin…)
├── components/     # Tarjetas, buscadores, editor de pasos, modales, menú
├── lib/            # api.js: peticiones al backend con JWT y renovación del token
└── next.config.js  # Redirige /api al backend
```

## Instalación
```bash
cd front
npm install
```

Crea un archivo `.env.local` dentro de `front/` con la dirección del backend:

```
API_URL=http://localhost:4000
```
(o `https://bookbin-web.onrender.com` para usar el backend en línea)

## Ejecutar
```bash
npm run dev     # http://localhost:3000
npm run build   # comprobar que compila antes de subir
```

## Funciones
- Inicio con creaciones aleatorias, búsqueda y filtro por material
- Detalle con materiales, cantidades, herramientas e instrucciones paso a paso
- Crear, editar, guardar como borrador y eliminar creaciones
- Favoritos, reportes, notificaciones y apelaciones
- Panel de verificadores y de administrador

## Despliegue
Desplegado en **Vercel** (Root Directory: `front`) con la variable `API_URL` apuntando al backend en Render.
