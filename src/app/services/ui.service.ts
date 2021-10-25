import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

//ui. service reikalingas, kad keli komponentai galetu zinoti apie tam tikra viena busena
//uz tai imporuojame Observable ir Subject from rxjs
//tai yra specialus Observable, kuri kiti komponentai turi subscribe (pvz, header komponentas 
@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddTask: boolean = false;
  private subject = new Subject<any>();

  constructor() {}

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
