import { Location } from '@angular/common';
import { Component, ComponentFactory, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoItemService } from 'src/app/service/pedido-item.service';
import { PedidoService } from 'src/app/service/pedido.service';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { PdfComponent } from '../pdf/pdf.component';
import { PedidoDTO } from '../PedidoDTO.model';
import { PedidoItemDTO } from '../PedidoItemDTO.model';
import * as html2pdf from 'html2pdf.js'
@Component({
  selector: 'app-pedido-item',
  templateUrl: './pedido-item.component.html',
  styleUrls: ['./pedido-item.component.css']
})
export class PedidoItemComponent implements OnInit {
	items: PedidoItemDTO[] = []
	pedido: PedidoDTO
	id: number
	total: number
	@ViewChild('printPDF', {static: true, read: ViewContainerRef}) printPDF: ViewContainerRef
	constructor(private _pedidoService: PedidoService,
				private _pedidoItemService: PedidoItemService,
				private _activatedRouter: ActivatedRoute,
				private _location: Location,
				private _notificationService: NotificationService,
				private readonly resolver: ComponentFactoryResolver
		) { }

	ngOnInit() {
		this.id = this._activatedRouter.snapshot.params['id'] || 0
		if( this.id == 0 ){
			this.voltar()
		}

		this.obterPedido()
		setTimeout(() => {
			this.itensDoPedido()			
		}, 100);

	}

	obterPedido(){
		this._pedidoService
			.dadosPedido( this.id )
			.subscribe((response: PedidoDTO)=>{
				this.pedido = response

			
			})
	}

	itensDoPedido(){
		
		
		this._pedidoItemService
			.getListaPorPedido( this.id )
			.subscribe((response: PedidoItemDTO[])=>{
				this.items = response
				this.total = this.items.map( p => p.ped_qtde * p.ped_valor  )
									   .reduce( (prev, value)=> prev + value, 0 )
			})
	}

	voltar(){
		this._location.back()
	}

	mudarStatus(acao: number){
		const obj = { pedStatus: acao }
		this._pedidoService
			.mudarStatus( this.id, obj )
			.subscribe(()=>{
				this._pedidoService.mudancaDeEstado()
				this._notificationService.notify({type: 'success', message: 'Status do pedido alterado com sucess'})
				this.voltar()
				
			})
	}

	createPDF(title: string ): void{
		/*this.printPDF.clear()
		
		const factory = this.resolver.resolveComponentFactory( PdfComponent )
		const componentRef = this.printPDF.createComponent( factory )

		componentRef.instance.title = title
		componentRef.instance.pedido = this.pedido

		componentRef.instance.emitter.subscribe(()=>{
			const config = {
				html2canvas: {
					scale: 1,
					scrollX: 0,
					scrollY: 0
				}
			}
			console.log(componentRef.location.nativeElement);
			
			this.print( componentRef.location.nativeElement, config )
			componentRef.destroy()
		})*/

		const options = {
			filename: 'pedidos.pdf',
			html2canvas: {},
			jsPdf: {orientation: 'portrait'}
		}

		const content: Element = document.getElementById('content')

		html2pdf()
			.from( content )
			.set( options )
			.save()



	}

	private print(content: any, config: any): void{
		html2pdf()
			.set( config )
			.from( content )
			.toPdf()
			.outputPdf( 'dataurlnewwindow' )
	}

}
