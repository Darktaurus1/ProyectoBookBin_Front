self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/pages/index.js"
  ],
  "/_error": [
    "static/chunks/pages/_error.js"
  ],
  "/creaciones/[id]": [
    "static/chunks/pages/creaciones/[id].js"
  ],
  "__rewrites": {
    "afterFiles": [
      {
        "source": "/api/:path*"
      }
    ],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/_app",
    "/_error",
    "/admin",
    "/creaciones/favoritos",
    "/creaciones/nueva",
    "/creaciones/[id]",
    "/login",
    "/perfil",
    "/registro"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()