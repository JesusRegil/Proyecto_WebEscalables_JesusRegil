import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Producto } from '../interfaces/producto.interface';

@Component({
  selector: 'app-producto-card',
  imports: [CurrencyPipe],
  template: `
    <article class="bg-white rounded-lg shadow overflow-hidden">
      <img class="w-full h-36 object-cover" [src]="producto().foto" [alt]="producto().nombre" />
      <div class="p-3">
        <span class="text-xs text-gray-500">{{ producto().categoria }}</span>
        <h3 class="font-semibold">{{ producto().nombre }}</h3>
        <p class="text-indigo-600 font-bold">{{ producto().precio | currency: 'MXN' }}</p>
        @if (producto().existencias > 0) {
          <span class="text-xs text-green-600">Disponible</span>
        } @else {
          <span class="text-xs text-red-600">Agotado</span>
        }
      </div>
    </article>
  `,
})
export class ProductoCard {
  producto = input.required<Producto>();
}
