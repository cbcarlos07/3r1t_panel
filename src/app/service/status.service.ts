import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Status } from '../pages/status/statu.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
	private ws: string
  	constructor(private http: HttpClient) {
		this.ws = `${environment.host}${environment.api}/status`
	}
	get(){
		return this.http.get(this.ws)
	}
	getById(id: number){
		return this.http.get(`${this.ws}/${id}`)
	}
	update(id: number,obj: Status){
		return this.http.put(`${this.ws}/${id}`, obj)
	}
	create(obj: Status){
		return this.http.post(this.ws, obj)
	}
	delete(id: number){
		return this.http.delete(`${this.ws}/${id}`)
	}
}
