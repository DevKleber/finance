import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap, filter } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationEnd } from "@angular/router";

import { MudarTexto } from "./mudar-texto.model";

import { NotificationService } from "../shared/messages/notification.service";
import { API } from "../app.api";

@Injectable({
	providedIn: "root",
})
export class MudarTextoService {
	constructor(
		private http: HttpClient,
		private notificationService: NotificationService,
		private router: Router
	) {}

	getMudarTextos(search?: string): Observable<MudarTexto[]> {
		return this.http.get<MudarTexto[]>(`${API}/mudarTexto`);
	}

	getmudarTextoById(id: string): Observable<MudarTexto> {
		return this.http.get<MudarTexto>(`${API}/mudarTexto/${id}`);
	}

	save(form) {
		return this.http.post<any>(`${API}/mudarTexto`, form);
	}

	update(form, id) {
		return this.http.put(`${API}/mudarTexto/${id}`, form).subscribe(
			(data) => {
				if (data["response"]) {
					this.notify("Registro Alterado Com Sucesso!");
					this.router.navigate(["/mudarTexto"]);
				}
				console.log(data);
			},
			(error) => {
				this.notify(`Error: ${error}`);
			}
		);
	}
	inativar(id: string) {
		return this.http.delete(`${API}/mudarTexto/${id}`);
	}

	notify(msg) {
		this.notificationService.notifySweet(msg);
	}
	goTo(path: string = "depoimento") {
		this.router.navigate([`/${path}`]);
	}
}
