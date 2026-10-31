# SHIRA ACTIVE

Base de una tienda online de indumentaria deportiva. Es un sitio estatico hecho con HTML, CSS y JavaScript: no necesita instalar dependencias, configurar un servidor ni ejecutar un proceso de build.

## Probar en tu computadora

Abre `index.html` en un navegador o inicia un servidor estatico desde esta carpeta, por ejemplo:

```bash
python -m http.server 8000
```

Luego visita `http://localhost:8000`.

## Publicar en GitHub Pages

El workflow de GitHub Actions en `.github/workflows/deploy.yml` publica el contenido de la raiz del repositorio cuando hay un push a `main`.

1. Sube el proyecto a la rama `main` de GitHub.
2. En el repositorio, ve a **Settings → Pages**.
3. En **Build and deployment**, elige **GitHub Actions** como fuente.
4. Revisa la pestaña **Actions** para seguir la primera publicacion. El sitio estara disponible en `https://<usuario>.github.io/<repositorio>/`.

Tambien puedes ejecutar el workflow manualmente desde la pestaña **Actions**.

## Personalizar

- Edita el catalogo de ejemplo en `app.js`.
- Cambia textos, estilos y fotografias en `index.html` y `styles.css`.
- Reemplaza los enlaces de imagen de Unsplash por fotografias propias cuando prepares la tienda real.

El carrito y el checkout son demostrativos: GitHub Pages sirve archivos estaticos y este ejemplo no procesa pagos ni guarda pedidos.
