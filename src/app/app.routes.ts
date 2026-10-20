import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { InventarioService } from './services/inventario.service';
import { Inicio } from './pages/inicio/inicio';
import { Catalogo } from './pages/catalogo/catalogo';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { Productos } from './pages/productos/productos';

// solo deja pasar al administrador, si no lo manda al login
const soloAdmin = () =>
  inject(InventarioService).usuario()?.rol === 'admin' || inject(Router).parseUrl('/login');

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'catalogo', component: Catalogo },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'productos', component: Productos, canActivate: [soloAdmin] },
  { path: '**', redirectTo: '' },
];
