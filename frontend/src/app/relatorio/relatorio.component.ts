
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../layout/menu/menu.service';
import { BreadcrumbService } from '../layout/breadcrumb/breadcrumb.service';
@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
  menus: any[] = [];
  
  constructor(private menuService: MenuService,private breadcrumbService:BreadcrumbService) { }

  ngOnInit() {
    this.breadcrumbService.chosenPagina([
			{ no_rotina: "Relatórios", ds_url: "relatorios",active:'' },
			{ no_rotina: "Listar", ds_url: "relatorios",active:'active' }
		  ])
    this.menuService.getMenu().subscribe(menus => {
      this.menus = menus
    })
  }
}