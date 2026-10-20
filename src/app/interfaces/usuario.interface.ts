export interface Usuario {
  nombre: string;
  apellidos: string;
  correo: string;
  rol: 'empleado' | 'admin';
}
