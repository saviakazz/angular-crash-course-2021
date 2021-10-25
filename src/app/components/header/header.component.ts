import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs'; //reikalingas, kad butu galima gauti reiksmes is ui.service
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Task Tracker';
  showAddTask: boolean = false;
  subscription: Subscription;
  constructor(private uiService: UiService, private router: Router) {
	  //subscribe'nima showAddTask value is ui.service
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {}
  
   ngOnDestroy() {
     // Unsubscribe to ensure no memory leaks
     this.subscription.unsubscribe();
   }

  toggleAddTask() {
    this.uiService.toggleAddTask();
  }

  //html'e esanciame app-button komponente tikriname, ar route'as yra "/" ar ne, akd butu aisku, rodyti mygtuka ar ne
  hasRoute(route: string) {
    return this.router.url === route;
  }
}
