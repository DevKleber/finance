import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap, filter } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationEnd } from "@angular/router";

import { Despesa } from "./despesa.model";

import { NotificationService } from "../shared/messages/notification.service";
import { API } from "../app.api";

@Injectable({
	providedIn: "root",
})
export class DespesaService {
	constructor(
		private http: HttpClient,
		private notificationService: NotificationService,
		private router: Router
	) {}

	getDespesas(search?: string): Observable<Despesa[]> {
		return this.http.get<Despesa[]>(`${API}/`);
	}

	getdespesaById(id: string): Observable<Despesa> {
		return this.http.get<Despesa>(`${API}//${id}`);
	}

	salvarCartaoCredito(form) {
		return this.http.post<any>(`${API}/despesa_cartao`, form);
	}
	salvarConta(form) {
		return this.http.post<any>(`${API}/despesa_conta`, form);
	}

	update(form, id) {
		return this.http.put(`${API}//${id}`, form).subscribe(
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
		return this.http.delete(`${API}//${id}`);
	}

	notify(msg) {
		this.notificationService.notifySweet(msg);
	}
	goTo(path: string = "depoimento") {
		this.router.navigate([`/${path}`]);
	}
}
