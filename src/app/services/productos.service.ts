import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Producto {
  id?: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  descripcion: string;
  imagenUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private firestore = inject(Firestore);
  private productosRef = collection(this.firestore, 'productos');

  obtenerProductos(): Observable<Producto[]> {
    return collectionData(this.productosRef, { idField: 'id' }) as Observable<Producto[]>;
  }

  agregarProducto(producto: Producto) {
    return addDoc(this.productosRef, producto);
  }

  actualizarProducto(id: string, datos: Partial<Producto>) {
    const docRef = doc(this.firestore, `productos/${id}`);
    return updateDoc(docRef, datos);
  }

  eliminarProducto(id: string) {
    const docRef = doc(this.firestore, `productos/${id}`);
    return deleteDoc(docRef);
  }
}