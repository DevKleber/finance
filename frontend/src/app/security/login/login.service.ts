import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, NavigationEnd } from "@angular/router";
import { Observable } from "rxjs";
import { tap, filter, flatMap } from "rxjs/operators";
import { API } from "../../app.api";
import { Helper } from "../../helper";
import { User } from "./user.model";

import { NotificationService } from "../../shared/messages/notification.service";

@Injectable()
export class LoginService {
	user: User;
	lastUrl: string;
	mostrarMenu = new EventEmitter<boolean>();

	constructor(
		private notificationService: NotificationService,
		private http: HttpClient,
		private router: Router,
		private helper: Helper
	) {
		//pegando a rota que o usuario estava antes de clicar para logar.
		this.router.events
			.pipe(filter((e) => e instanceof NavigationEnd))
			.subscribe((e: NavigationEnd) => (this.lastUrl = e.url));
	}
	me() {
		return this.http.get(`${API}/me`);
	}
	getUser() {
		let user = localStorage.getItem("pessoa");
		let userDecrip = this.helper.decrypt(user);
		let client = JSON.parse(atob(userDecrip));
		return client;
	}

	isLoggedIn(): boolean {
		if (localStorage.getItem("dG9rZW5maW5hbmNl") !== null) {
			this.mostrarMenu.emit(true);
			return true;
		}
		// this.logout();
		return false;
	}

	logoutForce() {
		localStorage.removeItem("dG9rZW5maW5hbmNl");
		localStorage.removeItem("user");
		localStorage.removeItem("empresa");
		this.mostrarMenu.emit(false);
		this.user = undefined;
		this.handleLogin();
	}
	logout() {
		this.http.get(`${API}/auth/logout`).subscribe((resp) => {
			localStorage.removeItem("dG9rZW5maW5hbmNl");
			localStorage.removeItem("user");
			localStorage.removeItem("empresa");
			this.mostrarMenu.emit(false);
			this.user = undefined;
			this.handleLogin();
		});
		// this.mostrarMenu.emit(false);
		// this.handleLogin();
	}
	criarConta(form) {
		return this.http.post<any>(`${API}/new/user`, form);
	}

	login(login: string, password: string): Observable<User> {
		return this.http
			.post<User>(`${API}/auth/login`, {
				login: login,
				password: password,
			})
			.pipe(
				tap((user) => {
					localStorage.setItem("dG9rZW5maW5hbmNl", user.token);
					// localStorage.setItem('user', btoa(JSON.stringify(user.empresa)));
					let userString = JSON.stringify(user.user);
					let encrypt = btoa(userString);
					let myencrypt = this.helper.encrypt(encrypt);
					localStorage.setItem("user", myencrypt);

					let empresaString = this.helper.encrypt(
						btoa(JSON.stringify(user.empresa))
					);
					localStorage.setItem("empresa", empresaString);

					let pessoa = this.helper.encrypt(
						btoa(JSON.stringify(user.pessoa))
					);
					localStorage.setItem("pessoa", pessoa);

					(this.user = user), this.mostrarMenu.emit(true);
				})
			);
	}
	bloquearMenu() {
		this.mostrarMenu.emit(false);
		localStorage.removeItem("dG9rZW5maW5hbmNl");
		this.handleLogin();
	}
	navGoTo(path) {
		this.router.navigate([path]);
	}
	notificationError(msg) {
		this.notificationService.notifyError(msg);
	}
	handleLogin(path: string = this.lastUrl) {
		this.router.navigate(["/login"]);
		// console.log("ultimo "+path);
		// console.log('vai mandar para o login');
		// this.router.navigate(['/login',path]);
		// this.router.navigate(['/login',btoa(path)])
	}
}
