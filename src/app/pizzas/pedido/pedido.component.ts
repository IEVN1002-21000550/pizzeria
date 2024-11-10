import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PizzaPedidoService } from '../../servicios/pizza-pedido.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  pedidoForm!: FormGroup;
  clienteOculto = false;

  constructor(private fb: FormBuilder, public servicio: PizzaPedidoService) {}

  ngOnInit(): void {
    this.pedidoForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      fecha: ['', Validators.required],
      tamanio: ['', Validators.required],
      ingredientes: this.fb.group({
        jamon: [false],
        pina: [false],
        champinones: [false]
      }),
      cantidad: [1]
    });
    this.clienteOculto = this.servicio.clienteOcultado();
  }

  enviar(): void {
    const pedido = this.pedidoForm.value;

    if (!this.servicio.clienteOcultado()) {
      this.servicio.agregarcliente({
        nombre: pedido.nombre,
        direccion: pedido.direccion,
        telefono: pedido.telefono,
        fecha: pedido.fecha
      });
      this.servicio.deshabilitarCliente();
      this.clienteOculto = true;
    }

    this.agregarPizza(pedido);

    this.pedidoForm.get('tamanio')?.reset();
    this.pedidoForm.get('ingredientes')?.reset();
    this.pedidoForm.get('cantidad')?.reset(1);
  }

  agregarPizza(pizza: any): void {
    const seleccion = this.obteneringredientes(pizza.ingredientes);
    const subtotal = this.calcularSubtotal(pizza);
    this.servicio.agregarPizza({
      tamanio: pizza.tamanio,
      ingredientes: seleccion,
      cantidad: pizza.cantidad,
      subtotal: subtotal
    });
    this.pedidoForm.reset();
  }

  calcularSubtotal(pizza: any): number {
    let subtotal = 0;
    subtotal += parseInt(pizza.tamanio) || 0;
    subtotal += (pizza.ingredientes.jamon ? 10 : 0) + (pizza.ingredientes.pina ? 10 : 0) + (pizza.ingredientes.champinones ? 10 : 0);
    return subtotal * (pizza.cantidad || 1);
  }

  obteneringredientes(ingredientes: any): string[] {
    const ingredientesSeleccionados: string[] = [];
    for (const lista in ingredientes) {
      if (ingredientes[lista]) {
        ingredientesSeleccionados.push(lista);
      }
    }
    return ingredientesSeleccionados;
  }
}
