import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/service/produto.service';
import { Produto } from './produto.model';
import  Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/shared/messages/notification.service';
@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
	items: Produto[] = []
	host: string
  	constructor(private _produtoService: ProdutoService,
				private _notifcationService: NotificationService
		) {
		  this.host = environment.host
		  this.onListenSinc()
	   }

	ngOnInit() {
		this.findAll()
	}
	findAll(){
			this._produtoService
				.get()
				.subscribe((response: Produto[])=>{
					this.items = response
				})
		}

	
	perguntaRemover( parametro: any ){
		Swal.fire({
			title: 'Atenção!',
			text: `Deseja realmente remover ${parametro.pro_nome}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sim, quero remover!',
			cancelButtonText: 'Não',
			preConfirm:  () => {
				const  r = this.remover(parametro.pro_id)
				return r
			},
			allowOutsideClick: () => !Swal.isLoading()
		}).then((result: any) => {
		if (result.value) {
				if( result.value ){
					Swal.fire(
					'Removido!',
					`${parametro.descricao} removido com sucesso`,
					'success'
					).then(()=>{
					this.findAll()
					})
				}else{
					console.error(result.value.log);        
					Swal.fire(
					'Oops!',
					`<strong>${parametro.medidor}</strong> não foi removido(a)`,
					'error'
					).then(()=>{
						this.findAll()
					})
				}

			}
		})
	}

	remover( obj: any ){
		return new Promise((resolve, reject)=>{
			this._produtoService
				.delete( obj )
				.subscribe(()=>{
					resolve(true)
				}, err => {
					console.error(err);
					reject( {log: err} )
				})
		})
	}

	sincronizar( id: number ){
		this._produtoService
			.sinc( id )
			.subscribe((response: any )=>{
				Swal.fire(
					'Sincronização!',
					`Sincronização enviada`,
					'success'
					)
			})
	}

	onListenSinc(){
		this._produtoService
			.onListenSinc()
			.subscribe((response: any)=>{
				
				
				this._notifcationService.notify({type: 'success', message: response.body.msg})
			})
	}

	sincronizarTudo(){
		this._produtoService
			.syncMultiple()
			.subscribe(response=> {
				this._notifcationService.notify({type: 'success', message: 'Sincronização enviada'})
			})
	}


}
