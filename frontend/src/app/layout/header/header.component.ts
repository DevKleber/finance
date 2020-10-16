import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../security/login/login.service";
import { APIDominio } from "src/app/app.api";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
	logo: any = "";
	pessoa: any;
	PATHAPI = APIDominio;

	constructor(private loginService: LoginService) {}
	ngOnInit() {
		this.logo = `${APIDominio}/sagesc/logo.png`;
		this.userLogado();
	}

	logout() {
		this.loginService.logout();
	}
	userLogado() {
		this.pessoa = this.loginService.getUser();
		// if (this.pessoa.img) {
		// 	this.img_logo = API_PATH_IMG + "/funcionario/" + this.pessoa.img;
		// }
	}
}
