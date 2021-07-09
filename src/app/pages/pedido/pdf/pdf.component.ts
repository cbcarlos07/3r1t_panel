import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core';

import { PedidoDTO } from '../PedidoDTO.model';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit, AfterViewInit {
  pedido: PedidoDTO
  title: string
  emitter: EventEmitter<void> = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void{
    this.emitter.emit()
  }

}
