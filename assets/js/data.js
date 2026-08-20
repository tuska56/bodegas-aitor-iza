/* =====================================================
   CATÁLOGO DE VINOS
   -----------------------------------------------------
   Edita aquí tus vinos: nombre, tipo, descripción, precio...
   type debe ser: "tinto", "blanco" o "rosado"
   price en euros, formato numérico (ej: 9.90)
   ===================================================== */

const WINES = [
  {
    id: "izas-tinto",
    name: "Izas",
    tag: "Tinto · Bodega Familiar",
    type: "tinto",
    desc: "Nuestro tinto de cabecera. Fruta madura, paso suave y ese carácter directo de la Rioja Alavesa, pensado para el día a día.",
    price: 9.90,
    vol: "75 cl",
    img: "assets/img/izas-tinto.jpg",
    alt: "Botella de vino tinto Izas, Bodega Familiar, Rioja Alavesa"
  },
  {
    id: "izas-blanco-lias",
    name: "Izas",
    tag: "Blanco · En sus propias lías",
    type: "blanco",
    desc: "Blanco criado sobre sus propias lías, que le aportan volumen y una textura cremosa sin perder frescura.",
    price: 8.90,
    vol: "75 cl",
    img: "assets/img/izas-blanco-lias.jpg",
    alt: "Botella de vino blanco Izas En sus propias lías"
  },
  {
    id: "izas-blanco-barrica",
    name: "Izas",
    tag: "Blanco · Fermentado en barrica",
    type: "blanco",
    desc: "Fermentado en barrica para ganar complejidad: notas tostadas que se integran con la fruta blanca y un final largo.",
    price: 11.90,
    vol: "75 cl",
    img: "assets/img/izas-blanco-barrica.jpg",
    alt: "Botella de vino blanco Izas Fermentado en barrica"
  },
  {
    id: "rosado-familiar",
    name: "Bodega Familiar",
    tag: "Rosado · Uva garnacha",
    type: "rosado",
    desc: "Un rosado de los de toda la vida. Buen color, aromas a frutas rojas, con cuerpo, ligero, afrutado y refrescante.",
    price: 7.90,
    vol: "75 cl",
    img: "assets/img/rosado-familiar.jpg",
    alt: "Botella de vino rosado Bodega Familiar, uva garnacha"
  },
  {
    id: "seleccion-tinto",
    name: "Selección",
    tag: "Tinto · Bodega Familiar",
    type: "tinto",
    desc: "Nuestra gama alta: selección de las mejores parcelas para un tinto con más estructura, cuerpo y capacidad de guarda.",
    price: 13.50,
    vol: "75 cl",
    img: "assets/img/seleccion-tinto.jpg",
    alt: "Botella de vino tinto Selección, Bodega Familiar"
  },
  {
    id: "anadas-blanco",
    name: "Añadas del Encuentro",
    tag: "Blanco joven afrutado",
    type: "blanco",
    desc: "Joven y afrutado, pensado para beber fácil: aromas frescos de fruta blanca y un paso ligero por boca.",
    price: 7.50,
    vol: "75 cl",
    img: "assets/img/anadas-blanco.jpg",
    alt: "Botella de vino blanco Añadas del Encuentro, joven afrutado"
  },
  {
    id: "anadas-tinto",
    name: "Añadas del Encuentro",
    tag: "Tinto joven afrutado",
    type: "tinto",
    desc: "Tinto joven y afrutado, de capa alegre y taninos suaves. Ideal para compartir sin complicarse.",
    price: 7.50,
    vol: "75 cl",
    img: "assets/img/anadas-tinto.jpg",
    alt: "Botella de vino tinto Añadas del Encuentro, joven afrutado"
  }
];

/* =====================================================
   CONFIGURACIÓN DEL PEDIDO POR WHATSAPP
   -----------------------------------------------------
   Escribe el número de WhatsApp de la bodega en formato
   internacional, SIN "+", sin espacios ni guiones.
   Ejemplo para 650 531 513 (España, prefijo 34):
   ===================================================== */
const WHATSAPP_NUMBER = "34650531513";
