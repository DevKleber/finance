import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap, filter } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationEnd } from "@angular/router";

import { CategoriaDespesa } from "./categoria-despesa.model";

import { NotificationService } from "../shared/messages/notification.service";
import { API } from "../app.api";

@Injectable({
	providedIn: "root",
})
export class CategoriaDespesaService {
	constructor(
		private http: HttpClient,
		private notificationService: NotificationService,
		private router: Router
	) {}

	getCategoriaDespesasSelect(): Observable<CategoriaDespesa[]> {
		return this.http.get<CategoriaDespesa[]>(
			`${API}/categoria-despesaSelect`
		);
	}
	getCategoriaDespesas(search?: string): Observable<CategoriaDespesa[]> {
		return this.http.get<CategoriaDespesa[]>(`${API}/categoria-despesa`);
	}

	getcategoriaDespesaById(id: string): Observable<CategoriaDespesa> {
		return this.http.get<CategoriaDespesa>(
			`${API}/categoria-despesa/${id}`
		);
	}

	save(form) {
		return this.http.post<any>(`${API}/categoria-despesa`, form);
	}

	update(form, id) {
		return this.http.put(`${API}/categoria-despesa/${id}`, form);
	}
	inativar(id: string) {
		return this.http.delete(`${API}/categoria-despesa/${id}`);
	}

	notify(msg) {
		this.notificationService.notifySweet(msg);
	}
	goTo(path: string = "depoimento") {
		this.router.navigate([`/${path}`]);
	}
}
