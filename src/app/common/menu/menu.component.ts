import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/service/pedido.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { NotificationService } from 'src/app/shared/messages/notification.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
	nome = "Nome"
	status = "Online"
	classeStatus = "text-success"
	menus = []
	mostrarMenu: false
	foto: string
	semfoto = 'assets/icone.ico'
	totalAberto: number
	totalAtendimento: number
	constructor(private _userService: UsuarioService,
				private _pedidoService: PedidoService,
				private _notifictionService: NotificationService
		) { }

	ngOnInit() {
		this.foto = 'assets/icone.ico'
		this.getName()
		this.getAbertos()
		this.mudancaDeStatus()
		this.getAtendmentos()

	}
	verificaSessao(){
		return true
	}
	getName(){
		this.nome = this._userService.carregarNome()
		console.log('nome',this.nome);
		

		this.getMenu()
		this.escutaDePedido()
	}

	getMenu(){
		this.menus = [
			{url: 'status', icone: ' fa-filter', menu: 'Status'},		
			{url: 'produto', icone: ' fa-filter', menu: 'Produtos'},
			{url: 'fornecedor', icone: ' fa-filter', menu: 'Fornecedores'},
			{url: 'cargo', icone: ' fa-filter', menu: 'Cargo'},
			{url: 'usuario', icone: ' fa-filter', menu: 'Usuários'},
			{url: 'pedido', icone: ' fa-filter', menu: 'Pedidos Abertos', total: 0},
			{url: 'pedido/atendimento', icone: ' fa-filter', menu: 'Pedidos em Atendimento', total: 0},
		]
	}

	getAbertos(){
		this._pedidoService
			.pedidosAbertos(1)
			.subscribe((response: any)=>{
				this.menus[5].total = response.length				
			})
	}
	getAtendmentos(){
		this._pedidoService
			.pedidosEmAtendimento()
			.subscribe((response: any)=>{
				this.menus[6].total = response.length				
			})
	}

	mudancaDeStatus(){
		this._pedidoService
			.statusMudou
			.subscribe(()=>{
				this.getAbertos()
				this.getAtendmentos()
			})
	}

	escutaDePedido(){
		this._pedidoService
			.escutaDePedido()
			.subscribe((response: any)=>{
				
				this._notifictionService.notify({message: response.msg, type: 'success'})
				this.getAbertos()
				
			})
	}

}
