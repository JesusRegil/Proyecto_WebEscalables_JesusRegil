import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InventarioService } from '../../services/inventario.service';
import { ProductoCard } from '../../producto-card/producto-card';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, ProductoCard],
  template: `
    <section class="text-center py-10">
      <h1 class="text-3xl font-bold text-indigo-700">InventaPyme</h1>
      <p class="mt-2 text-gray-600">Control de inventario y ventas para tu pequeño negocio.</p>
      <a routerLink="/catalogo" class="inline-block mt-4 bg-indigo-600 text-white px-4 py-2 rounded">
        Ver catálogo
      </a>
    </section>

    <h2 class="text-xl font-semibold mb-3">Algunos productos</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      @for (p of destacados(); track p.id) {
        <app-producto-card [producto]="p" />
      }
    </div>
  `,
})
export class Inicio {
  private inventario = inject(InventarioService);

  // solo los primeros 3 como vistazo del catalogo
  destacados = computed(() => this.inventario.productos().slice(0, 3));
}
