import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Fornecedor } from '../pages/fornecedor/fornecedor.model';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

    private ws: string
  	constructor(private http: HttpClient) {
		this.ws = `${environment.host}${environment.api}/fornecedor`
	}
	get(){
		return this.http.get(this.ws)
	}
	getById(id: number){
		return this.http.get(`${this.ws}/${id}`)
	}
	update(id: number,obj: Fornecedor){
		return this.http.put(`${this.ws}/${id}`, obj)
	}
	create(obj: Fornecedor){
		return this.http.post(this.ws, obj)
	}
	delete(id: number){
		return this.http.delete(`${this.ws}/${id}`)
	}
}
