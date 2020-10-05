import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap, filter } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationEnd } from "@angular/router";

import { TipoDespesa } from "./tipo-despesa.model";

import { NotificationService } from "../shared/messages/notification.service";
import { API } from "../app.api";

@Injectable({
	providedIn: "root",
})
export class TipoDespesaService {
	constructor(
		private http: HttpClient,
		private notificationService: NotificationService,
		private router: Router
	) {}

	getTipoDespesas(search?: string): Observable<TipoDespesa[]> {
		return this.http.get<TipoDespesa[]>(`${API}/tipoDespesa`);
	}

	gettipoDespesaById(id: string): Observable<TipoDespesa> {
		return this.http.get<TipoDespesa>(`${API}/tipoDespesa/${id}`);
	}

	save(form) {
		return this.http.post<any>(`${API}/tipoDespesa`, form).subscribe(
			(data) => {
				if (data["dados"]) {
					this.notify("Registro Inserido Com Sucesso!");
					this.router.navigate(["/"]);
				}
				console.log(data);
			},
			(error) => {
				this.notify(`Error: ${error}`);
			}
		);
	}

	update(form, id) {
		return this.http.put(`${API}/tipoDespesa/${id}`, form).subscribe(
			(data) => {
				if (data["response"]) {
					this.notify("Registro Alterado Com Sucesso!");
					this.router.navigate(["/"]);
				}
				console.log(data);
			},
			(error) => {
				this.notify(`Error: ${error}`);
			}
		);
	}
	inativar(id: string) {
		return this.http.delete(`${API}/tipoDespesa/${id}`);
	}

	notify(msg) {
		this.notificationService.notifySweet(msg);
	}
	goTo(path: string = "depoimento") {
		this.router.navigate([`/${path}`]);
	}
}
