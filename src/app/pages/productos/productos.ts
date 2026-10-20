import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventarioService } from '../../services/inventario.service';

@Component({
  selector: 'app-productos',
  imports: [FormsModule, CurrencyPipe],
  template: `
    <h1 class="text-2xl font-bold mb-4">Gestión de productos</h1>

    <form class="bg-white p-4 rounded-lg shadow grid grid-cols-1 md:grid-cols-5 gap-2 mb-6" (ngSubmit)="agregar()">
      <input class="border rounded p-2" name="nombre" placeholder="Nombre" [(ngModel)]="nuevo.nombre" />
      <select class="border rounded p-2" name="categoria" [(ngModel)]="nuevo.categoria">
        @for (c of inventario.categorias; track c) {
          <option [value]="c">{{ c }}</option>
        }
      </select>
      <input class="border rounded p-2" type="number" name="precio" placeholder="Precio" [(ngModel)]="nuevo.precio" />
      <input class="border rounded p-2" type="number" name="existencias" placeholder="Existencias"
        [(ngModel)]="nuevo.existencias" />
      <button class="bg-indigo-600 text-white rounded p-2">Agregar</button>
    </form>

    <div class="overflow-x-auto">
      <table class="w-full bg-white rounded-lg shadow text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2">Nombre</th>
            <th class="p-2">Categoría</th>
            <th class="p-2">Precio</th>
            <th class="p-2">Existencias</th>
            <th class="p-2"></th>
          </tr>
        </thead>
        <tbody>
          @for (p of inventario.productos(); track p.id) {
            <tr class="border-t">
              <td class="p-2">{{ p.nombre }}</td>
              <td class="p-2">{{ p.categoria }}</td>
              <td class="p-2">{{ p.precio | currency: 'MXN' }}</td>
              <td class="p-2">{{ p.existencias }}</td>
              <td class="p-2">
                <button class="text-red-600" (click)="eliminar(p.id, p.nombre)">Eliminar</button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class Productos {
  inventario = inject(InventarioService);

  nuevo = this.vacio();

  agregar() {
    if (!this.nuevo.nombre) return;
    this.inventario.agregarProducto({ ...this.nuevo });
    this.nuevo = this.vacio();
  }

  // pide confirmacion antes de borrar, como dice la propuesta
  eliminar(id: number, nombre: string) {
    if (confirm(`¿Eliminar "${nombre}"?`)) {
      this.inventario.eliminarProducto(id);
    }
  }

  private vacio() {
    return {
      nombre: '',
      descripcion: '',
      categoria: this.inventario.categorias[0],
      precio: 0,
      existencias: 0,
      foto: 'https://placehold.co/300x200?text=Producto',
    };
  }
}
