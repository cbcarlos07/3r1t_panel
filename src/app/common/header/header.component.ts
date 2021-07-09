import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	nome: string = ''
	constructor(private _userService: UsuarioService) { }

	ngOnInit() {
	}

	verificaSessao(){
		return true
	}

	getReducedName(){
		let name = this._userService.carregarNome().split(' ')
		return `${name[0].slice(0,1)}${name[name.length - 1].slice(0,1)}`
	}

	getName(){
		return this._userService.carregarNome()
	}

	logout(){
		this._userService
			.sair()
	}

}
