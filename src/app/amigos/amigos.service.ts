import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap, filter } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationEnd } from "@angular/router";

import { Amigos } from "./amigos.model";

import { NotificationService } from "../shared/messages/notification.service";
import { API } from "../app.api";

@Injectable({
	providedIn: "root",
})
export class AmigosService {
	constructor(
		private http: HttpClient,
		private notificationService: NotificationService,
		private router: Router
	) {}

	getAmigos(search?: string): Observable<Amigos[]> {
		return this.http.get<Amigos[]>(`${API}/amigos`);
	}

	getamigosById(id: string): Observable<Amigos> {
		return this.http.get<Amigos>(`${API}/amigos/${id}`);
	}

	save(form) {
		return this.http.post<any>(`${API}/amigos`, form).subscribe(
			(data) => {
				if (data["dados"]) {
					this.notifySweet("Registro Inserido Com Sucesso!");
					this.router.navigate(["/amigos"]);
				}
				console.log(data);
			},
			(error) => {
				this.notifySweet(`Error: ${error}`);
			}
		);
	}

	update(form, id) {
		return this.http.put(`${API}/amigos/${id}`, form).subscribe(
			(data) => {
				if (data["response"]) {
					this.notifySweet("Registro Alterado Com Sucesso!");
					this.router.navigate(["/amigos"]);
				}
				console.log(data);
			},
			(error) => {
				this.notifySweet(`Error: ${error}`);
			}
		);
	}
	inativar(id: string) {
		return this.http.delete(`${API}/amigos/${id}`);
	}

	notifySweet(msg) {
		this.notificationService.notifySweet(msg);
	}
	goTo(path: string = "depoimento") {
		this.router.navigate([`/${path}`]);
	}
}
