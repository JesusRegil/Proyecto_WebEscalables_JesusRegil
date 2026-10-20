import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InventarioService } from '../../services/inventario.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  template: `
    <form class="max-w-sm mx-auto bg-white p-6 rounded-lg shadow space-y-3" (ngSubmit)="entrar()">
      <h1 class="text-2xl font-bold">Iniciar sesión</h1>
      <input class="w-full border rounded p-2" type="email" name="correo" placeholder="Correo"
        [(ngModel)]="correo" required />
      <input class="w-full border rounded p-2" type="password" name="password" placeholder="Contraseña"
        [(ngModel)]="password" required />
      @if (error) {
        <p class="text-sm text-red-600">{{ error }}</p>
      }
      <button class="w-full bg-indigo-600 text-white py-2 rounded">Entrar</button>
      <p class="text-sm text-center">
        ¿No tienes cuenta? <a routerLink="/registro" class="text-indigo-600">Regístrate</a>
      </p>
      <p class="text-xs text-gray-400 text-center">Prueba: un correo que empiece con "admin" entra como administrador.</p>
    </form>
  `,
})
export class Login {
  private inventario = inject(InventarioService);
  private router = inject(Router);

  correo = '';
  password = '';
  error = '';

  entrar() {
    if (!this.correo || !this.password) {
      this.error = 'Llena todos los campos';
      return;
    }
    this.inventario.login(this.correo);
    this.router.navigate(['/catalogo']);
  }
}
