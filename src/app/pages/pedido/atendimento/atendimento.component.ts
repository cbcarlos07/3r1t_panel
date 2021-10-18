import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/service/pedido.service';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { PedidoDTO } from '../PedidoDTO.model';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.css']
})
export class AtendimentoComponent implements OnInit {
	items: PedidoDTO[] = []
	constructor(private _pedidoService: PedidoService,
				private _notifictionService: NotificationService
		) { }

	ngOnInit() {
		this.findAll()
		this.escutaDePedido()
	}

	findAll(){
		this._pedidoService
			.pedidosEmAtendimento()
			.subscribe((response: PedidoDTO[])=>{
				this.items = response
			})
	}

	
	escutaDePedido(){
		this._pedidoService
			.escutaDePedidoAtendimento()
			.subscribe((response: any)=>{	
				this._notifictionService.notify({message: 'Pedido em atendimento', type: 'success'})
				this.findAll()
				
			})
	}

}
