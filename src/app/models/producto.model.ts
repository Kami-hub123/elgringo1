export interface Producto {
  id?: string;
  nombre: string;
  marca: string;
  categoria: string;
  compatibilidad: string;
  precio: number;
  stock: number;
  original: boolean;
  imagen: string;
  promocion?: boolean;
  precioAntes?: number;
}