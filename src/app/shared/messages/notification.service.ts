import {EventEmitter} from "@angular/core";

export class NotificationService {
    notifier = new EventEmitter<string>()
    /**
     * Paratro objeto com atributos message e type
     * @param message 
     * 
     */
    notify(message: any){
        this.notifier.emit( message )
    }
}