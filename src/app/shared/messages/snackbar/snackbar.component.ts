import { Component, OnInit } from '@angular/core';
import { Observable, timer } from "rxjs";
import { animate, state, style, transition, trigger} from "@angular/animations";
import { tap, switchMap } from "rxjs/internal/operators";
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
	trigger('snack-visibility', [
		state('hidden', style({
			opacity: 0,
			bottom: '-10px'
		})),
		state('visible', style({
			opacity: 1,
			bottom: '1px'
		})),
		transition('hidden => visible', animate('500ms 0s ease-in')),
		transition('visible => hidden', animate('500ms 0s ease-out'))
	  ])
]
})
export class SnackbarComponent implements OnInit {
	message: string = 'Hello there'
	snackVisibility: string = 'hidden'
	type: string
	constructor( private notificationService: NotificationService) { }

	ngOnInit() {
		this.notificationService.notifier
		.pipe(
		  tap((message: any) => {
			  
			 this.type = message.type 
			 this.message = message.message
			 this.snackVisibility = 'visible'
		  }),
		  switchMap(message => timer(3000))
		).subscribe( timer => this.snackVisibility ='hidden' )
	}

}
