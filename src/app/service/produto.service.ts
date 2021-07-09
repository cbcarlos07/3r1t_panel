import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Produto } from '../pages/produto/produto.model';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
	private socket: Socket
	private ws: string
	constructor(private http: HttpClient) {
	  this.ws = `${environment.host}${environment.api}/produto`
	  this.socket = io( environment.host )
	}
	get(){
		return this.http.get(this.ws)
	}
	getById(id: number){
		return this.http.get(`${this.ws}/${id}`)
	}
	update(id: number,obj: Produto){
		return this.http.put(`${this.ws}/${id}`, obj)
	}
	create(obj: Produto){
		return this.http.post(this.ws, obj)
	}
	delete(id: number){
		return this.http.delete(`${this.ws}/${id}`)
	}
	sinc(id: number){
		return this.http.get(`${this.ws}/sinc/${id}`)
	}
	syncMultiple(){
		return this.http.get(`${this.ws}/sync-multiple`)
	}

	onListenSinc(){
		return new Observable(observer => {
			this.socket.on( 'sync', (data: any) => {
				observer.next(data)
			} )
		})
	}
}
