import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../pages/usuario/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
	private ws: string
  	constructor(private http: HttpClient) {
		this.ws = `${environment.host}${environment.api}/usuario`
	}

	carregarNome(){
		return 'Carlos Bruno'
		//return localStorage.getItem('name')
	}

	sair(){

		
	}

	get(){
		return this.http.get(this.ws)
	}
	getById(id: number){
		return this.http.get(`${this.ws}/${id}`)
	}
	getByLogin(login: string){
		return this.http.get(`${this.ws}/login/${login}`)
	}
	update(id: number,obj: Usuario){
		return this.http.put(`${this.ws}/${id}`, obj)
	}
	create(obj: Usuario){
		return this.http.post(this.ws, obj)
	}
	delete(id: number){
		return this.http.delete(`${this.ws}/${id}`)
	}
}
