import { useEffect } from "react";
import { useRouter } from "next/router";
import { esVerificador, rutaInicio } from "../lib/rutas";
import Menu from "../components/menu";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const ocultarMenu =
    router.pathname === "/registro" || router.pathname === "/login";

  // Un administrador solo puede estar en las páginas /admin
  useEffect(() => {
    if (ocultarMenu) return;

    let u = null;
    try {
      u = JSON.parse(localStorage.getItem("usuario"));
    } catch {
      u = null;
    }

    const tipo = u?.tipo;
    const ruta = router.pathname;

    if (tipo === "administrador") {
      if (!ruta.startsWith("/admin")) router.replace("/admin");
    } else if (esVerificador(tipo)) {
      const enZonaVerificador = ruta.startsWith("/verificador");
      const lideraEnPaginaLider =
        ruta.startsWith("/verificador/lider") && tipo !== "verificador_lider";
      if (!enZonaVerificador || lideraEnPaginaLider)
        router.replace(rutaInicio(tipo));
    } else if (ruta.startsWith("/verificador")) {
      // usuario normal o sin sesión intentando entrar a páginas de verificador
      router.replace("/login");
    }
  }, [router.pathname]);
  return (
    <>
      {!ocultarMenu && <Menu />}
      <Component {...pageProps} />
    </>
  );
}
