
import { Injectable } from '@angular/core';
import { CONFIG } from '../config/negocio.config';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  /** Devuelve un enlace de WhatsApp con el mensaje codificado. */
  enlaceWhatsApp(mensaje: string): string {
    return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;
  }

  /** Genera el mensaje para consultar un repuesto. */
  mensajeProducto(nombreProducto: string): string {
    return CONFIG.mensajes.producto.replace(
      '{producto}',
      nombreProducto
    );
  }
}
