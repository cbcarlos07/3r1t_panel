import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { FormControlName, NgModel } from '@angular/forms';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
	
	@Input() errorMessage: string;
	@Input() label: string;
	@Input() showTip = true;
	input: any;
	@ContentChild(NgModel, {static: false}) model: NgModel;
	@ContentChild(FormControlName, {static: false}) control: FormControlName;
	constructor() { }
	
	ngOnInit(): void {
	}
	ngAfterContentInit() {
		this.input = this.model || this.control;
		if (this.input === undefined) {
			throw new Error('Este componente precisar ser usado com a diretiva ngModel ou formControlName');
		}
	}
	
	hasSuccess(): boolean {
		return this.input.valid && (this.input.dirty || this.input.touched || !this.input.empty );
	}
	hasError(): boolean {
		return this.input.invalid && (this.input.dirty || this.input.touched);
	}
	
}