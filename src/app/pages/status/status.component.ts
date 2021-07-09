import { Component, OnInit } from '@angular/core';
import { StatusService } from 'src/app/service/status.service';
import { Status } from './statu.model';
import  Swal from 'sweetalert2';
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
	items: Status[] = []
	title: string
	id: number
	constructor(private _statusService: StatusService) { }

	ngOnInit() {
		this.findAll()
	}

	findAll(){
		this._statusService
			.get()
			.subscribe((response: Status[])=>{
				this.items = response
			})
	}

	telaNova(){
		this.id = 0
		this.title = 'Adicionar novo status'
		this.formulario({})
	}

	telaEditar(obj: Status){
		this.id = obj.status_id
		delete obj.status_id
		this.title = 'Edtair status'
		this.formulario(obj)
	}

	formulario(obj: any){
		Swal.fire({
			title: this.title,
			html: 			
			'<input id="swal-input1" class="swal2-input" placeholder="Descrição" title="Descrição">',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Salvar!',
			cancelButtonText: 'Fechar',
			focusConfirm: false,
			heightAuto: false,
			width: '400px',
			showLoaderOnConfirm: true,
			allowOutsideClick: false,
			onOpen: () =>{				
				let descricao: any = document.getElementById('swal-input1')								
				descricao.value = `${obj.status_descricao == undefined ? '' : obj.status_descricao}`				
			},
			preConfirm: async () => {				
				let campo_descricao: any = document.getElementById('swal-input1')
				const descricao = campo_descricao.value
				return await this.salvar({
					status_descricao: descricao
				})
			}
		  }).then((result: any) => {
			
			if( !result.dismiss ){
			  if (result.value.status) {
				Swal.fire(
					'Muito bem',
					`${result.value.title}`,
					'success'
				).then(()=>{
					this.findAll()
				})
				setTimeout(() => {
					Swal.close();
					
				}, 3000);
			  }else{
				console.error(result.value.log);        
				Swal.fire(
					'Oops!',
					`${result.value.msg}`,
					'error'
				).then(()=>{
				})
			  }
			}
	    })
	}

	salvar( obj: any ){
		
		
		if( this.id != 0){
			return this.atualizar( obj )
		}else{
			return this.nova( obj )
		}
	}

	nova(obj: any){
		return new Promise((resolve, reject)=>{
			this._statusService
				.create(obj)
				.subscribe(()=>{
					resolve({status: true, title: 'Ação adicionada com sucesso!' })
				}, err => {
					console.error('Error', err);
					reject({log: err, msg: 'Problema ao tentar adicionar'})
				})
		})
		
	}

	atualizar(obj: any){
		return new Promise((resolve, reject)=>{
			this._statusService
				.update(this.id, obj)
				.subscribe((response: any)=>{
					resolve({status: true, title: 'Ação atualizada com sucesso!' })		
				})

		})
	}

	perguntaRemover( parametro: any ){
		Swal.fire({
			title: 'Atenção!',
			text: `Deseja realmente remover ${parametro.status_descricao}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sim, quero remover!',
			cancelButtonText: 'Não',
			preConfirm:  () => {
				const  r = this.remover(parametro.status_id)
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
			this._statusService
				.delete( obj )
				.subscribe(()=>{
					resolve(true)
				}, err => {
					console.error(err);
					reject( {log: err} )
				})
		})
	}


}
