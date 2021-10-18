import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CargoService } from 'src/app/service/cargo.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import  Swal from 'sweetalert2';
import { Cargo } from '../../cargo/cargo.model';
import { Usuario } from '../usuario.model';
import * as md5 from 'md5'
@Component({
	selector: 'app-usuario-form',
	templateUrl: './usuario-form.component.html',
	styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {
	formCad: FormGroup
	id = 0
	title: string
	imgImage: string
	usuario: Usuario
	type1: string = 'password'
	type2: string = 'password'
	cargos: Cargo[] = []
	constructor(private _activateRoute: ActivatedRoute,
				private _usuarioService: UsuarioService,
				private _location: Location,
				private _cargoService: CargoService
			) { }

	ngOnInit() {
		this.id = this._activateRoute.snapshot.params['id'] || 0
		this.title = this.id == 0 ? 'Cadastrar Usuário' : 'Editar Usuário'
		const disabled = this.id > 0 ? true : false
		this.formCad = new FormGroup({
			usu_nome: new FormControl('', {validators: [Validators.required]}),
			usu_cargo_id: new FormControl('', {validators: [Validators.required]} ),
			usu_login: new FormControl({value: '', disabled}, {validators: [Validators.required]} ),
			usu_senha: new FormControl('', {validators: [Validators.required]} ),
			usu_senha_confirm: new FormControl('' ),
			
		},{
			validators: this.password.bind(this)
		})

		if( this.id > 0 ){
			this.getById()
		}
		this.listarCargos()
	}

	password(formGroup: FormGroup) {
		const { value: usu_senha } = formGroup.get('usu_senha');
		const { value: usu_senha_confirm } = formGroup.get('usu_senha_confirm');
		return usu_senha === usu_senha_confirm ? null : { passwordNotMatch: true };
	}

	validarSenha(){
		return !this.formCad.hasError('passwordNotMatch')  && this.formCad.get('usu_senha').valid
	}
	changeType(){
		this.type1 = this.type1 == 'password' ? 'text' : 'password'
	}
	changeType1(){
		this.type2 = this.type2 == 'password' ? 'text' : 'password'
	}


	voltar(){
		this._location.back()
	}

	getById(){
		this._usuarioService
			.getById( this.id )
			.subscribe((response: any)=>{
				
				this.formCad.controls.usu_nome.setValue( response.usu_nome )
				this.formCad.controls.usu_cargo_id.setValue( response.usu_cargo_id )
				this.formCad.controls.usu_login.setValue( response.usu_login )
				
				this.formCad.get("usu_senha").clearValidators();//clear validation
				this.formCad.get("usu_senha").setErrors(null);//updating error message
				this.formCad.get("usu_senha_confirm").clearValidators();//clear validation
				this.formCad.get("usu_senha_confirm").setErrors(null);//updating error message
				this.formCad.updateValueAndValidity();//update validation
				
			})
	}
	salvar(){
		delete this.formCad.value.usu_senha_confirm
		if( this.id == 0 ){
			this.novo()
		}else{
			this.atualizar()
		}

	}

	novo(){
		this.formCad.value.usu_senha = md5( this.formCad.value.usu_senha )
		this._usuarioService
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
		if( this.formCad.value.usu_senha == '' ) delete this.formCad.value.usu_senha
		this._usuarioService
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

	listarCargos(){
		this._cargoService
			.get()
			.subscribe((response: Cargo[])=>{
				this.cargos = response
				this.formCad.controls.usu_cargo_id.setValue( this.cargos[0].carId )
			})
	}

	comprarLogin(){
		const login = this.formCad.value.usu_login
		this._usuarioService
			.getByLogin( login )
			.subscribe( (response: Usuario) =>{
				if( response ){
					
					this.formCad.get("usu_login").setValidators([Validators.required]);//setting validation
					this.formCad.get("usu_login").setErrors({'required':true});//error message
					this.formCad.updateValueAndValidity();//update validation
				}
			})
	}
	
}
