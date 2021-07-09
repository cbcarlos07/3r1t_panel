import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  convertToBa64(file: any){
		return new Promise((resolve, reject)=>{
			var reader = new FileReader();			
			reader.onload = (event: any) => {
                const binaryString  = event.target.result;
				let base64 = btoa(binaryString)
				resolve( base64 )
            }
			reader.readAsBinaryString(file);
		})
	}
}
