import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import  Swal from 'sweetalert2';
import { Usuario } from './usuario.model';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
	items: Usuario[] = []
	host: string
	constructor(private _userService: UsuarioService) { }

	ngOnInit() {
		this.findAll()
	}

	findAll(){
		this._userService
			.get()
			.subscribe((response: Usuario[])=>{
				this.items = response
			})
	}


perguntaRemover( parametro: any ){
	Swal.fire({
		title: 'Atenção!',
		text: `Deseja realmente remover ${parametro.usu_nome}`,
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Sim, quero remover!',
		cancelButtonText: 'Não',
		preConfirm:  () => {
			const  r = this.remover(parametro.usu_id)
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
		this._userService
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
