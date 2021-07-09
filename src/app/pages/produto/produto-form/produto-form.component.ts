import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment';
import { Produto } from '../produto.model';
import  Swal from 'sweetalert2';
import { HelperService } from 'src/app/service/helper.service';
@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit {
	formCad: FormGroup
	id = 0
	title: string
	imgImage: string
	produto: Produto
	options = { prefix: 'R$ ', thousands: '.', decimal: ',' }
	constructor(private _activateRoute: ActivatedRoute,
				private _produtoService: ProdutoService,
				private _location: Location,
				private _helperService: HelperService

			) { }

	ngOnInit() {
		this.id = this._activateRoute.snapshot.params['id'] || 0
		this.title = this.id == 0 ? 'Cadastrar Produto' : 'Editar Produto'
		this.formCad = new FormGroup({
			pro_codigo_barra: new FormControl('', {validators: [Validators.required]}),
			pro_nome: new FormControl('', {validators: [Validators.required]} ),
			pro_preco_compra: new FormControl('', {validators: [Validators.required]} ),
			pro_preco_venda: new FormControl('', {validators: [Validators.required]} ),
			pro_imagem: new FormControl('' ),
			pro_status: new FormControl( 1 ),
			pro_margem: new FormControl(0, {validators: [Validators.required]} )			
		})

		if( this.id > 0 ){
			this.getById()
		}
	}

	voltar(){
		this._location.back()
	}

	getById(){
		this._produtoService
			.getById( this.id )
			.subscribe((response: any)=>{
				this.formCad.controls.pro_codigo_barra.setValue( response.pro_codigo_barra )
				this.formCad.controls.pro_nome.setValue( response.pro_nome )
				this.formCad.controls.pro_preco_compra.setValue( response.pro_preco_compra )
				this.formCad.controls.pro_preco_venda.setValue( response.pro_preco_venda )
				
				this.formCad.controls.pro_status.setValue( response.pro_status  )
				this.formCad.controls.pro_margem.setValue( response.pro_margem  )
				if(response.pro_imagem)  this.imgImage = `${environment.host}/foto/${response.pro_imagem}`
				
			})
	}
	salvar(){
		
	
		if( this.formCad.value.pro_imagem.includes( 'http' ) || this.formCad.value.pro_imagem == ''){
			delete this.formCad.value.pro_imagem
		}
		
		if( this.id == 0 ){
			this.novo()
		}else{
			this.atualizar()
		}

	}

	novo(){
		delete this.formCad.value.id
		this._produtoService
			.create( this.formCad.value )
			.subscribe((response: any)=>{
				let obj = {
					message: 'Item salvo com sucesso',
					status: true
				}
				this.mensagem()
				this.voltar()
	
			})
	}

	atualizar(){
		
		this._produtoService
		.update( this.id, this.formCad.value )
		.subscribe((response: any)=>{
			let obj = {
				message: 'Item salvo com sucesso',
				status: true
			}
			this.mensagem()
			this.voltar()

		})
	}

	mensagem(){
		Swal.fire(
			'Parabéns!',
			`Item salvo com sucesso`,
			'success'
		)
	}

	async fileChangeEvent(event) {
		var files = event.target.files;
      	var file = files[0];
		
		if (files && file) {
			let retorno: any = await this._helperService.convertToBa64(file)
			this.imgImage = `data:image/png;base64,${retorno}`
			
			
			this.formCad.controls.pro_imagem.setValue( this.imgImage )
		}
	}

	calcPrecoVenda(){
		try {
			const precoCompra = Number(this.formCad.value.pro_preco_compra)
			const margem = Number(this.formCad.value.pro_margem)
			
			const porcento = margem  == 0 ? 1 : (margem >= 100 ? margem : 100 - margem ) / 1000
			const soma = (porcento == 1 ? 0 : precoCompra * porcento)
			
			const precoVenda  =  precoCompra + soma
			
			this.formCad.controls.pro_preco_venda.setValue( precoVenda )
			
		} catch (error) {
			console.log('valor inválido');
			
		}
		
		


	}


}
