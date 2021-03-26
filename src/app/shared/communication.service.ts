
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommunicationService {
    private subject = new Subject<any>();
    private obscene = new Subject<any>();
    sendMessage(message: any) {
        this.subject.next(message);
    }
    clearMessages() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
    obscenetiy():Observable<any>{
        return this.obscene.asObservable();
    }
    changeObscenetiy(message: boolean){
        this.obscene.next(message);
    }
}