import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { InventarioService } from './services/inventario.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  inventario = inject(InventarioService);
  private router = inject(Router);

  salir() {
    this.inventario.logout();
    this.router.navigate(['/']);
  }
}
