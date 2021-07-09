import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cargo } from '../pages/cargo/cargo.model';


@Injectable({
	providedIn: 'root'
})
export class CargoService {
	
	private ws: string
	constructor(private http: HttpClient) {
		this.ws = `${environment.host}${environment.api}/cargo`
	}
	get(){
		return this.http.get(this.ws)
	}
	getById(id: number){
		return this.http.get(`${this.ws}/${id}`)
	}
	update(id: number,obj: Cargo){
		return this.http.put(`${this.ws}/${id}`, obj)
	}
	create(obj: Cargo){
		return this.http.post(this.ws, obj)
	}
	delete(id: number){
		return this.http.delete(`${this.ws}/${id}`)
	}
}
