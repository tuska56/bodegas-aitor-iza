# Bodega Aitor Iza Ibáñez — tienda web

Web para enseñar vuestro catálogo de vinos y recibir pedidos. El cliente elige
botellas, rellena sus datos y el pedido se abre como un mensaje de WhatsApp
listo para enviaros, para que lo verifiquéis y lo cerréis con él.

No lleva servidor ni base de datos: son solo archivos HTML/CSS/JS, así que se
puede alojar gratis en **GitHub Pages**.

## Estructura del proyecto

```
index.html                 → la página
assets/css/styles.css      → todo el diseño
assets/js/data.js          → EL CATÁLOGO: vinos, precios y tu nº de WhatsApp
assets/js/app.js           → lógica de la cesta y el pedido (no hace falta tocarlo)
assets/img/                → fotos de las botellas
```

## Cómo verlo en tu ordenador antes de publicarlo

No puedes abrir `index.html` haciendo doble clic (el navegador bloquea algunas
cosas). Necesitas un servidor local muy simple:

1. Instala [Python](https://www.python.org/) si no lo tienes (o usa el que ya
   trae Mac/Linux).
2. Abre una terminal dentro de esta carpeta y ejecuta:
   ```
   python3 -m http.server 8000
   ```
3. Abre en el navegador: `http://localhost:8000`

## Cómo publicarlo en GitHub Pages (gratis)

1. Crea un repositorio nuevo en GitHub (por ejemplo `bodega-aitor-iza`).
2. Sube todos los archivos de esta carpeta a ese repositorio (puedes
   arrastrarlos desde la web de GitHub con "Add file → Upload files", o con
   git desde la terminal).
3. En el repositorio, ve a **Settings → Pages**.
4. En "Branch" elige `main` y la carpeta `/ (root)`, y guarda.
5. A los pocos minutos tu web estará publicada en una dirección del tipo:
   `https://tu-usuario.github.io/bodega-aitor-iza/`
6. Si más adelante compráis un dominio propio (por ejemplo
   `bodegaaitoriza.com`), se puede apuntar a esa misma web sin tocar el
   código — solo hay que configurarlo en GitHub Pages ("Custom domain").

## Cómo editar el catálogo (vinos y precios)

Todo el catálogo está en **`assets/js/data.js`**. Cada vino es un bloque así:

```js
{
  id: "izas-tinto",
  name: "Izas",
  tag: "Tinto · Bodega Familiar",
  type: "tinto",              // "tinto", "blanco" o "rosado"
  desc: "Nuestro tinto de cabecera...",
  price: 9.90,                 // precio en euros
  vol: "75 cl",
  img: "assets/img/izas-tinto.jpg",
  alt: "Botella de vino tinto Izas..."
}
```

Para **cambiar un precio o texto**, edita el valor entre comillas o el número.
Para **añadir un vino nuevo**, copia un bloque completo, pégalo antes del
`];` final, cambia el `id` (no lo repitas en ningún otro vino) y rellena sus
datos. Para **quitar un vino**, borra su bloque entero.

Los precios que hay ahora son orientativos — cámbialos por los vuestros
reales antes de publicar la web.

## Cómo cambiar o añadir fotos

1. Guarda la foto nueva dentro de `assets/img/` (formato `.jpg`, a ser
   posible no muy pesada, idealmente menos de 300&nbsp;KB).
2. En `assets/js/data.js`, en el vino correspondiente, cambia la ruta del
   campo `img` para que apunte a tu archivo nuevo, por ejemplo:
   `img: "assets/img/mi-foto-nueva.jpg"`.

## Cómo funciona el pedido por WhatsApp

Cuando un cliente completa el pedido y pulsa **"Enviar pedido por
WhatsApp"**, el navegador abre WhatsApp (la app en el móvil, o WhatsApp Web
en el ordenador) con una conversación ya abierta hacia vuestro número, y con
el mensaje del pedido ya escrito (vinos, cantidades, precio, nombre,
teléfono, forma de entrega y notas). El cliente solo tiene que pulsar
**enviar** dentro de WhatsApp para que os llegue.

Esto significa que **el pedido llega solo si el cliente pulsa enviar en
WhatsApp** — la web no puede mandarlo sola por vosotros, porque una web
gratuita como esta no tiene permiso para escribir en WhatsApp en nombre de
otra persona. Es exactamente el mismo comportamiento que un botón de
"contactar por WhatsApp" de cualquier negocio. Así vosotros veis el pedido
completo escrito por el cliente y podéis confirmarlo con él directamente por
chat, tal y como pedisteis.

Si en el futuro queréis que los pedidos lleguen 100% automáticos sin que el
cliente tenga que pulsar enviar, hace falta contratar la **API oficial de
WhatsApp Business**, que ya no es gratuita ni son solo archivos estáticos —
avisadme si llegado el momento queréis dar ese paso.

### Cambiar el número de WhatsApp

Al final de `assets/js/data.js`:

```js
const WHATSAPP_NUMBER = "34650531513";
```

Es vuestro número en formato internacional, sin espacios, sin `+` y sin
guiones (el `34` es el prefijo de España).

## Ideas para más adelante

- Añadir fotos de la viña o del proceso de elaboración en la sección "La
  bodega".
- Añadir un aviso de "gastos de envío" o "pedido mínimo" cerca del botón de
  WhatsApp si lo necesitáis.
- Traducir la web a euskera o inglés si vendéis fuera de la zona.
