import {
	Component,
	OnInit,
	AfterViewInit,
	AfterContentInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../../security/login/login.service";

import { MenuService } from "./menu.service";
// import { EmpresaService } from './../../empresa/empresa.service';
import { APIDominio } from "./../../app.api";

@Component({
	selector: "app-menu",
	templateUrl: "./menu.component.html",
	styleUrls: ["./menu.component.css"],
})
export class MenuComponent implements OnInit, AfterContentInit, AfterViewInit {
	mostrarMenu: string = "";
	pessoa: any = {};
	menus: any = [];
	empresa: any[] = [];
	img_logo: string = "assets/img/profile-photos/1.png";
	img_capa: string;
	logo: string = "";
	PATHAPI = APIDominio;

	constructor(
		private router: Router,

		private menuService: MenuService,
		private loginService: LoginService
	) {}

	ngAfterContentInit(): void {}
	ngAfterViewInit(): void {}
	ngOnInit() {
		this.logo = `${APIDominio}/sagesc/logo.png`;
		this.menu();
		this.userLogado();
	}
	menu() {
		this.menuService.getMenu().subscribe((menus) => {
			this.menus = menus;
		});
	}
	userLogado() {
		this.pessoa = this.loginService.getUser();
		// if (this.pessoa.img) {
		// 	this.img_logo = API_PATH_IMG + "/funcionario/" + this.pessoa.img;
		// }
	}
	logout() {
		this.loginService.logout();
	}
}
