import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/service/pedido.service';
import { PedidoDTO } from '../PedidoDTO.model';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.css']
})
export class AtendimentoComponent implements OnInit {
	items: PedidoDTO[] = []
	constructor(private _pedidoService: PedidoService) { }

	ngOnInit() {
		this.findAll()
	}

	findAll(){
		this._pedidoService
			.pedidosEmAtendimento()
			.subscribe((response: PedidoDTO[])=>{
				this.items = response
			})
	}

}
