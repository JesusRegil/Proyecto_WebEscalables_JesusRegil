import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [FormsModule],
  template: `
    <form class="max-w-sm mx-auto bg-white p-6 rounded-lg shadow space-y-3" (ngSubmit)="registrar()">
      <h1 class="text-2xl font-bold">Registro de empleado</h1>
      <input class="w-full border rounded p-2" name="nombre" placeholder="Nombre" [(ngModel)]="nombre" />
      <input class="w-full border rounded p-2" name="apellidos" placeholder="Apellidos" [(ngModel)]="apellidos" />
      <input class="w-full border rounded p-2" type="email" name="correo" placeholder="Correo" [(ngModel)]="correo" />
      <input class="w-full border rounded p-2" type="password" name="password" placeholder="Contraseña (mín. 8)"
        [(ngModel)]="password" />
      <input class="w-full border rounded p-2" type="password" name="confirmar" placeholder="Confirmar contraseña"
        [(ngModel)]="confirmar" />
      @if (mensaje) {
        <p class="text-sm" [class.text-red-600]="!exito" [class.text-green-600]="exito">{{ mensaje }}</p>
      }
      <button class="w-full bg-indigo-600 text-white py-2 rounded">Solicitar cuenta</button>
    </form>
  `,
})
export class Registro {
  nombre = '';
  apellidos = '';
  correo = '';
  password = '';
  confirmar = '';
  mensaje = '';
  exito = false;

  registrar() {
    this.exito = false;
    if (!this.nombre || !this.apellidos || !this.correo) {
      this.mensaje = 'Llena todos los campos';
    } else if (this.password.length < 8) {
      this.mensaje = 'La contraseña debe tener al menos 8 caracteres';
    } else if (this.password !== this.confirmar) {
      this.mensaje = 'Las contraseñas no coinciden';
    } else {
      this.exito = true;
      this.mensaje = 'Solicitud enviada. Un administrador debe aprobar tu cuenta.';
    }
  }
}
