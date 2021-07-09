import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoItemService {

	private ws: string
	constructor(private http: HttpClient) {
		this.ws = `${environment.host}${environment.api}/pedido-itens`
	}

	getListaPorPedido(id: number){
		return this.http.get(`${this.ws}/${id}/pedido`)
	}

}
