import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PedidoComponent } from "./pizzas/pedido/pedido.component";
import { ListapedidoComponent } from "./pizzas/listapedido/listapedido.component";
import { VentasComponent } from "./pizzas/ventas/ventas.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PedidoComponent, ListapedidoComponent, VentasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pizzeria';
}
