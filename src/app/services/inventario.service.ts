import { Injectable, signal } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { Usuario } from '../interfaces/usuario.interface';

// datos de prueba en memoria, despues se cambia por la API de Express + MongoDB
@Injectable({ providedIn: 'root' })
export class InventarioService {
  categorias = ['Papelería', 'Bebidas', 'Snacks'];

  productos = signal<Producto[]>([
    {
      id: 1,
      nombre: 'Cuaderno profesional',
      descripcion: 'Cuaderno de 100 hojas cuadro chico.',
      categoria: 'Papelería',
      precio: 45,
      existencias: 20,
      foto: 'https://placehold.co/300x200?text=Cuaderno',
    },
    {
      id: 2,
      nombre: 'Coca-Cola 600ml',
      descripcion: 'Refresco de cola en botella.',
      categoria: 'Bebidas',
      precio: 20,
      existencias: 35,
      foto: 'https://placehold.co/300x200?text=Refresco',
    },
    {
      id: 3,
      nombre: 'Papas fritas',
      descripcion: 'Bolsa de papas sabor sal 45g.',
      categoria: 'Snacks',
      precio: 18,
      existencias: 0,
      foto: 'https://placehold.co/300x200?text=Papas',
    },
    {
      id: 4,
      nombre: 'Pluma azul',
      descripcion: 'Pluma de punto mediano tinta azul.',
      categoria: 'Papelería',
      precio: 8,
      existencias: 100,
      foto: 'https://placehold.co/300x200?text=Pluma',
    },
  ]);

  // null = visitante no autenticado
  usuario = signal<Usuario | null>(null);

  // login falso: si el correo empieza con "admin" entra como administrador
  login(correo: string) {
    const rol = correo.startsWith('admin') ? 'admin' : 'empleado';
    this.usuario.set({ nombre: correo.split('@')[0], apellidos: '', correo, rol });
  }

  logout() {
    this.usuario.set(null);
  }

  agregarProducto(producto: Omit<Producto, 'id'>) {
    this.productos.update((lista) => [...lista, { ...producto, id: Date.now() }]);
  }

  eliminarProducto(id: number) {
    this.productos.update((lista) => lista.filter((p) => p.id !== id));
  }
}
