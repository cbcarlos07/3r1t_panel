import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PedidoService {
	private socket: Socket
	statusMudou = new EventEmitter()
	private ws: string
	constructor(private http: HttpClient) {
		this.ws = `${environment.host}${environment.api}/pedido`
		this.socket = io( environment.host )
	}

	pedidosAbertos(status){
		return this.http.get(`${this.ws}/status/${status}`)
	}

	pedidosEmAtendimento(){
		return this.http.get(`${this.ws}/status-atendimento`)
	}

	dadosPedido(id: number){
		return this.http.get(`${this.ws}/obter-pedido/${id}`)
	}

	mudarStatus(id: number, obj: any){
		return this.http.put(`${this.ws}/${id}`, obj)
	}

	mudancaDeEstado(){
		this.statusMudou.emit()
	}

	escutaDePedido(){
		return new Observable(observer => {
			this.socket.on( 'pedido', (data: any) => {
				observer.next(data)
			} )
		})
	}
	escutaDePedidoAtendimento(){
		return new Observable(observer => {
			this.socket.on( 'pedido_atendido', (data: any) => {
				observer.next(data)
			} )
		})
	}

	
}
