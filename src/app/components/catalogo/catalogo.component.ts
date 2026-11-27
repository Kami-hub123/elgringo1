import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { ProductosService, Producto } from '../../services/productos.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  private productosService = inject(ProductosService);

  pestanaActiva: 'mision' | 'vision' | 'objetivos' | 'valores' = 'mision';
  busqueda = '';
  categoriaSeleccionada = 'Todas';
  modoOscuro = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

  alternarTema() {
    this.modoOscuro = !this.modoOscuro;
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', this.modoOscuro);
      try {
        localStorage.setItem('tema', this.modoOscuro ? 'oscuro' : 'claro');
      } catch {}
    }
  }

  private busqueda$ = new BehaviorSubject<string>('');
  private categoria$ = new BehaviorSubject<string>('Todas');

  todosProductos$: Observable<Producto[]> = this.productosService.obtenerProductos();

  categorias$: Observable<string[]> = this.todosProductos$.pipe(
    map((items) => {
      const set = new Set<string>(['Todas']);
      items.forEach((p) => {
        if (p.categoria?.trim()) set.add(p.categoria.trim());
      });
      return Array.from(set);
    })
  );

  productosFiltrados$: Observable<Producto[]> = combineLatest([
    this.todosProductos$,
    this.busqueda$,
    this.categoria$
  ]).pipe(
    map(([items, term, cat]) => {
      const q = term.trim().toLowerCase();
      return items.filter((p) => {
        const coincideCat = cat === 'Todas' || p.categoria?.toLowerCase() === cat.toLowerCase();
        const coincideTexto =
          !q ||
          p.nombre?.toLowerCase().includes(q) ||
          p.categoria?.toLowerCase().includes(q) ||
          p.descripcion?.toLowerCase().includes(q);
        return coincideCat && coincideTexto;
      });
    })
  );

  onBuscar(event: Event) {
    event.preventDefault();
    this.busqueda$.next(this.busqueda);
  }

  onInputBuscar() {
    this.busqueda$.next(this.busqueda);
  }

  seleccionarCategoria(cat: string) {
    this.categoriaSeleccionada = cat;
    this.categoria$.next(cat);
  }
}