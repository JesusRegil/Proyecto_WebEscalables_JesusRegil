import { Component, computed, inject, signal } from '@angular/core';
import { InventarioService } from '../../services/inventario.service';
import { ProductoCard } from '../../producto-card/producto-card';

@Component({
  selector: 'app-catalogo',
  imports: [ProductoCard],
  template: `
    <h1 class="text-2xl font-bold mb-4">Catálogo</h1>

    <select class="border rounded p-2 mb-4" (change)="categoria.set($any($event.target).value)">
      <option value="">Todas las categorías</option>
      @for (c of inventario.categorias; track c) {
        <option [value]="c">{{ c }}</option>
      }
    </select>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      @for (p of filtrados(); track p.id) {
        <app-producto-card [producto]="p" />
      } @empty {
        <p class="text-gray-500">No hay productos en esta categoría.</p>
      }
    </div>
  `,
})
export class Catalogo {
  inventario = inject(InventarioService);
  categoria = signal('');

  // se recalcula cuando cambia la categoria o la lista de productos
  filtrados = computed(() =>
    this.inventario.productos().filter((p) => !this.categoria() || p.categoria === this.categoria()),
  );
}
