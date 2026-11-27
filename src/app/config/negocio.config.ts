
export const CONFIG = {
  // WhatsApp del negocio (Perú)
  whatsapp: '51927102791',

  // Moneda utilizada
  moneda: 'S/',

  // Imagen predeterminada de productos
  imagenPorDefecto: 'img/productos/sin-foto.webp',

  // Mensajes automáticos
  mensajes: {
    general:
      'Hola JC El Gringo, quiero consultar por un repuesto o servicio para mi mototaxi.',

    servicio:
      'Hola JC El Gringo, quiero cotizar un servicio para mi mototaxi.',

    producto:
      'Hola JC El Gringo, quiero consultar por este repuesto: {producto}. ¿Lo tienen disponible?'
  }
} as const;
