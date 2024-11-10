import { Component } from '@angular/core';
import { PizzaPedidoService } from '../../servicios/pizza-pedido.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listapedido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listapedido.component.html',
  styleUrls: ['./listapedido.component.css']
})
export class ListapedidoComponent {
  mostrarAlerta = false;
  pedido: any;

  constructor(private servicio: PizzaPedidoService) {
    this.pedido = this.servicio.getPedidoActual();
  }

  eliminarPizza(index: number) {
    this.servicio.eliminarPizza(index);
  }

  confirmarPedido() {
    this.mostrarAlerta = true;
  }

  regresar() {
    this.mostrarAlerta = false;
  }

  confirmar() {
    this.servicio.confirmarPedido();
    this.servicio.habilitarCliente();
    this.mostrarAlerta = false;
    this.pedido = this.servicio.getPedidoActual();
  }
}
