import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/messages/notification.service';
import { BreadcrumbService } from '../layout/breadcrumb/breadcrumb.service';

@Component({
  selector: 'mt-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private notificationService:NotificationService,private breadcrumbService:BreadcrumbService) { }
  
  ngOnInit() {
    this.breadcrumbService.chosenPagina([
			{ no_rotina: "Página não encontrada", ds_url: "/",active:'active' }
		  ])
  }
  

}
