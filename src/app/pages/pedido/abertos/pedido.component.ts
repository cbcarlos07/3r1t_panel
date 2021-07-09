import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { PedidoService } from 'src/app/service/pedido.service';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { PedidoDTO } from '../PedidoDTO.model';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
	items: PedidoDTO[] = []
	
	constructor(private _pedidoService: PedidoService,
				private _notifictionService: NotificationService
		) {
			
		 }

	ngOnInit() {
		this.findAll()
		this.escutaDePedido()
		
	}

	findAll(){
		this._pedidoService
			.pedidosAbertos(1)
			.subscribe((response: PedidoDTO[])=>{
				this.items = response
			})
	}

	escutaDePedido(){
		this._pedidoService
			.escutaDePedido()
			.subscribe((response: any)=>{	
				this._notifictionService.notify({message: response.msg, type: 'success'})
				this.findAll()
				
			})
	}



}
